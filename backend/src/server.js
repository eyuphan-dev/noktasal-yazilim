import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { dirname, extname, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdir, readFile } from 'node:fs/promises'
import { URL } from 'node:url'
import sharp from 'sharp'
import { env } from './config/env.js'
import { closePool, query } from './db/pool.js'
import {
  createHttpError,
  parseJsonBody,
  sendJson,
  sendNoContent,
  setCorsHeaders,
} from './utils/http.js'

const FORM_TYPES = new Set(['contact', 'demo', 'application', 'career'])
const FORM_STATUSES = new Set(['new', 'in_progress', 'resolved'])
const SERVER_DIR = dirname(fileURLToPath(import.meta.url))
const MEDIA_ROOT = resolve(SERVER_DIR, '../media')
const IMAGE_MIME_BY_EXTENSION = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

function sanitizePathSegment(value) {
  return String(value || 'uploads')
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'uploads'
}

function parseImageDataUrl(dataUrl) {
  const match = String(dataUrl || '').match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/)
  if (!match) {
    throw createHttpError(400, 'Gecersiz gorsel verisi. data URL bekleniyor.')
  }

  const [, mimeType, base64Data] = match
  const buffer = Buffer.from(base64Data, 'base64')

  if (!buffer.length) {
    throw createHttpError(400, 'Gorsel verisi bos olamaz.')
  }

  return { mimeType, buffer }
}

async function optimizeAndSaveImage(payload = {}) {
  const { buffer } = parseImageDataUrl(payload.dataUrl)
  const folder = sanitizePathSegment(payload.folder || 'uploads')
  const sourceName = sanitizePathSegment(payload.fileName || 'image')

  if (buffer.length > 20 * 1024 * 1024) {
    throw createHttpError(413, 'Gorsel boyutu 20MB sinirini asamaz.')
  }

  const targetDir = resolve(MEDIA_ROOT, folder)
  await mkdir(targetDir, { recursive: true })

  const uniqueName = `${sourceName}-${Date.now()}-${randomUUID().slice(0, 8)}.webp`
  const absolutePath = resolve(targetDir, uniqueName)

  await sharp(buffer)
    .rotate()
    .resize({
      width: 2400,
      height: 2400,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({
      quality: 92,
      effort: 5,
      smartSubsample: true,
    })
    .toFile(absolutePath)

  return {
    url: `/media/${folder}/${uniqueName}`,
    format: 'webp',
  }
}

async function sendMediaFile(pathname, res) {
  const rawRelativePath = decodeURIComponent(pathname.replace(/^\/media\//, ''))
  const normalizedRelativePath = normalize(rawRelativePath).replace(/^([.][./\\])+/, '')
  const absolutePath = resolve(MEDIA_ROOT, normalizedRelativePath)

  if (!absolutePath.startsWith(MEDIA_ROOT)) {
    throw createHttpError(404, 'Medya dosyasi bulunamadi.')
  }

  let fileBuffer
  try {
    fileBuffer = await readFile(absolutePath)
  } catch {
    throw createHttpError(404, 'Medya dosyasi bulunamadi.')
  }

  const mimeType = IMAGE_MIME_BY_EXTENSION[extname(absolutePath).toLowerCase()] || 'application/octet-stream'
  setCorsHeaders(res)
  res.statusCode = 200
  res.setHeader('Content-Type', mimeType)
  res.end(fileBuffer)
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isDatabaseConnectionError(error) {
  if (!error || typeof error !== 'object') {
    return false
  }

  return (
    error.code === 'ECONNREFUSED' ||
    error.code === 'ENOTFOUND' ||
    error.code === 'ETIMEDOUT' ||
    error.code === '57P01'
  )
}

function formatAdminDate(value) {
  if (!value) {
    return ''
  }

  return new Date(value).toLocaleString('sv-SE', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).replace(' ', ' ')
}

function normalizeFormTypeFromDb(type) {
  if (type === 'application') {
    return 'career'
  }
  return type
}

function normalizeFormTypeToDb(type) {
  if (type === 'career') {
    return 'application'
  }
  return type
}

function mapFormEntry(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    type: normalizeFormTypeFromDb(row.type),
    date: formatAdminDate(row.created_at),
    status: row.status,
    notes: row.notes,
    isRead: row.is_read,
    isArchived: row.is_archived,
  }
}

async function getFormEntries() {
  const result = await query(
    `SELECT id, name, email, phone, message, type, created_at, status, notes, is_read, is_archived
     FROM form_entries
     ORDER BY created_at DESC`,
  )

  return result.rows.map(mapFormEntry)
}

async function getFormEntryById(id) {
  const result = await query(
    `SELECT id, name, email, phone, message, type, created_at, status, notes, is_read, is_archived
     FROM form_entries
     WHERE id = $1`,
    [id],
  )

  return result.rows[0] || null
}

async function patchFormEntry(id, payload) {
  const assignments = []
  const values = []

  const push = (column, value) => {
    values.push(value)
    assignments.push(`${column} = $${values.length}`)
  }

  if (typeof payload.status === 'string') {
    if (!FORM_STATUSES.has(payload.status)) {
      throw createHttpError(400, 'Gecersiz status degeri.')
    }
    push('status', payload.status)
  }

  if (typeof payload.notes === 'string') {
    if (payload.notes.length > 2000) {
      throw createHttpError(400, 'notes alani en fazla 2000 karakter olabilir.')
    }
    push('notes', payload.notes)
  }

  if (typeof payload.isRead === 'boolean') {
    push('is_read', payload.isRead)
  }

  if (typeof payload.isArchived === 'boolean') {
    push('is_archived', payload.isArchived)
  }

  if (typeof payload.type === 'string') {
    if (!FORM_TYPES.has(payload.type)) {
      throw createHttpError(400, 'Gecersiz form tipi.')
    }
    push('type', normalizeFormTypeToDb(payload.type))
  }

  if (assignments.length === 0) {
    const existing = await getFormEntryById(id)
    if (!existing) {
      throw createHttpError(404, 'Form kaydi bulunamadi.')
    }
    return mapFormEntry(existing)
  }

  values.push(id)

  const result = await query(
    `UPDATE form_entries
     SET ${assignments.join(', ')}, updated_at = NOW()
     WHERE id = $${values.length}
     RETURNING id, name, email, phone, message, type, created_at, status, notes, is_read, is_archived`,
    values,
  )

  if (result.rowCount === 0) {
    throw createHttpError(404, 'Form kaydi bulunamadi.')
  }

  return mapFormEntry(result.rows[0])
}

async function getContentSections() {
  const result = await query(
    `SELECT key, title, status, updated_at
     FROM content_sections
     ORDER BY key ASC`,
  )

  return result.rows.map((row) => ({
    key: row.key,
    title: row.title,
    status: row.status,
    updatedAt: formatAdminDate(row.updated_at),
  }))
}

async function getContentEditor(sectionKey) {
  const result = await query(
    `SELECT payload
     FROM content_section_payloads
     WHERE section_key = $1`,
    [sectionKey],
  )

  return result.rows[0]?.payload || {}
}

async function saveContentEditor(sectionKey, payload, publish) {
  const status = publish ? 'published' : 'draft'

  const sectionUpdate = await query(
    `UPDATE content_sections
     SET status = $2, updated_at = NOW()
     WHERE key = $1`,
    [sectionKey, status],
  )

  if (sectionUpdate.rowCount === 0) {
    await query(
      `INSERT INTO content_sections (key, title, status, updated_at)
       VALUES ($1, $1, $2, NOW())
       ON CONFLICT (key) DO UPDATE
       SET status = EXCLUDED.status, updated_at = EXCLUDED.updated_at`,
      [sectionKey, status],
    )
  }

  await query(
    `INSERT INTO content_section_payloads (section_key, payload, updated_at)
     VALUES ($1, $2::jsonb, NOW())
     ON CONFLICT (section_key) DO UPDATE
     SET payload = EXCLUDED.payload, updated_at = EXCLUDED.updated_at`,
    [sectionKey, JSON.stringify(payload)],
  )

  return payload
}

async function getSeoSettings() {
  const result = await query(
    `SELECT page_key, title, description, og_title, og_description
     FROM seo_settings
     ORDER BY page_key ASC`,
  )

  return result.rows.map((row) => ({
    pageKey: row.page_key,
    title: row.title,
    description: row.description,
    ogTitle: row.og_title,
    ogDescription: row.og_description,
  }))
}

async function saveSeoSettings(payload) {
  if (!payload.pageKey) {
    throw createHttpError(400, 'pageKey alani zorunludur.')
  }

  await query(
    `INSERT INTO seo_settings (page_key, title, description, og_title, og_description, updated_at)
     VALUES ($1, $2, $3, $4, $5, NOW())
     ON CONFLICT (page_key) DO UPDATE
     SET title = EXCLUDED.title,
         description = EXCLUDED.description,
         og_title = EXCLUDED.og_title,
         og_description = EXCLUDED.og_description,
         updated_at = EXCLUDED.updated_at`,
    [
      payload.pageKey,
      payload.title || '',
      payload.description || '',
      payload.ogTitle || '',
      payload.ogDescription || '',
    ],
  )

  return getSeoSettings()
}

async function createFormEntry(payload) {
  const type = payload.type
  const name = String(payload.name || '').trim()
  const email = String(payload.email || '').trim()
  const phone = String(payload.phone || '').trim()
  const message = String(payload.message || '').trim()

  const allowedTypes = new Set(['contact', 'demo', 'application'])

  if (!allowedTypes.has(type)) {
    throw createHttpError(400, 'Gecersiz form tipi.')
  }

  if (!name || !email || !phone || !message) {
    throw createHttpError(400, 'name, email, phone ve message alanlari zorunludur.')
  }

  if (!isValidEmail(email)) {
    throw createHttpError(400, 'Gecersiz e-posta formati.')
  }

  if (name.length < 2 || name.length > 120) {
    throw createHttpError(400, 'name alani 2-120 karakter araliginda olmalidir.')
  }

  if (phone.length < 10 || phone.length > 24) {
    throw createHttpError(400, 'phone alani 10-24 karakter araliginda olmalidir.')
  }

  if (message.length < 5 || message.length > 5000) {
    throw createHttpError(400, 'message alani 5-5000 karakter araliginda olmalidir.')
  }

  const id = randomUUID()

  await query(
    `INSERT INTO form_entries (
      id,
      type,
      name,
      email,
      phone,
      message,
      status,
      notes,
      is_read,
      is_archived,
      created_at,
      updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, 'new', '', FALSE, FALSE, NOW(), NOW())`,
    [id, type, name, email, phone, message],
  )

  return {
    id,
    type: normalizeFormTypeFromDb(type),
    name,
    email,
    phone,
    message,
    status: 'new',
    notes: '',
    isRead: false,
    isArchived: false,
  }
}

function mapSolutionRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    client: row.client,
    period: row.period,
    summary: row.summary,
    modules: row.modules || [],
    outcomes: row.outcomes || [],
    highlights: row.highlights || [],
  }
}

function mapAdminSolutionRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    client: row.client,
    period: row.period,
    summary: row.summary,
    status: row.is_published ? 'published' : 'draft',
    modules: row.modules || [],
    outcomes: row.outcomes || [],
    highlights: row.highlights || [],
    sortOrder: row.sort_order,
  }
}

async function getPublishedSolutions() {
  const result = await query(
    `SELECT id, slug, title, category, client, period, summary, modules, outcomes, highlights
     FROM solutions
     WHERE is_published = TRUE
     ORDER BY sort_order ASC, updated_at DESC`,
  )

  return result.rows.map(mapSolutionRow)
}

async function getAdminSolutions() {
  const result = await query(
    `SELECT id, slug, title, category, client, period, summary, modules, outcomes, highlights, is_published, sort_order
     FROM solutions
     ORDER BY sort_order ASC, updated_at DESC`,
  )

  return result.rows.map(mapAdminSolutionRow)
}

async function createAdminSolution(payload) {
  const id = payload.id || randomUUID()
  const title = String(payload.title || '').trim()
  const category = String(payload.category || '').trim()
  const client = String(payload.client || '').trim()
  const period = String(payload.period || '').trim()
  const summary = String(payload.summary || '').trim()
  const slug =
    String(payload.slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') || id

  if (!title || !category || !client || !period || !summary) {
    throw createHttpError(400, 'title, category, client, period ve summary alanlari zorunludur.')
  }

  const result = await query(
    `INSERT INTO solutions (
      id, slug, title, category, client, period, summary,
      modules, outcomes, highlights, is_published, sort_order, updated_at
     ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8::jsonb, $9::jsonb, $10::jsonb, $11, $12, NOW()
     )
     RETURNING id, slug, title, category, client, period, summary, modules, outcomes, highlights, is_published, sort_order`,
    [
      id,
      slug,
      title,
      category,
      client,
      period,
      summary,
      JSON.stringify(payload.modules || []),
      JSON.stringify(payload.outcomes || []),
      JSON.stringify(payload.highlights || []),
      payload.status === 'published',
      Number.isFinite(payload.sortOrder) ? payload.sortOrder : 999,
    ],
  )

  return mapAdminSolutionRow(result.rows[0])
}

async function patchAdminSolution(id, payload) {
  const assignments = []
  const values = []

  const push = (column, value) => {
    values.push(value)
    assignments.push(`${column} = $${values.length}`)
  }

  if (typeof payload.title === 'string') {
    push('title', payload.title.trim())
  }
  if (typeof payload.category === 'string') {
    push('category', payload.category.trim())
  }
  if (typeof payload.client === 'string') {
    push('client', payload.client.trim())
  }
  if (typeof payload.period === 'string') {
    push('period', payload.period.trim())
  }
  if (typeof payload.summary === 'string') {
    push('summary', payload.summary.trim())
  }
  if (typeof payload.status === 'string') {
    if (!['published', 'draft'].includes(payload.status)) {
      throw createHttpError(400, 'Gecersiz status degeri.')
    }
    push('is_published', payload.status === 'published')
  }

  if (assignments.length === 0) {
    const existing = await query(
      `SELECT id, slug, title, category, client, period, summary, modules, outcomes, highlights, is_published, sort_order
       FROM solutions WHERE id = $1`,
      [id],
    )
    if (existing.rowCount === 0) {
      throw createHttpError(404, 'Cozum bulunamadi.')
    }
    return mapAdminSolutionRow(existing.rows[0])
  }

  values.push(id)
  const result = await query(
    `UPDATE solutions
     SET ${assignments.join(', ')}, updated_at = NOW()
     WHERE id = $${values.length}
     RETURNING id, slug, title, category, client, period, summary, modules, outcomes, highlights, is_published, sort_order`,
    values,
  )

  if (result.rowCount === 0) {
    throw createHttpError(404, 'Cozum bulunamadi.')
  }

  return mapAdminSolutionRow(result.rows[0])
}

async function getPublishedSolutionBySlug(slug) {
  const result = await query(
    `SELECT id, slug, title, category, client, period, summary, modules, outcomes, highlights
     FROM solutions
     WHERE slug = $1 AND is_published = TRUE
     LIMIT 1`,
    [slug],
  )

  return result.rows[0] ? mapSolutionRow(result.rows[0]) : null
}

async function getPublishedReferences() {
  const result = await query(
    `SELECT id, name, period, logo_url
     FROM reference_partners
     WHERE is_published = TRUE
     ORDER BY sort_order ASC, updated_at DESC`,
  )

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    period: row.period,
    logo: row.logo_url,
  }))
}

function mapAdminReferenceRow(row) {
  return {
    id: row.id,
    name: row.name,
    period: row.period,
    logoUrl: row.logo_url,
    status: row.is_published ? 'published' : 'draft',
    sortOrder: row.sort_order,
  }
}

async function getAdminReferences() {
  const result = await query(
    `SELECT id, name, period, logo_url, is_published, sort_order
     FROM reference_partners
     ORDER BY sort_order ASC, updated_at DESC`,
  )

  return result.rows.map(mapAdminReferenceRow)
}

async function createAdminReference(payload) {
  const id = payload.id || randomUUID()
  const name = String(payload.name || '').trim()
  const period = String(payload.period || '').trim()
  const logoUrl = String(payload.logoUrl || '').trim() || null

  if (!name || !period) {
    throw createHttpError(400, 'name ve period alanlari zorunludur.')
  }

  const result = await query(
    `INSERT INTO reference_partners (id, name, period, logo_url, is_published, sort_order, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     RETURNING id, name, period, logo_url, is_published, sort_order`,
    [id, name, period, logoUrl, payload.status === 'published', Number.isFinite(payload.sortOrder) ? payload.sortOrder : 999],
  )

  return mapAdminReferenceRow(result.rows[0])
}

async function patchAdminReference(id, payload) {
  const assignments = []
  const values = []

  const push = (column, value) => {
    values.push(value)
    assignments.push(`${column} = $${values.length}`)
  }

  if (typeof payload.name === 'string') {
    push('name', payload.name.trim())
  }
  if (typeof payload.period === 'string') {
    push('period', payload.period.trim())
  }
  if (typeof payload.logoUrl === 'string') {
    push('logo_url', payload.logoUrl.trim() || null)
  }
  if (typeof payload.status === 'string') {
    if (!['published', 'draft'].includes(payload.status)) {
      throw createHttpError(400, 'Gecersiz status degeri.')
    }
    push('is_published', payload.status === 'published')
  }

  if (assignments.length === 0) {
    const existing = await query(
      `SELECT id, name, period, logo_url, is_published, sort_order
       FROM reference_partners WHERE id = $1`,
      [id],
    )
    if (existing.rowCount === 0) {
      throw createHttpError(404, 'Referans bulunamadi.')
    }
    return mapAdminReferenceRow(existing.rows[0])
  }

  values.push(id)
  const result = await query(
    `UPDATE reference_partners
     SET ${assignments.join(', ')}, updated_at = NOW()
     WHERE id = $${values.length}
     RETURNING id, name, period, logo_url, is_published, sort_order`,
    values,
  )

  if (result.rowCount === 0) {
    throw createHttpError(404, 'Referans bulunamadi.')
  }

  return mapAdminReferenceRow(result.rows[0])
}

async function getPublicContentSection(sectionKey) {
  const result = await query(
    `SELECT payload
     FROM content_section_payloads
     WHERE section_key = $1`,
    [sectionKey],
  )

  return result.rows[0]?.payload || {}
}

async function getPublicSeoSettings() {
  const result = await query(
    `SELECT page_key, title, description, og_title, og_description
     FROM seo_settings
     ORDER BY page_key ASC`,
  )

  return result.rows.map((row) => ({
    pageKey: row.page_key,
    title: row.title,
    description: row.description,
    ogTitle: row.og_title,
    ogDescription: row.og_description,
  }))
}

async function handleRequest(req, res) {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host}`)
  const pathname = requestUrl.pathname

  if (req.method === 'OPTIONS') {
    sendNoContent(res)
    return
  }

  if (pathname.startsWith('/media/') && req.method === 'GET') {
    await sendMediaFile(pathname, res)
    return
  }

  if (pathname === '/' && req.method === 'GET') {
    sendJson(res, 200, {
      message: 'Noktasal API calisiyor.',
      docs: {
        health: '/api/health',
        publicSolutions: '/api/solutions',
        publicReferences: '/api/references',
      },
    })
    return
  }

  if (pathname === '/api' && req.method === 'GET') {
    sendJson(res, 200, {
      message: 'API giris noktasi.',
      health: '/api/health',
    })
    return
  }

  if (pathname === '/api/health' && req.method === 'GET') {
    sendJson(res, 200, {
      ok: true,
      service: 'native-http-postgres-api',
      timestamp: new Date().toISOString(),
    })
    return
  }

  if (pathname === '/api/admin/forms' && req.method === 'GET') {
    const entries = await getFormEntries()
    sendJson(res, 200, entries)
    return
  }

  const formPatchMatch = pathname.match(/^\/api\/admin\/forms\/([^/]+)$/)
  if (formPatchMatch && req.method === 'PATCH') {
    const id = decodeURIComponent(formPatchMatch[1])
    const payload = await parseJsonBody(req)
    const updated = await patchFormEntry(id, payload)
    sendJson(res, 200, updated)
    return
  }

  if (pathname === '/api/admin/content/sections' && req.method === 'GET') {
    const sections = await getContentSections()
    sendJson(res, 200, sections)
    return
  }

  const contentSectionMatch = pathname.match(/^\/api\/admin\/content\/sections\/([^/]+)$/)
  if (contentSectionMatch && req.method === 'GET') {
    const sectionKey = decodeURIComponent(contentSectionMatch[1])
    const editorData = await getContentEditor(sectionKey)
    sendJson(res, 200, editorData)
    return
  }

  if (contentSectionMatch && req.method === 'PUT') {
    const sectionKey = decodeURIComponent(contentSectionMatch[1])
    const payload = await parseJsonBody(req)
    const publish = Boolean(payload.publish)
    delete payload.publish
    const saved = await saveContentEditor(sectionKey, payload, publish)
    sendJson(res, 200, saved)
    return
  }

  if (pathname === '/api/admin/seo' && req.method === 'GET') {
    const rows = await getSeoSettings()
    sendJson(res, 200, rows)
    return
  }

  if (pathname === '/api/admin/seo' && req.method === 'PUT') {
    const payload = await parseJsonBody(req)
    const rows = await saveSeoSettings(payload)
    sendJson(res, 200, rows)
    return
  }

  if (pathname === '/api/admin/solutions' && req.method === 'GET') {
    const rows = await getAdminSolutions()
    sendJson(res, 200, rows)
    return
  }

  if (pathname === '/api/admin/solutions' && req.method === 'POST') {
    const payload = await parseJsonBody(req)
    const row = await createAdminSolution(payload)
    sendJson(res, 201, row)
    return
  }

  const adminSolutionPatchMatch = pathname.match(/^\/api\/admin\/solutions\/([^/]+)$/)
  if (adminSolutionPatchMatch && req.method === 'PATCH') {
    const id = decodeURIComponent(adminSolutionPatchMatch[1])
    const payload = await parseJsonBody(req)
    const row = await patchAdminSolution(id, payload)
    sendJson(res, 200, row)
    return
  }

  if (pathname === '/api/admin/references' && req.method === 'GET') {
    const rows = await getAdminReferences()
    sendJson(res, 200, rows)
    return
  }

  if (pathname === '/api/admin/references' && req.method === 'POST') {
    const payload = await parseJsonBody(req)
    const row = await createAdminReference(payload)
    sendJson(res, 201, row)
    return
  }

  if (pathname === '/api/admin/media/images' && req.method === 'POST') {
    const payload = await parseJsonBody(req)
    const uploaded = await optimizeAndSaveImage(payload)
    sendJson(res, 201, uploaded)
    return
  }

  const adminReferencePatchMatch = pathname.match(/^\/api\/admin\/references\/([^/]+)$/)
  if (adminReferencePatchMatch && req.method === 'PATCH') {
    const id = decodeURIComponent(adminReferencePatchMatch[1])
    const payload = await parseJsonBody(req)
    const row = await patchAdminReference(id, payload)
    sendJson(res, 200, row)
    return
  }

  if (pathname === '/api/forms' && req.method === 'POST') {
    const payload = await parseJsonBody(req)
    const created = await createFormEntry(payload)
    sendJson(res, 201, created)
    return
  }

  if (pathname === '/api/solutions' && req.method === 'GET') {
    const rows = await getPublishedSolutions()
    sendJson(res, 200, rows)
    return
  }

  const solutionDetailMatch = pathname.match(/^\/api\/solutions\/([^/]+)$/)
  if (solutionDetailMatch && req.method === 'GET') {
    const slug = decodeURIComponent(solutionDetailMatch[1])
    const row = await getPublishedSolutionBySlug(slug)
    if (!row) {
      throw createHttpError(404, 'Cozum bulunamadi.')
    }
    sendJson(res, 200, row)
    return
  }

  if (pathname === '/api/references' && req.method === 'GET') {
    const rows = await getPublishedReferences()
    sendJson(res, 200, rows)
    return
  }

  if (pathname === '/api/seo' && req.method === 'GET') {
    const rows = await getPublicSeoSettings()
    sendJson(res, 200, rows)
    return
  }

  const contentSectionPublicMatch = pathname.match(/^\/api\/content\/sections\/([^/]+)$/)
  if (contentSectionPublicMatch && req.method === 'GET') {
    const sectionKey = decodeURIComponent(contentSectionPublicMatch[1])
    const payload = await getPublicContentSection(sectionKey)
    sendJson(res, 200, payload)
    return
  }

  if (pathname.startsWith('/api/')) {
    throw createHttpError(404, 'Endpoint bulunamadi.')
  }

  throw createHttpError(404, 'Kaynak bulunamadi.')
}

const server = http.createServer(async (req, res) => {
  try {
    setCorsHeaders(res)
    await handleRequest(req, res)
  } catch (error) {
    const statusCode = error.statusCode || (isDatabaseConnectionError(error) ? 503 : 500)
    const message = statusCode >= 500 ? 'Sunucu hatasi.' : error.message

    if (statusCode >= 500) {
      // eslint-disable-next-line no-console
      console.error(error)
    }

    sendJson(res, statusCode, { message })
  }
})

server.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server hazir: http://localhost:${env.port}`)
})

async function shutdown() {
  server.close(async () => {
    await closePool()
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

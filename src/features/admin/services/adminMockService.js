import {
  contentEditorSeed,
  contentSections,
  formEntries,
  referenceItems,
  seoSeed,
  solutionItems,
} from '../mockData'

const DELAY = 220

let memory = {
  formEntries: structuredClone(formEntries),
  contentSections: structuredClone(contentSections),
  contentEditor: structuredClone(contentEditorSeed),
  seo: structuredClone(seoSeed),
  solutions: structuredClone(solutionItems),
  references: structuredClone(referenceItems),
}

const wait = () => new Promise((resolve) => setTimeout(resolve, DELAY))

function touchSection(sectionKey, status = 'draft') {
  memory.contentSections = memory.contentSections.map((item) =>
    item.key === sectionKey
      ? {
          ...item,
          status,
          updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        }
      : item,
  )
}

export const adminMockService = {
  async getFormEntries() {
    await wait()
    return structuredClone(memory.formEntries)
  },

  async updateFormEntry(id, payload) {
    await wait()
    memory.formEntries = memory.formEntries.map((entry) =>
      entry.id === id ? { ...entry, ...payload } : entry,
    )
    return memory.formEntries.find((entry) => entry.id === id)
  },

  async getContentSections() {
    await wait()
    return structuredClone(memory.contentSections)
  },

  async getContentEditor(sectionKey) {
    await wait()
    return structuredClone(memory.contentEditor[sectionKey] || {})
  },

  async saveContentEditor(sectionKey, data, options = {}) {
    await wait()
    memory.contentEditor[sectionKey] = { ...data }
    touchSection(sectionKey, options.publish ? 'published' : 'draft')
    return structuredClone(memory.contentEditor[sectionKey])
  },

  async getSeoSettings() {
    await wait()
    return structuredClone(memory.seo)
  },

  async saveSeoSettings(payload) {
    await wait()
    memory.seo = memory.seo.map((item) =>
      item.pageKey === payload.pageKey ? { ...item, ...payload } : item,
    )
    return structuredClone(memory.seo)
  },

  async getSolutions() {
    await wait()
    return structuredClone(memory.solutions)
  },

  async createSolution(payload) {
    await wait()
    const next = {
      id: payload.id || `sol-${Date.now()}`,
      title: payload.title,
      category: payload.category,
      client: payload.client || '-',
      period: payload.period || '-',
      summary: payload.summary || '-',
      status: payload.status || 'draft',
    }
    memory.solutions = [next, ...memory.solutions]
    return structuredClone(next)
  },

  async updateSolution(id, payload) {
    await wait()
    memory.solutions = memory.solutions.map((item) =>
      item.id === id ? { ...item, ...payload } : item,
    )
    return structuredClone(memory.solutions.find((item) => item.id === id))
  },

  async getReferences() {
    await wait()
    return structuredClone(
      memory.references.map((item) => ({
        id: item.id,
        name: item.name || item.title || '',
        period: item.period || '-',
        logoUrl: item.logoUrl || '',
        status: item.status || 'draft',
      })),
    )
  },

  async createReference(payload) {
    await wait()
    const next = {
      id: payload.id || `ref-${Date.now()}`,
      name: payload.name || payload.title,
      period: payload.period || '-',
      logoUrl: payload.logoUrl || '',
      status: payload.status || 'draft',
    }
    memory.references = [next, ...memory.references]
    return structuredClone(next)
  },

  async updateReference(id, payload) {
    await wait()
    memory.references = memory.references.map((item) =>
      item.id === id ? { ...item, ...payload } : item,
    )
    return structuredClone(memory.references.find((item) => item.id === id))
  },

  async uploadImage(payload) {
    await wait()
    return {
      url: payload.dataUrl || '',
      format: 'mock',
    }
  },
}

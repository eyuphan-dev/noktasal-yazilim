import {
  contentEditorSeed,
  contentSections,
  formEntries,
  seoSeed,
} from '../mockData'

const DELAY = 220

let memory = {
  formEntries: structuredClone(formEntries),
  contentSections: structuredClone(contentSections),
  contentEditor: structuredClone(contentEditorSeed),
  seo: structuredClone(seoSeed),
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
}

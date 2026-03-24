import { apiRequest } from '../../../lib/api/client'

export const adminApiService = {
  getFormEntries() {
    return apiRequest('/admin/forms')
  },

  updateFormEntry(id, payload) {
    return apiRequest(`/admin/forms/${id}`, {
      method: 'PATCH',
      body: payload,
    })
  },

  getContentSections() {
    return apiRequest('/admin/content/sections')
  },

  getContentEditor(sectionKey) {
    return apiRequest(`/admin/content/sections/${sectionKey}`)
  },

  saveContentEditor(sectionKey, data, options = {}) {
    return apiRequest(`/admin/content/sections/${sectionKey}`, {
      method: 'PUT',
      body: {
        ...data,
        publish: Boolean(options.publish),
      },
    })
  },

  getSeoSettings() {
    return apiRequest('/admin/seo')
  },

  saveSeoSettings(payload) {
    return apiRequest('/admin/seo', {
      method: 'PUT',
      body: payload,
    })
  },

  getSolutions() {
    return apiRequest('/admin/solutions')
  },

  createSolution(payload) {
    return apiRequest('/admin/solutions', {
      method: 'POST',
      body: payload,
    })
  },

  updateSolution(id, payload) {
    return apiRequest(`/admin/solutions/${id}`, {
      method: 'PATCH',
      body: payload,
    })
  },

  getReferences() {
    return apiRequest('/admin/references')
  },

  createReference(payload) {
    return apiRequest('/admin/references', {
      method: 'POST',
      body: payload,
    })
  },

  updateReference(id, payload) {
    return apiRequest(`/admin/references/${id}`, {
      method: 'PATCH',
      body: payload,
    })
  },

  uploadImage(payload) {
    return apiRequest('/admin/media/images', {
      method: 'POST',
      body: payload,
    })
  },
}

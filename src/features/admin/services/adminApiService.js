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
}

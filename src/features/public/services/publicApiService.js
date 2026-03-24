import { apiRequest } from '../../../lib/api/client'

export const publicApiService = {
  getSolutions() {
    return apiRequest('/solutions')
  },

  getSolutionBySlug(slug) {
    return apiRequest(`/solutions/${encodeURIComponent(slug)}`)
  },

  getReferences() {
    return apiRequest('/references')
  },

  getSeoSettings() {
    return apiRequest('/seo')
  },

  getContentSection(sectionKey) {
    return apiRequest(`/content/sections/${encodeURIComponent(sectionKey)}`)
  },
}

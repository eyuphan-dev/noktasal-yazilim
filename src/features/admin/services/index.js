import { apiConfig } from '../../../lib/api/config'
import { adminApiService } from './adminApiService'
import { adminMockService } from './adminMockService'

export const adminService = apiConfig.useMock ? adminMockService : adminApiService

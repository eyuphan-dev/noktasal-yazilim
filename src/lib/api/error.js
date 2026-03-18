export function normalizeApiError(error) {
  if (!error) {
    return { status: 500, message: 'Bilinmeyen bir hata oluştu.' }
  }

  if (error.name === 'AbortError') {
    return { status: 408, message: 'İstek zaman aşımına uğradı.' }
  }

  if (typeof error.status === 'number') {
    return {
      status: error.status,
      message: error.message || 'Sunucu tarafında bir hata oluştu.',
      details: error.details,
    }
  }

  return { status: 500, message: error.message || 'Beklenmeyen bir hata oluştu.' }
}

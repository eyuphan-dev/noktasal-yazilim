export function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

export function sendJson(res, statusCode, payload) {
  setCorsHeaders(res)
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

export function sendNoContent(res) {
  setCorsHeaders(res)
  res.statusCode = 204
  res.end()
}

export async function parseJsonBody(req) {
  let body = ''

  for await (const chunk of req) {
    body += chunk
  }

  if (!body.trim()) {
    return {}
  }

  try {
    return JSON.parse(body)
  } catch {
    const error = new Error('Gecersiz JSON govdesi.')
    error.statusCode = 400
    throw error
  }
}

export function createHttpError(statusCode, message) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

import axios from 'axios'

const API = axios.create({ baseURL: '' })

export async function createSession() {
  const { data } = await API.post('/api/session')
  API.defaults.headers.common['x-session-id'] = data.session_id
  return data.session_id as string
}

export async function uploadFile(file: File) {
  const form = new FormData()
  form.append('file', file)
  const { data } = await API.post('/api/upload', form)
  return data
}

export async function nextQuestion() {
  const { data } = await API.get('/api/next')
  return data
}

export async function answer(key: string, value: string) {
  const form = new FormData()
  form.append('key', key)
  form.append('value', value)
  const { data } = await API.post('/api/answer', form)
  return data
}

export async function skip() { const { data } = await API.post('/api/skip') ; return data }
export async function back() { const { data } = await API.post('/api/back') ; return data }
export async function fill() { const { data } = await API.post('/api/fill') ; return data }
export const downloadDocxUrl = () => `/api/download.docx`
export const previewPdfUrl   = () => `/api/preview.pdf`

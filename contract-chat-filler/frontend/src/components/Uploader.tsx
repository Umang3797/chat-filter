import React, { useRef } from 'react'
import { uploadFile } from '../api'

export default function Uploader({ onPlaceholders }: { onPlaceholders: (ph: any[]) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const lower = file.name.toLowerCase()
    if (!(lower.endsWith('.docx') || lower.endsWith('.doc') || lower.endsWith('.pdf'))) {
      alert('Please upload .docx, .doc, or .pdf')
      return
    }
    const data = await uploadFile(file)
    onPlaceholders(data.placeholders)
  }
  return (
    <div className="card">
      <h3>Upload document</h3>
      <input ref={ref} type="file" accept=".docx,.doc,.pdf" onChange={onChange} />
      <p className="badge">Supported: .docx, .doc, .pdf</p>
    </div>
  )
}

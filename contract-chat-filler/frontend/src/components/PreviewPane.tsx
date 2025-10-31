import React, { useState } from 'react'
import { downloadDocxUrl, previewPdfUrl } from '../api'

export default function PreviewPane() {
  const [ts, setTs] = useState(0)
  return (
    <div className="card">
      <h3>Preview & Export</h3>
      <div style={{display:'flex', gap:8, marginBottom:8}}>
        <a className="btn" href={downloadDocxUrl()}>Download .docx</a>
        <button className="btn" onClick={()=>setTs(Date.now())}>Refresh preview</button>
      </div>
      <iframe className="preview" key={ts} src={previewPdfUrl()} />
    </div>
  )
}

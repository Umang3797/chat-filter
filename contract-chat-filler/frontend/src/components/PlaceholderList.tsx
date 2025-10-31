import React from 'react'

export default function PlaceholderList({ items }: { items: any[] }) {
  return (
    <div className="card list">
      <h3>Detected placeholders</h3>
      {!items?.length && <p>None yet</p>}
      <ul>
        {items?.map(p => (
          <li key={p.key}><code>{p.raw}</code> <span className="badge">{p.type}</span></li>
        ))}
      </ul>
    </div>
  )
}

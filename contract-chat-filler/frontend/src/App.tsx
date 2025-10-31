import React, { useEffect, useState } from 'react'
import Uploader from './components/Uploader'
import PlaceholderList from './components/PlaceholderList'
import ChatPanel from './components/ChatPanel'
import PreviewPane from './components/PreviewPane'
import { createSession } from './api'

export default function App(){
  const [placeholders, setPlaceholders] = useState<any[]>([])

  useEffect(()=>{ (async()=>{ await createSession() })() },[])

  return (
    <>
      <div className="header"><h2>Contract Chat Filler</h2></div>
      <div className="container">
        <div>
          <Uploader onPlaceholders={setPlaceholders} />
          <PlaceholderList items={placeholders} />
        </div>
        <ChatPanel onReady={()=>{}} />
        <PreviewPane />
      </div>
    </>
  )
}

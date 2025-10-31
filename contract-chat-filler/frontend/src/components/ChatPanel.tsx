import React, { useEffect, useRef, useState } from 'react'
import { nextQuestion, answer, skip, back, fill } from '../api'

export default function ChatPanel({ onReady }: { onReady: () => void }) {
  const [messages, setMessages] = useState<{role:'bot'|'user',text:string}[]>([])
  const [pending, setPending] = useState<any>(null)
  const [input, setInput] = useState('')
  const boxRef = useRef<HTMLDivElement>(null)

  const askNext = async () => {
    const q = await nextQuestion()
    if (q.done) {
      setMessages(m => [...m, { role:'bot', text: 'All set. Generating your document…' }])
      await fill()
      onReady()
      setMessages(m => [...m, { role:'bot', text: 'Preview is ready on the right. You can also download the .docx.' }])
      setPending(null)
    } else {
      setPending(q)
      setMessages(m => [...m, { role:'bot', text: `Please provide a value for ${q.label} (${q.type}).` }])
    }
  }

  useEffect(() => { askNext() }, [])
  useEffect(() => { boxRef.current?.scrollTo(0, boxRef.current.scrollHeight) }, [messages])

  const send = async () => {
    if (!pending) return
    const res = await answer(pending.key, input)
    if (!res.ok) {
      setMessages(m => [...m, { role:'bot', text: res.error }])
      return
    }
    setMessages(m => [...m, { role:'user', text: input }])
    setInput('')
    askNext()
  }

  return (
    <div className="card">
      <h3>Conversation</h3>
      <div className="chat" ref={boxRef} style={{height:'50vh', overflow:'auto'}}>
        {messages.map((m,i)=>(<div className={`msg ${m.role}`} key={i}>{m.text}</div>))}
      </div>
      <div className="toolbar" style={{marginTop:8}}>
        <input className="input" placeholder="Type your answer…" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') send()}}/>
        <button className="btn primary" onClick={send}>Send</button>
        <button className="btn" onClick={async()=>{ await skip(); setMessages(m=>[...m,{role:'bot', text:'Skipped.'}]); askNext() }}>Skip</button>
        <button className="btn" onClick={async()=>{ await back(); setMessages(m=>[...m,{role:'bot', text:'Going back one step.'}]); askNext() }}>Back</button>
      </div>
      <p style={{fontSize:12,color:'#6b7280'}}>Neutral tone. Placeholders only. Your base legal text is untouched.</p>
    </div>
  )
}

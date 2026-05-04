// api/dramas.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // DB에서 데이터 읽기
    const { data, error } = await supabase.from('dramas').select('*')
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  } 
  
  if (req.method === 'POST') {
    // DB에 데이터 쓰기 (관리자 모드용)
    const { title, answer, poster_url } = req.body
    const { data, error } = await supabase.from('dramas').insert([{ title, answer, poster_url }])
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }
}

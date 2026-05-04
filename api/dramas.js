import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  const { id } = req.query;

  // 1. 목록 조회 (최신순)
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('dramas')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  // 2. 데이터 추가
  if (req.method === 'POST') {
    const { title, answer, poster_url } = req.body;
    const { data, error } = await supabase
      .from('dramas')
      .insert([{ title, answer, poster_url }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  // 3. 데이터 수정
  if (req.method === 'PATCH') {
    const { title, answer, poster_url } = req.body;
    const { data, error } = await supabase
      .from('dramas')
      .update({ title, answer, poster_url })
      .eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  // 4. 데이터 삭제
  if (req.method === 'DELETE') {
    const { error } = await supabase
      .from('dramas')
      .delete()
      .eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }
}

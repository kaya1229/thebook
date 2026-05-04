// api/search.js
export default async function handler(req, res) {
  const { query } = req.query;
  const API_KEY = process.env.TMDB_API_KEY; // Vercel Dashboard에서 설정할 변수명

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=ko-KR`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

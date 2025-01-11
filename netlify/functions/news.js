const fetch = require('node-fetch');

exports.handler = async (event) => {
  const API_KEY = process.env.NEWS_API_KEY;
  const query = event.queryStringParameters.q;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        success: false, 
        error: "Search query is required" 
      })
    };
  }

  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${encodedQuery}&language=en`;
    
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        articles: data.results || [],
        query,
        count: data.results?.length || 0
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: "Failed to fetch news" 
      })
    };
  }
};
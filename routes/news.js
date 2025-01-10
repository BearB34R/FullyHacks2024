const express = require("express");
const router = express.Router();

// Get news data from the API
const fetchNewsData = async (query) => {
  const API_KEY = process.env.NEWS_API_KEY;
  // URL encode the query parameter
  const encodedQuery = encodeURIComponent(query);
  const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${encodedQuery}&language=en`;
  
  try {
    console.log('Fetching news with URL:', url); // Debug log
    const response = await fetch(url);
    const data = await response.json();
    
    // Log the API response
    console.log('API Response:', {
      status: response.status,
      totalResults: data.totalResults,
      resultsCount: data.results?.length || 0
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${data.message || 'Unknown error'}`);
    }

    return data.results || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; // Propagate error for better handling
  }
};

// Main news route with query support
router.get("/", async (req, res) => {
  try {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      return res.render("news/search", { 
        title: "Search News",
        articles: [] 
      });
    }

    const articles = await fetchNewsData(searchQuery);
    res.render("news/search", {
      title: `News Results for "${searchQuery}"`,
      articles
    });
  } catch (error) {
    res.status(500).render("error", { 
      message: "Failed to fetch news" 
    });
  }
});

// API endpoint for AJAX requests
router.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q?.trim();
    
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        error: "Search query is required" 
      });
    }

    console.log('Searching for:', query); // Debug log
    const articles = await fetchNewsData(query);
    
    res.json({ 
      success: true, 
      articles,
      query, // Return query for verification
      count: articles.length
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch news",
      details: error.message
    });
  }
});

router.get("/new", (req, res) => {
  res.render("news/new");
});

module.exports = router;

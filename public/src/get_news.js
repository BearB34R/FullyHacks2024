class NewsApp {
  constructor() {
    this.searchForm = document.querySelector('form');
    this.resultsContainer = document.querySelector('#results');
    this.currentPage = 1;
    this.articlesPerPage = 5;
    this.articles = [];
    this.setupEventListeners();
    
    // Check for URL parameters on load
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      this.performSearch(query);
      // Update input field with search term
      const input = this.searchForm.querySelector('input[name="q"]');
      if (input) input.value = query;
    }
  }

  setupEventListeners() {
    this.searchForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(this.searchForm);
      const query = formData.get('q')?.trim();
      if (query) {
        // Update URL without page reload
        const url = new URL(window.location);
        url.searchParams.set('q', query);
        window.history.pushState({}, '', url);
        this.performSearch(query);
      }
    });
  }

  async performSearch(query) {
    if (!query) {
      this.showError('Please enter a search term');
      return;
    }

    try {
      console.log('Sending search request for:', query); // Debug log
      const response = await fetch(`/news/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      console.log('Search response:', data); // Debug log

      if (data.success && Array.isArray(data.articles)) {
        this.articles = data.articles;
        this.displayResults();
      } else {
        throw new Error(data.error || 'Invalid response format');
      }
    } catch (error) {
      console.error('Search error:', error);
      this.showError(`Failed to fetch news articles: ${error.message}`);
    }
  }

  displayResults() {
    if (!this.resultsContainer) return;
    
    if (!this.articles || this.articles.length === 0) {
      this.resultsContainer.innerHTML = '<div class="no-articles">No articles found</div>';
      return;
    }

    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    const currentArticles = this.articles.slice(startIndex, endIndex);

    try {
      const articlesHtml = currentArticles
        .map(article => this.createArticleHtml(article))
        .join('');

      this.resultsContainer.innerHTML = `
        ${articlesHtml}
        ${this.createPaginationControls()}
      `;

      this.setupPaginationListeners();
    } catch (error) {
      console.error('Error displaying results:', error);
      this.showError('Error displaying articles');
    }
  }

  createArticleHtml(article) {
    if (!article.title || !article.link) return '';
    
    const safeTitle = this.escapeHtml(article.title);
    const safeDescription = this.escapeHtml(article.description || 'No description available');
    
    return `
      <article class="article">
        <h2 class="article__title">${safeTitle}</h2>
        ${article.image_url ? 
          `<div class="article__image-container">
            <img class="article__image" src="${article.image_url}" 
                 alt="${safeTitle}" loading="lazy" 
                 onerror="this.style.display='none'">
           </div>` 
          : ''
        }
        <p class="article__description">${safeDescription}</p>
        <a href="${article.link}" class="article__link url" 
           target="_blank" rel="noopener noreferrer">Read more</a>
      </article>
    `;
  }

  createPaginationControls() {
    const totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
    if (totalPages <= 1) return '';

    return `
      <div class="pagination">
        <button class="pagination__btn" 
                data-page="prev" 
                ${this.currentPage === 1 ? 'disabled' : ''}>
          Previous
        </button>
        <span class="pagination__info">
          Page ${this.currentPage} of ${totalPages}
        </span>
        <button class="pagination__btn" 
                data-page="next"
                ${this.currentPage === totalPages ? 'disabled' : ''}>
          Next
        </button>
      </div>
    `;
  }

  setupPaginationListeners() {
    const totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
    
    this.resultsContainer.querySelectorAll('.pagination__btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const direction = e.target.dataset.page;
        if (direction === 'prev' && this.currentPage > 1) {
          this.currentPage--;
        } else if (direction === 'next' && this.currentPage < totalPages) {
          this.currentPage++;
        }
        this.displayResults();
      });
    });
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  showError(message) {
    if (this.resultsContainer) {
      this.resultsContainer.innerHTML = `<div class="error">${message}</div>`;
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NewsApp();
});

const urlParams = new URLSearchParams(window.location.search);
window.myParam = urlParams.get("q"); // set it as a global variable

function getNews(query) {
  var apiKey = "842fad4e5f5e41f18b790f19082cd425";

  // Get today's date
  var today = new Date();

  // Calculate the date one week ago
  var oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Format the date in YYYY-MM-DD format
  var formattedDate = oneWeekAgo.toISOString().split("T")[0];

  var url = `https://newsapi.org/v2/top-headlines?q=${query}&from=${formattedDate}&sortBy=popularity&apiKey=${apiKey}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.articles.length === 0) {
        // Create a new div element
        var noArticles = document.createElement("div");
        noArticles.textContent = "No articles found";
        document.body.appendChild(noArticles);
      } else {
        data.articles.forEach((article) => {
          // Create a new div element for each article
          var articleDiv = document.createElement("div");
          articleDiv.className = "article"; // assign a class

          // Create a h2 element for the title
          var title = document.createElement("h2");
          title.className = "title"; // assign a class
          title.textContent = article.title;
          articleDiv.appendChild(title);

          // Create a p element for the description
          var description = document.createElement("p");
          description.className = "description"; // assign a class
          description.textContent = article.description;
          articleDiv.appendChild(description);

          // Create an a element for the URL
          var url = document.createElement("a");
          url.className = "url"; // assign a class
          url.href = article.url;
          url.textContent = "Read more";
          articleDiv.appendChild(url);

          // Append the article div to the body of the document
          document.body.appendChild(articleDiv);
        });
      }
    })
    .catch(function (error) {
      console.log("Error fetching data:", error);
    });
}

// Example usage:
var userQuery = window.myParam;
getNews(userQuery);

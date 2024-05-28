const urlParams = new URLSearchParams(window.location.search);
window.myParam = urlParams.get("q"); // set it as a global variable

const NEWS_API = process.env.NEWS_API_KEY;

function getNews(query) {
  var url = `https://newsdata.io/api/1/news?apikey=${NEWS_API}&q=${query}&language=en`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.status === "success") {
        data.results.forEach(function (article) {
          // Create a div for the article
          var articleDiv = document.createElement("div");
          articleDiv.className = "article"; // assign a class

          // Create a h2 element for the title
          var title = document.createElement("h2");
          title.textContent = article.title;
          articleDiv.appendChild(title);

          // Create a p element for the description
          var description = document.createElement("p");
          description.textContent = article.description;
          articleDiv.appendChild(description);

          // Create an img element for the image
          var image = document.createElement("img");
          image.src = article.image_url;
          image.style.width = "200px"; // set width
          image.style.height = "auto"; // set height to auto to maintain aspect ratio
          articleDiv.appendChild(image);

          // Create an a element for the URL
          var url = document.createElement("a");
          url.className = "url"; // assign a class
          url.href = article.link;
          url.textContent = "Read more";
          url.style.display = "block"; // set display to block
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

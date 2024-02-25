function getNews(query) {
  var apiKey = "842fad4e5f5e41f18b790f19082cd425";
  var url = `https://newsapi.org/v2/everything?q=${query}&from=2024-02-25&sortBy=popularity&apiKey=${apiKey}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data); // Handle the retrieved data here
    })
    .catch(function (error) {
      console.log("Error fetching data:", error);
    });
}

// Example usage:
var userQuery = "Microsoft";
getNews(userQuery);

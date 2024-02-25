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
      console.log(data); // Handle the retrieved data here
    })
    .catch(function (error) {
      console.log("Error fetching data:", error);
    });
}

// Example usage:
var userQuery = "Bitcoin";
getNews(userQuery);

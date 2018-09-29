const cities = [];
const searchBox = document.querySelector("#userCity");
const citiesList = document.querySelector(".places");
//Get the external endpoint to fetch the resource (cities)
const endpoint =
  "https://raw.githubusercontent.com/itemsapi/itemsapi-example-data/master/items/cities.json";

//Make the request for the Cities json response
fetch(endpoint)
  //  parses json payload and adds data from the response to citie's array
  .then(payload => payload.json())
  .then(data => cities.push(...data));

//Search: compare and match userInput with list of cities
function findMatches(wordToMatch, arr) {
  return arr.filter(place => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.country.match(regex);
  });
}

//get the matched array and generates the HTML for each element
function displayMatches() {
  const matchedArray = findMatches(this.value, cities);

  const markup = matchedArray
    .map(place => {
      return `
      <div class="card">
        <h3 class="card-title">${place.city}, ${
        place.country
      } <img class="country-icon" src="${place.country_icon}" /></h3>
        <h4 class="card-description">Province: ${place.province}</h4>
        <p class="card-description">Coordinates: ${place.latitude}, ${
        place.longitude
      }</p>
      </div>
    `;
    })
    .join("");

  //append generated markup from response to citie's list
  citiesList.innerHTML = markup;
}

//Listen for the change in user input
searchBox.addEventListener("change", displayMatches);
searchBox.addEventListener("keyup", displayMatches);

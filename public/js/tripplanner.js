// Search Trips Database
const searchTripPlanner = async (event) => {
    event.preventDefault();
  
    const searchTerm = document.querySelector("#search-term").value.trim();
  
    if (searchTerm) {
      try {
        const response = await fetch(`/api/trips/search?term=${searchTerm}`);
        const tripData = await response.json();
        console.log("Search results:", tripData);
  
        const searchResults = document.getElementById("search-results");
        searchResults.innerHTML = '';
  
        tripData.forEach((trip) => {
          const tripElement = document.createElement("div");
          tripElement.innerHTML = `
            <div class="border border-gray-500 flex-col flex p-4">
            <h3>${trip.tripname}</h3>
            <p>${trip.description}</p>
            <p>Budget: ${trip.budget}</p>
          `;
          searchResults.appendChild(tripElement);
        });
  
      } catch (error) {
        console.error("Error searching trips:", error);
      }
    }
  };
  
  document
    .querySelector("#search-form")
    .addEventListener("submit", searchTripPlanner);
  
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
            <div class="border border-gray-500 flex-col flex px-2 rounded-md shadow-md ml-4">
            <h3 class="font-bold justify-between flex">${trip.tripname}</h3>
            <p class="text-sm">Cost: $${trip.budget}</p>
            <p>${trip.description}</p>
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
  
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
            <div class="border border-gray-500 flex-col flex rounded-md shadow-md ml-4 justify-between mr-20 p-2 mb-4">
            <div class="flex justify-between">
            <h3 class="font-bold">${trip.tripname}</h3>
            <p class="text-sm mr-4 text-green-400">$${trip.budget}</p>
            </div>
            <p>${trip.description}</p>
            </div>
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
  
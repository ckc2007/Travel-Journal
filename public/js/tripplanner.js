// Search Trips Database
const searchTripPlanner = async (event) => {
    event.preventDefault();
  
    const searchTerm = document.querySelector("#search-term").value.trim();
  
    if (searchTerm) {
      try {
        const response = await fetch(`/api/trips/search?term=${searchTerm}`);
        const tripData = await response.json();
        console.log("Search results:", tripData);
  
        // Process the JSON data as needed
        // For example, you can iterate over the tripData array and display the results in the UI
        // Update the search-results div with the processed content
  
        const searchResults = document.getElementById("search-results");
        searchResults.innerHTML = ''; // Clear previous search results
  
        tripData.forEach((trip) => {
          const tripElement = document.createElement("div");
          tripElement.innerHTML = `
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
  
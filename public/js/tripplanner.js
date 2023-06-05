//Search Database for Trip Planner
const searchTripPlanner= async (event) => {
    event.preventDefault();
    
    const searchForm = document.querySelector('#search-form');
    const searchTerm = document.querySelector('#search-term').value.trim();
    
    if (text && storyId) {
      try {
        const response = await fetch(`/api/trips/search?term=${searchTerm}`, {
          method: 'GET',
          body: JSON.stringify({ text, storyId }),
          headers: {
            'Content-Type': 'application/json',
            },
         });
    
        if (response.ok) {
          const commentData = await response.json();
          console.log('Comment created:', commentData);
          document.location.reload();
  
        } else {
          console.error('Failed to create comment:', response.status);
          document.location.href = document.location.origin + '/login';
        }
      } catch (error) {
        console.error('Error creating comment:', error);
        document.location.href = document.location.origin + '/login';
        }
    }
  };

  document
  .querySelector('#comment-submit')
  .addEventListener('click', searchTripPlanner);
const newCommentHandler = async (event) => {
  event.preventDefault();
  
  const text = document.querySelector('#comment-textarea').value.trim();
  const storyId = window.location.pathname.split('/').pop();
  console.log('Comment Text:', text);
  console.log('Story ID:', storyId);
  
  if (text && storyId) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({ comments: text, story_id: storyId }),
       });
  
      if (response.ok) {
        const commentData = await response.json();
        // Successful creation of the comment
        console.log('Comment created:', commentData);

      } else {
        console.error('Failed to create comment:', response.status);
      }
    } catch (error) {
      // Network or other errors
      console.error('Error creating comment:', error);
    }
  }
};
  
document
  .querySelector('#comment-submit')
  .addEventListener('click', newCommentHandler);
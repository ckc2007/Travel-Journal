// const newCommentHandler = async (event) => {
//   event.preventDefault();

//  let text = document.querySelector('#comment-textarea').value.trim();

//   if (text) {
//     try {
//       const response = await fetch(`/api/comments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ story_id: storyId, comments: text }),
//       });

//       if (response.ok) {
//         const commentData = await response.json();
//         // Handle the successful creation of the comment
//         console.log('Comment created:', commentData);
//         document.querySelector('#comment-textarea').value = '';
//       } else {
//         // Handle the error case
//         console.error('Failed to create comment:', response.status);
//       }
//     } catch (error) {
//       // Handle any network or other errors
//       console.error('Error creating comment:', error);
//     }
//   }
// };

// const userComments = (commentData) => {
//   const comments = JSON.stringify(commentData);
//   return comments;
// };

// document
//   .querySelector('#comment-submit')
//   .addEventListener('click', newCommentHandler);


const newCommentHandler = async (event) => {
  event.preventDefault();
  
  const text = document.querySelector('#comment-textarea').value.trim();
  const storyId = window.location.pathname.split('/').pop();
  
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
        // Handle the successful creation of the comment
        console.log('Comment created:', commentData);
        // Perform any additional UI updates if needed
      } else {
        // Handle the error case
        console.error('Failed to create comment:', response.status);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error creating comment:', error);
    }
  }
};
  
document
  .querySelector('#comment-submit')
  .addEventListener('click', newCommentHandler);
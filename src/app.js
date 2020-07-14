import { http } from './http'
import { ui } from './ui'

// Get post on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost)

// Listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost)

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit)

//Get Posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}

//Submit Posts
function submitPost() {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value

  const data = {
    title: title,
    body: body
  }

  // Create Post
  http.post('http://localhost:3000/posts', data)
    .then( data => {
      ui.showAlert('Post Added', 'alert alert-success')
      ui.clearFields()
      getPosts()
    })
    .catch(err => console.log(err))
}

// Delete Post
function deletePost(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id
    if(confirm('Are you sure you want to delete post?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-success')
          getPosts()
        })
        .catch(err => console.log(err))
    }
  }

  e.preventDefault()
}

// Enable Edit State
function enableEdit(e) {
  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    const body = e.target.parentElement.previousElementSibling.textContent

    const data = {
      id: id,
      title: title,
      body: body
    }

    // Fill form with current data
    ui.fillForm(data)

    console.log(title)
  }

  e.preventDefault()
}
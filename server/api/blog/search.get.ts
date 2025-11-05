import {posts} from '../_posts'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const searchTerm = (query.q as string || '').toLowerCase()

  const allPosts = posts;

  await new Promise(resolve => setTimeout(resolve, 400))

  return allPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
})
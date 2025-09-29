
import { posts } from '../_posts'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = parseInt(query._page as string) || 1
  const limit = parseInt(query._limit as string) || 9
  const category = query.category as string

  // Mock data - replace with actual database calls
  const allPosts = posts;
  


  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500))

  let filteredPosts = category 
    ? allPosts.filter(p => p.category === category)
    : allPosts

  const start = (page - 1) * limit
  const end = start + limit
  const paginatedPosts = filteredPosts.slice(start, end)

  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
    page,
    totalPages: Math.ceil(filteredPosts.length / limit)
  }
})
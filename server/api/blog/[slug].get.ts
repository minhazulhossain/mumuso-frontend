import { posts } from '../_posts';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  // Mock data - replace with actual database call
//   const allPosts = posts;

  await new Promise(resolve => setTimeout(resolve, 400))

  const post = posts.find(p => p.slug === slug)
  
  if (!post) {
    throw createError({
      statusCode: 404,
      message: 'Post not found'
    })
  }

  return post
})
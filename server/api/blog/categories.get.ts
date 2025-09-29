export default defineEventHandler(async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return [
    { name: 'Tutorial', count: 15 },
    { name: 'Vue', count: 12 },
    { name: 'Backend', count: 8 },
    { name: 'DevOps', count: 6 },
    { name: 'Testing', count: 5 }
  ]
})
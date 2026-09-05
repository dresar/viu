import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return blogs
})

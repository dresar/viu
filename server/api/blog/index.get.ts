import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' }
  })
  return blogs
})

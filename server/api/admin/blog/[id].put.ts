import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)

  const blog = await prisma.blog.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      image: body.image,
      published: body.published,
      publishedAt: body.published && !body.publishedAt ? new Date() : body.publishedAt
    }
  })

  return { success: true, blog }
})

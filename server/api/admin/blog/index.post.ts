import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Generate slug from title
  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      slug,
      content: body.content,
      excerpt: body.excerpt,
      image: body.image,
      published: body.published || false,
      publishedAt: body.published ? new Date() : null
    }
  })

  return { success: true, blog }
})

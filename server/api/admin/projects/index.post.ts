import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const project = await prisma.project.create({
    data: {
      title: body.title,
      description: body.description,
      image: body.image,
      tags: JSON.stringify(body.tags || []),
      demoUrl: body.demoUrl,
      githubUrl: body.githubUrl,
      featured: body.featured || false
    }
  })

  return { success: true, project }
})

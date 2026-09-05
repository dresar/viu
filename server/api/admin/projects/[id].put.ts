import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)

  const project = await prisma.project.update({
    where: { id },
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

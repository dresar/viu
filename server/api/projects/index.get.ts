import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return projects.map(p => ({
    ...p,
    tags: p.tags ? JSON.parse(p.tags) : []
  }))
})

import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const about = await prisma.about.findFirst({
    orderBy: { updatedAt: 'desc' }
  })
  if (about && about.stats) {
    try {
      about.stats = typeof about.stats === 'string' ? JSON.parse(about.stats) : about.stats
    } catch {
      about.stats = { projects: 0, experience: 0, courses: 0, clients: 0 }
    }
  }
  return about || null
})

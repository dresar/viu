import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: 'desc' }
  })
  return experiences
})

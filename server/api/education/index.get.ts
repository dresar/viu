import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const educations = await prisma.education.findMany({
    orderBy: { startDate: 'desc' }
  })
  return educations
})

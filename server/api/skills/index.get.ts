import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const skills = await prisma.skill.findMany({
    orderBy: { level: 'desc' }
  })
  return skills
})

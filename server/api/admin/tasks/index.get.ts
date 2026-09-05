import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return tasks
})

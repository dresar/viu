import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const skill = await prisma.skill.create({
    data: {
      name: body.name,
      icon: body.icon,
      level: parseInt(body.level) || 0,
      category: body.category
    }
  })

  return { success: true, skill }
})

import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)

  const skill = await prisma.skill.update({
    where: { id },
    data: {
      name: body.name,
      icon: body.icon,
      level: parseInt(body.level) || 0,
      category: body.category
    }
  })

  return { success: true, skill }
})

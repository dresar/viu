import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)

  const contact = await prisma.contact.update({
    where: { id },
    data: {
      read: body.read
    }
  })

  return { success: true, contact }
})

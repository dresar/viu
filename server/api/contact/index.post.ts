import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const contact = await prisma.contact.create({
    data: {
      name: body.name,
      email: body.email,
      message: body.message
    }
  })

  return { success: true, contact }
})

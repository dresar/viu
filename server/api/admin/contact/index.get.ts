import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return contacts
})

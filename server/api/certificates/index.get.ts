import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const certificates = await prisma.certificate.findMany({
    orderBy: { issueDate: 'desc' }
  })
  return certificates
})

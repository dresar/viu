import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)

  const certificate = await prisma.certificate.update({
    where: { id },
    data: {
      title: body.title,
      issuer: body.issuer,
      issueDate: body.issueDate,
      expiryDate: body.expiryDate,
      credential: body.credential,
      url: body.url,
      image: body.image
    }
  })

  return { success: true, certificate }
})

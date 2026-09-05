import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const certificate = await prisma.certificate.create({
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

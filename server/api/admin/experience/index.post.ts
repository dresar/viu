import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const experience = await prisma.experience.create({
    data: {
      company: body.company,
      position: body.position,
      startDate: body.startDate,
      endDate: body.endDate,
      description: body.description,
      location: body.location,
      current: body.current || false
    }
  })

  return { success: true, experience }
})

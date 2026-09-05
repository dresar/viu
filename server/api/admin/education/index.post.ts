import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const education = await prisma.education.create({
    data: {
      institution: body.institution,
      degree: body.degree,
      field: body.field,
      startDate: body.startDate,
      endDate: body.endDate,
      description: body.description,
      grade: body.grade
    }
  })

  return { success: true, education }
})

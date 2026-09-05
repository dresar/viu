import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)

  const education = await prisma.education.update({
    where: { id },
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

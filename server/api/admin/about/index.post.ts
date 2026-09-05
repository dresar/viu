import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Delete existing about
  await prisma.about.deleteMany({})
  
  // Create new about
  const about = await prisma.about.create({
    data: {
      nama: body.nama,
      seorangApa: body.seorangApa,
      email: body.email,
      alamat: body.alamat,
      jabatan: body.jabatan,
      telepon: body.telepon,
      whatsapp: body.whatsapp,
      fotoFormal: body.fotoFormal,
      fotoNonFormal: body.fotoNonFormal,
      deskripsiSingkat: body.deskripsiSingkat,
      deskripsi: body.deskripsi || '',
      githubUrl: body.githubUrl,
      linkedinUrl: body.linkedinUrl,
      facebookUrl: body.facebookUrl,
      instagramUrl: body.instagramUrl,
      stats: body.stats || JSON.stringify({ projects: 0, experience: 0, courses: 0, clients: 0 }),
      cvUrl: body.cvUrl
    }
  })

  return { success: true, about }
})

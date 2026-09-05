import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)

  const about = await prisma.about.update({
    where: { id },
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
      deskripsi: body.deskripsi,
      githubUrl: body.githubUrl,
      linkedinUrl: body.linkedinUrl,
      facebookUrl: body.facebookUrl,
      instagramUrl: body.instagramUrl,
      stats: body.stats,
      cvUrl: body.cvUrl
    }
  })

  return { success: true, about }
})

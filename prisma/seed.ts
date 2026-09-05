import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword
    }
  })

  console.log('Created user:', user.username)

  // Create 20 default tasks
  const tasks = [
    { title: 'Setup database dan migration', description: 'Setup Prisma dengan SQLite', priority: 'high' },
    { title: 'Buat API authentication', description: 'Implementasi login dan register', priority: 'high' },
    { title: 'Buat admin panel', description: 'Dashboard dan sidebar navigation', priority: 'high' },
    { title: 'Form Tentang Saya', description: 'CRUD untuk section tentang saya', priority: 'medium' },
    { title: 'Form Pendidikan', description: 'CRUD untuk riwayat pendidikan', priority: 'medium' },
    { title: 'Form Keahlian', description: 'CRUD untuk skills dan teknologi', priority: 'medium' },
    { title: 'Form Proyek', description: 'CRUD untuk portfolio projects', priority: 'medium' },
    { title: 'Form Pengalaman', description: 'CRUD untuk work experience', priority: 'medium' },
    { title: 'Form Sertifikat', description: 'CRUD untuk certificates', priority: 'low' },
    { title: 'Form Blog', description: 'CRUD untuk blog posts', priority: 'low' },
    { title: 'Update frontend About', description: 'Fetch data dari API', priority: 'medium' },
    { title: 'Update frontend Skills', description: 'Fetch data dari API', priority: 'medium' },
    { title: 'Update frontend Projects', description: 'Fetch data dari API', priority: 'medium' },
    { title: 'Buat komponen Education', description: 'Section pendidikan di frontend', priority: 'low' },
    { title: 'Buat komponen Experience', description: 'Section pengalaman di frontend', priority: 'low' },
    { title: 'Buat komponen Certificates', description: 'Section sertifikat di frontend', priority: 'low' },
    { title: 'Buat komponen Blog', description: 'Section blog di frontend', priority: 'low' },
    { title: 'Testing semua fitur', description: 'Test CRUD operations', priority: 'high' },
    { title: 'Fix bugs dan error', description: 'Perbaiki semua error yang ditemukan', priority: 'high' },
    { title: 'Deploy aplikasi', description: 'Deploy ke production', priority: 'low' }
  ]

  for (const task of tasks) {
    await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        priority: task.priority as 'low' | 'medium' | 'high',
        completed: false
      }
    })
  }

  console.log('Created 20 default tasks')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

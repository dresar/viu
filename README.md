# Portfolio Website - Nuxt 3 dengan Backend & Admin Panel

Portfolio website modern dan responsive yang dibangun dengan Nuxt 3, Tailwind CSS, Prisma, dan SQLite. Dilengkapi dengan admin panel lengkap untuk mengelola semua konten.

## 🚀 Fitur

### Frontend
- ✨ Design modern dengan dark theme
- 📱 Fully responsive (Mobile, Tablet, Desktop)
- 🎨 Animasi smooth dengan @vueuse/motion
- 🌙 Dark mode toggle
- 📧 Contact form
- 🔗 Social media integration
- 💬 WhatsApp floating button

### Backend & Admin Panel
- 🔐 Authentication dengan JWT
- 📊 Admin Dashboard dengan Task Management (20 tasks)
- 📝 CRUD untuk semua section:
  - Tentang Saya
  - Pendidikan
  - Keahlian
  - Proyek
  - Pengalaman Kerja
  - Sertifikat
  - Blog
  - Kontak/Message
- 🗄️ Database SQLite dengan Prisma ORM
- ✅ Task Management System

## 🛠️ Tech Stack

- **Framework**: Nuxt 3
- **Styling**: Tailwind CSS v3
- **Icons**: nuxt-icon (Heroicons & Material Design Icons)
- **Animations**: @vueuse/motion
- **Database**: SQLite
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs

## 📦 Instalasi

1. Install dependencies:
```bash
npm install
```

2. Setup database:
```bash
npx prisma migrate dev
npx prisma db seed
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka browser di `http://localhost:3000`

## 🔑 Login Admin

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

**URL Admin Panel:** `http://localhost:3000/admin`

**URL Login:** `http://localhost:3000/login`

## 📁 Struktur Proyek

```
belajarnuxt/
├── assets/
│   └── css/
│       └── main.css          # Global styles & Tailwind
├── components/
│   ├── Navbar.vue            # Navigation bar
│   ├── Hero.vue              # Hero section
│   ├── About.vue             # About section
│   ├── Education.vue         # Education section
│   ├── Skills.vue            # Skills section
│   ├── Projects.vue          # Projects section
│   ├── ProjectCard.vue       # Project card component
│   ├── Experience.vue       # Experience section
│   ├── Certificates.vue      # Certificates section
│   ├── Blog.vue              # Blog section
│   ├── Contact.vue           # Contact section
│   ├── Footer.vue            # Footer
│   └── WhatsAppFloat.vue     # WhatsApp floating button
├── pages/
│   ├── index.vue             # Home page
│   ├── login.vue             # Login page
│   └── admin/
│       ├── index.vue         # Admin dashboard
│       ├── about.vue         # Manage About
│       ├── education.vue     # Manage Education
│       ├── skills.vue        # Manage Skills
│       ├── projects.vue      # Manage Projects
│       ├── experience.vue    # Manage Experience
│       ├── certificates.vue  # Manage Certificates
│       ├── blog.vue          # Manage Blog
│       └── contact.vue       # Manage Contact Messages
├── server/
│   ├── api/
│   │   ├── auth/             # Authentication endpoints
│   │   ├── admin/            # Admin CRUD endpoints
│   │   └── [sections]/       # Public API endpoints
│   ├── middleware/
│   │   └── auth.ts           # Auth middleware
│   └── utils/
│       ├── db.ts             # Prisma client
│       └── auth.ts           # Auth utilities
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts              # Database seed
├── composables/
│   └── useAuth.ts           # Auth composable
└── middleware/
    └── auth.ts               # Route middleware
```

## 🗄️ Database Schema

- **User**: Admin users
- **About**: About section content
- **Education**: Education history
- **Skill**: Skills and technologies
- **Project**: Portfolio projects
- **Experience**: Work experience
- **Certificate**: Certificates
- **Blog**: Blog posts
- **Contact**: Contact messages
- **Task**: Task management

## 📝 API Endpoints

### Public Endpoints
- `GET /api/about` - Get about data
- `GET /api/education` - Get education list
- `GET /api/skills` - Get skills list
- `GET /api/projects` - Get projects list
- `GET /api/experience` - Get experience list
- `GET /api/certificates` - Get certificates list
- `GET /api/blog` - Get published blog posts
- `POST /api/contact` - Submit contact form

### Auth Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Admin Endpoints (Requires Auth)
- `GET /api/admin/[section]` - Get all items
- `POST /api/admin/[section]` - Create new item
- `PUT /api/admin/[section]/[id]` - Update item
- `DELETE /api/admin/[section]/[id]` - Delete item

## 🎨 Kustomisasi

### Mengubah Warna
Edit `tailwind.config.js` untuk mengubah color palette.

### Menambah Data
Gunakan admin panel di `/admin` untuk menambah data.

### Mengubah Konten
Edit komponen-komponen di folder `components/` sesuai kebutuhan.

## 🚀 Build untuk Production

```bash
npm run build
```

## 📝 License

MIT License - bebas digunakan untuk proyek pribadi atau komersial.

## 👨‍💻 Author

Dibuat dengan ❤️ menggunakan Nuxt 3
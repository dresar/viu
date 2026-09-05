import { verifyToken, getTokenFromHeader } from '~/server/utils/auth'
import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const url = event.node.req.url || ''
  
  // Skip auth for public routes
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/about',
    '/api/projects',
    '/api/skills',
    '/api/education',
    '/api/experience',
    '/api/certificates',
    '/api/blog',
    '/api/contact',
    '/api/upload',
    '/uploads'
  ]
  
  // Check if it's a public route (allow upload without auth for now, can be secured later)
  if (publicRoutes.some(route => url.startsWith(route))) {
    return
  }

  // Check for admin routes
  if (url.startsWith('/api/admin')) {
    const token = getTokenFromHeader(event.node.req.headers.authorization)
    
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    const payload = verifyToken(token)
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      })
    }

    // Attach user to event context
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found'
      })
    }

    event.context.user = user
  }
})

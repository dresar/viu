import { comparePassword, generateToken } from '~/server/utils/auth'
import prisma from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username and password are required'
    })
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { username }
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  // Verify password
  const isValid = await comparePassword(password, user.password)
  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  // Generate token
  const token = generateToken({
    userId: user.id,
    username: user.username
  })

  return {
    success: true,
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  }
})

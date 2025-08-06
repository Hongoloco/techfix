import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface TokenPayload {
  userId: string
  email: string
}

interface Request {
  headers: {
    get(name: string): string | null
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string, email: string): string {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
    return decoded
  } catch {
    return null
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

export function verifyTokenFromRequest(request: Request): TokenPayload | null {
  const token = getTokenFromRequest(request)
  if (!token) {
    return null
  }
  return verifyToken(token)
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SignJWT } from 'jose'

const ADMIN_EMAIL = 'ale21rock@gmail.com'

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code')
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techfix.uy'
    const redirectUri = `${siteUrl}/api/auth/google/callback`

    if (!code || !clientId || !clientSecret) {
      return NextResponse.redirect(`${siteUrl}/login?error=google_config`)
    }

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    })

    const tokenData = await tokenRes.json()
    if (!tokenData.access_token) {
      return NextResponse.redirect(`${siteUrl}/login?error=google_token`)
    }

    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    })

    const profile = await profileRes.json()
    const email = String(profile.email || '').toLowerCase()

    if (email !== ADMIN_EMAIL) {
      return NextResponse.redirect(`${siteUrl}/login?error=unauthorized_google`)
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: profile.name || 'Ale',
        role: 'ADMIN'
      },
      create: {
        email,
        name: profile.name || 'Ale',
        password: '',
        role: 'ADMIN'
      }
    })

    const secret = new TextEncoder().encode(jwtSecret)
    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret)

    return NextResponse.redirect(`${siteUrl}/login?token=${encodeURIComponent(token)}&google=ok`)
  } catch (error) {
    console.error('Google auth callback error:', error)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techfix.uy'
    return NextResponse.redirect(`${siteUrl}/login?error=google_callback`)
  }
}

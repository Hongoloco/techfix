import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techfix.uy'

  if (!clientId) {
    return NextResponse.json({ error: 'Falta GOOGLE_CLIENT_ID' }, { status: 500 })
  }

  const redirectUri = `${siteUrl}/api/auth/google/callback`
  const scope = encodeURIComponent('openid email profile')
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&access_type=online&prompt=select_account`

  return NextResponse.redirect(url)
}

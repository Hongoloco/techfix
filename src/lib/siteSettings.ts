import { prisma } from '@/lib/prisma'

export type SiteSettings = {
  heroVideoUrl: string
  showcaseVideoUrl: string
  heroTitle: string
  heroSubtitle: string
  primaryCta: string
  secondaryCta: string
  accentColor: string
  accentSoftColor: string
  starColor: string
}

export const defaultSiteSettings: SiteSettings = {
  heroVideoUrl: '/techfix-repair-animation.mp4',
  showcaseVideoUrl: '/techfix-repair-animation.mp4',
  heroTitle: 'Tu tecnologia funcionando, sin vueltas.',
  heroSubtitle:
    'Arreglamos PC lentas, redes, configuraciones, backups y problemas tecnicos comunes con atencion directa en Las Piedras y soporte remoto cuando se puede.',
  primaryCta: 'Consultar soporte',
  secondaryCta: 'Armar presupuesto',
  accentColor: '#F4C542',
  accentSoftColor: '#45D6E8',
  starColor: '#F7C948',
}

const settingKey = 'site'

async function ensureSiteSettingsTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "SiteSetting" (
      "id" TEXT NOT NULL,
      "key" TEXT NOT NULL,
      "value" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
    )
  `)
  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "SiteSetting_key_key" ON "SiteSetting"("key")
  `)
}

function cleanUrl(value: unknown, fallback: string) {
  const text = typeof value === 'string' ? value.trim() : ''
  if (!text) return fallback
  return text
}

function cleanText(value: unknown, fallback: string, max = 220) {
  const text = typeof value === 'string' ? value.trim() : ''
  return text ? text.slice(0, max) : fallback
}

function cleanColor(value: unknown, fallback: string) {
  const text = typeof value === 'string' ? value.trim() : ''
  return /^#[0-9a-fA-F]{6}$/.test(text) ? text : fallback
}

export function sanitizeSiteSettings(input: Partial<SiteSettings>): SiteSettings {
  return {
    heroVideoUrl: cleanUrl(input.heroVideoUrl, defaultSiteSettings.heroVideoUrl),
    showcaseVideoUrl: cleanUrl(input.showcaseVideoUrl, defaultSiteSettings.showcaseVideoUrl),
    heroTitle: cleanText(input.heroTitle, defaultSiteSettings.heroTitle, 90),
    heroSubtitle: cleanText(input.heroSubtitle, defaultSiteSettings.heroSubtitle, 320),
    primaryCta: cleanText(input.primaryCta, defaultSiteSettings.primaryCta, 36),
    secondaryCta: cleanText(input.secondaryCta, defaultSiteSettings.secondaryCta, 36),
    accentColor: cleanColor(input.accentColor, defaultSiteSettings.accentColor),
    accentSoftColor: cleanColor(input.accentSoftColor, defaultSiteSettings.accentSoftColor),
    starColor: cleanColor(input.starColor, defaultSiteSettings.starColor),
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    await ensureSiteSettingsTable()
    const row = await prisma.siteSetting.findUnique({ where: { key: settingKey } })
    if (!row) return defaultSiteSettings
    return sanitizeSiteSettings(JSON.parse(row.value))
  } catch (error) {
    console.error('Error loading site settings:', error)
    return defaultSiteSettings
  }
}

export async function saveSiteSettings(input: Partial<SiteSettings>): Promise<SiteSettings> {
  const settings = sanitizeSiteSettings(input)

  await ensureSiteSettingsTable()
  await prisma.siteSetting.upsert({
    where: { key: settingKey },
    create: { key: settingKey, value: JSON.stringify(settings) },
    update: { value: JSON.stringify(settings) },
  })

  return settings
}

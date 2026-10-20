export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface Profile {
  firstName: string
  lastName: string
  logo: string
  title: string
  roles: string[]
  location: string
  email: string
  phone: string
  /** Optional: when set, resume buttons and the palette action appear */
  resumeUrl?: string
  about: string[]
  chips: { icon: string, label: string }[]
  stats: { value: number, suffix?: string, label: string }[]
  socials: SocialLink[]
}

export interface Service {
  icon: string
  title: string
  description: string
}

export interface SkillGroup {
  title: string
  icon: string
  skills: string[]
}

export interface Project {
  emoji: string
  title: string
  subtitle?: string
  description: string
  highlights?: string[]
  tags: string[]
  liveUrl?: string
  codeUrl?: string
  image?: string
  /** Shown under the "React Landing" filter chip */
  reactLanding?: boolean
}

export interface Experience {
  title: string
  company: string
  logo?: string
  sector?: string
  location?: string
  start: string
  end?: string
  current?: boolean
  description: string
  highlights?: string[]
}

export interface NavItem {
  id: string
  label: string
  icon: string
}

export interface Education {
  school: string
  degree: string
  start: string
  end: string
  location?: string
}

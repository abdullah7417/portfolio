// All portfolio content lives here. Edit this file to update the site.
import type { Education, Experience, NavItem, Profile, Project, Service, SkillGroup } from '~~/shared/types/portfolio'

export const profile: Profile = {
  firstName: 'Abdullah',
  lastName: 'Mohamed',
  logo: '<Abdullah.dev />',
  title: 'Frontend Developer',
  roles: [
    'Frontend Developer',
    'Vue.js & Nuxt Developer',
    'Angular Developer',
    'Responsive UI Builder',
  ],
  location: 'Mansoura, Egypt',
  email: 'abdullahmohamedf330@gmail.com',
  phone: '+201144484245',
  resumeUrl: '/Abdullah-Mohamed-Jr-Frontend-developer.pdf',
  about: [
    'I\'m a passionate Frontend Developer with hands-on experience building dynamic, user-friendly web applications with Vue.js, Nuxt and Angular. My expertise lies in creating responsive designs and implementing best practices to deliver seamless user experiences.',
    'Since September 2024 I\'ve been working as a Frontend Developer at Codebase, specializing in Vue.js, Nuxt, TailwindCSS and Bootstrap, and contributing to the development of several large-scale projects.',
  ],
  chips: [
    { icon: 'i-lucide-map-pin', label: 'Mansoura, Egypt' },
    { icon: 'i-lucide-code-xml', label: 'Frontend Developer' },
    { icon: 'i-lucide-layers', label: 'Vue.js & Nuxt' },
  ],
  stats: [
    { value: 2, suffix: '+', label: 'Years of experience' },
    { value: 8, label: 'Projects' },
    { value: 6, label: 'Services' },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/abdullah7417', icon: 'i-simple-icons-github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdullah-mohamed72/', icon: 'i-simple-icons-linkedin' },
    { label: 'Facebook', href: 'https://web.facebook.com/abdullah7422', icon: 'i-simple-icons-facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/abdullah.7417/', icon: 'i-simple-icons-instagram' },
  ],
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About', icon: 'i-lucide-user' },
  { id: 'skills', label: 'Skills', icon: 'i-lucide-code-xml' },
  { id: 'projects', label: 'Projects', icon: 'i-lucide-folder-git-2' },
  { id: 'experience', label: 'Experience', icon: 'i-lucide-briefcase' },
  { id: 'contact', label: 'Contact', icon: 'i-lucide-send' },
]

export const services: Service[] = [
  {
    icon: 'i-lucide-code-xml',
    title: 'Web Development',
    description: 'Robust, dynamic websites with HTML, CSS, JavaScript and frameworks like Vue, Angular, Bootstrap and TailwindCSS, from landing pages to complex web apps.',
  },
  {
    icon: 'i-lucide-file-text',
    title: 'Technical Writing',
    description: 'Clean, maintainable and scalable code with clear documentation and smooth team communication, so projects stay healthy long-term.',
  },
  {
    icon: 'i-lucide-smartphone',
    title: 'Responsive Design',
    description: 'Flexible layouts, grids and media queries so every site looks great and works flawlessly from desktop to mobile.',
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Security & Authentication',
    description: 'HTTPS, data protection and user authentication (OAuth, JWT) so only authorized users reach sensitive information.',
  },
  {
    icon: 'i-lucide-pen-tool',
    title: 'Design From Scratch',
    description: 'Custom designs tailored to your brand, from wireframes to final mockups, with a clean, modern and user-friendly interface.',
  },
  {
    icon: 'i-lucide-palette',
    title: 'Web Design',
    description: 'Visually appealing, intuitive websites focused on usability, engagement and conversions.',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages & Frameworks',
    icon: 'i-lucide-code-xml',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'Vue.js', 'Nuxt', 'Angular'],
  },
  {
    title: 'Styling & UI',
    icon: 'i-lucide-palette',
    skills: ['TailwindCSS', 'Bootstrap', 'SCSS', 'Responsive Design', 'Swiper'],
  },
  {
    title: 'Tools & Practices',
    icon: 'i-lucide-wrench',
    skills: ['Git', 'GitHub', 'REST APIs', 'JWT / OAuth', 'Clean Code', 'Technical Writing'],
  },
]

// Descriptions are drafts written from the live demos. Review and adjust them.
export const projects: Project[] = [
  {
    emoji: '🏗️',
    title: 'Contracting',
    subtitle: 'Project planning SaaS landing page',
    description: 'A landing page for Contrackting, a project planning and control platform, presenting its solutions, features, testimonials and pricing, with English and Arabic support. Built as a Vue single-page app.',
    tags: ['Vue.js', 'JavaScript', 'CSS'],
    liveUrl: 'https://abdullah7417.github.io/contracting/',
    codeUrl: 'https://github.com/abdullah7417/contracting',
    image: '/images/projects/contracting.png',
  },
  {
    emoji: '🎓',
    title: 'Circles Academy',
    subtitle: 'Nutrition & sports training academy',
    description: 'A training academy website for clinical and sports nutrition courses, with sliders, course sections and a responsive Bootstrap layout.',
    tags: ['HTML', 'SCSS', 'Bootstrap', 'JavaScript', 'Swiper'],
    liveUrl: 'https://abdullah7417.github.io/circles_academy/',
    codeUrl: 'https://github.com/abdullah7417/circles_academy',
    image: '/images/projects/circles.png',
  },
  {
    emoji: '🎨',
    title: 'Power of CSS',
    subtitle: 'Master project',
    description: 'A landing page that shows what pure CSS can do: layouts, effects and animations without any framework.',
    tags: ['HTML', 'CSS'],
    liveUrl: 'https://abdullah7417.github.io/power-of-css/',
    codeUrl: 'https://github.com/abdullah7417/power-of-css',
    image: '/images/projects/master.png',
  },
  {
    emoji: '🏢',
    title: 'Bondi',
    subtitle: 'Business landing page',
    description: 'A clean, responsive business template built with Bootstrap, with hero, services, portfolio and contact sections.',
    tags: ['HTML', 'CSS', 'Bootstrap'],
    liveUrl: 'https://abdullah7417.github.io/bondi/',
    codeUrl: 'https://github.com/abdullah7417/bondi',
    image: '/images/projects/bondi.png',
  },
  {
    emoji: '🍔',
    title: 'Burger',
    subtitle: 'Burger restaurant website',
    description: 'A restaurant website with a menu slider, scroll reveal animations and a mobile-friendly layout.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Swiper'],
    liveUrl: 'https://abdullah7417.github.io/Burger/',
    codeUrl: 'https://github.com/abdullah7417/Burger',
    image: '/images/projects/burger.png',
  },
  {
    emoji: '🍽️',
    title: 'Grilli',
    subtitle: 'Restaurant template',
    description: 'An elegant restaurant template with a hero slider, menu, reservation form and smooth interactions.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://abdullah7417.github.io/Grilli/',
    codeUrl: 'https://github.com/abdullah7417/Grilli',
    image: '/images/projects/grilli.png',
  },
  {
    emoji: '🧠',
    title: 'Memory Game',
    subtitle: 'Card matching game',
    description: 'A browser card-matching game that tracks attempts, flips cards with animations and resets on demand.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://abdullah7417.github.io/memory-game/',
    codeUrl: 'https://github.com/abdullah7417/memory-game',
    image: '/images/projects/game.png',
  },
  {
    emoji: '🧮',
    title: 'Calculator',
    subtitle: 'JavaScript calculator',
    description: 'A simple, responsive calculator that handles basic arithmetic with a clean keypad interface.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://abdullah7417.github.io/calculator/',
    codeUrl: 'https://github.com/abdullah7417/calculator',
    image: '/images/projects/calc.png',
  },
]

export const experiences: Experience[] = [
  {
    title: 'Frontend Developer',
    company: 'Codebase',
    logo: '/images/codebase.png',
    start: 'Sep 2024',
    current: true,
    description: 'Front-end developer specializing in Vue.js, Nuxt, TailwindCSS and Bootstrap.',
    highlights: [
      'Contributed to the development of several large-scale projects.',
    ],
  },
]

export const education: Education[] = [
  {
    school: 'Mansoura University',
    degree: 'Bachelor of Computer and Information Science',
    start: '2017',
    end: '2021',
    location: 'Mansoura, Egypt',
  },
]

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
    { value: 17, label: 'Projects' },
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

// Client projects come from the CV; tags combine the CV with what each live site is built on.
// `reactLanding` projects appear under the "React Landing" filter.
export const projects: Project[] = [
  {
    emoji: '💪',
    title: 'Salah Seleem Team',
    subtitle: 'Health & fitness platform',
    description: 'A responsive health and fitness platform for Salah Seleem Team, featuring personalized fitness programs, nutrition plans, success stories and seamless program enrollment to boost engagement and conversions.',
    tags: ['Blade', 'Nuxt', 'Tailwind CSS', 'REST API'],
    liveUrl: 'https://salahseleemteam.com/',
    image: '/images/projects/salah-seleem.jpg',
  },
  {
    emoji: '🏋️',
    title: 'FITEXPERT',
    subtitle: 'Fitness coaching platform',
    description: 'A responsive fitness platform for coaches to manage their clients, with dynamic content, optimized routing, SSR/SSG and a mobile-first UI for fast performance and seamless navigation.',
    tags: ['Nuxt', 'Tailwind CSS', 'REST API', 'SSR/SSG'],
    liveUrl: 'https://fitexpert.team/',
    image: '/images/projects/fitexpert.jpg',
  },
  {
    emoji: '🎓',
    title: 'Circles Academy',
    subtitle: 'Online learning platform',
    description: 'A specialized online learning platform offering internationally accredited courses in clinical nutrition, sports nutrition and personal training, with course enrollment, progress tracking, interactive learning tools and certification.',
    tags: ['Nuxt', 'Blade', 'Bootstrap'],
    liveUrl: 'https://eg.circlesacademy.info/',
    image: '/images/projects/circles-academy.jpg',
  },
  {
    emoji: '📚',
    title: 'Salah Abo El Magd',
    subtitle: 'Personal brand & course store',
    description: 'A responsive, content-rich website for Dr. Salah Abo Elmagd showcasing his publications, media presence and educational work, with dynamic content management and multilingual support.',
    tags: ['Nuxt', 'Vue.js', 'i18n'],
    liveUrl: 'https://saboelmagd.com/en',
    image: '/images/projects/saboelmagd.jpg',
  },
  {
    emoji: '🏠',
    title: 'RaQy',
    subtitle: 'Real estate listing platform',
    description: 'A modern real estate listing platform with advanced filtering, property search and a responsive UI, supporting dynamic property management and optimized performance on mobile and desktop.',
    tags: ['Nuxt', 'Vue.js', 'i18n'],
    liveUrl: 'https://raqy.net/',
    image: '/images/projects/raqy.jpg',
  },
  {
    emoji: '🚀',
    title: 'Mobadra Fitxpert',
    subtitle: 'React landing page',
    description: 'A responsive, conversion-focused landing page for the FITXPERT initiative, showcasing the program, subscription plans and benefits for fitness coaches and nutrition specialists to drive engagement and sign-ups.',
    tags: ['React', 'Vite'],
    liveUrl: 'https://mobadra.fitxpert.team/',
    image: '/images/projects/mobadra-fitxpert.jpg',
    reactLanding: true,
  },
  {
    emoji: '📊',
    title: 'SST Affiliate Dashboard',
    subtitle: 'Affiliate dashboard',
    description: 'A responsive affiliate dashboard built with React and AI-assisted coding, letting affiliates track referrals, monitor commissions and wallet balances, review transactions and manage payout history.',
    tags: ['React', 'AI-assisted'],
  },
  {
    emoji: '🎯',
    title: 'FITEXPERT Landing Page',
    subtitle: 'Marketing landing page',
    description: 'A responsive, conversion-focused landing page for the FITXPERT coaching platform, showcasing its features, subscription plans and benefits, with free-trial and demo calls to action.',
    tags: ['Nuxt', 'Vue.js'],
    liveUrl: 'https://landing.fitxpert.team/',
    image: '/images/projects/fitexpert-landing.jpg',
  },
  {
    emoji: '🤖',
    title: 'ITrainer',
    subtitle: 'AI diet & workout planner',
    description: 'A landing page for the iTrainer AI-based diet and workout planner app, with app store links and feature highlights.',
    tags: ['Blade', 'jQuery', 'Swiper'],
    liveUrl: 'https://v4.itrainer.fit/',
    image: '/images/projects/itrainer.jpg',
  },
  {
    emoji: '🍕',
    title: 'Cut-Cuts',
    subtitle: 'Restaurant digital menu',
    description: 'A digital menu platform for restaurants, with menu browsing and customer feedback.',
    tags: ['Blade', 'Vue.js'],
    liveUrl: 'https://cut-cuts.com/',
    image: '/images/projects/cut-cuts.jpg',
  },
  {
    emoji: '🥇',
    title: 'Moamen Maher',
    subtitle: 'Fitness coaching website',
    description: 'An online fitness coaching website for coach Moamen Maher, presenting his programs and client results.',
    tags: ['Blade', 'jQuery', 'Swiper'],
    liveUrl: 'https://www.momaher.com/',
    image: '/images/projects/moamen-maher.jpg',
  },
  {
    emoji: '🔥',
    title: 'Osama Said',
    subtitle: 'Fitness coaching website',
    description: 'An online fitness coaching website for coach Osama Said, selling training and nutrition subscriptions.',
    tags: ['Blade', 'jQuery'],
    liveUrl: 'https://www.coachosama.com/',
    image: '/images/projects/osama-said.jpg',
  },
  {
    emoji: '🥗',
    title: 'OH FIT-Nutrition',
    subtitle: 'Fitness & nutrition coaching',
    description: 'A fitness and nutrition coaching website with subscription plans and client success stories.',
    tags: ['Blade', 'jQuery'],
    liveUrl: 'https://ohfit-nutrition.com/',
    image: '/images/projects/ohfit-nutrition.jpg',
  },
  {
    emoji: '🏃',
    title: 'Fit By HK',
    subtitle: 'Online coaching website',
    description: 'An online coaching website for Captain Hassan Kaoud, selling coaching subscriptions.',
    tags: ['Blade', 'jQuery'],
    liveUrl: 'https://fitbyhk.com/',
    image: '/images/projects/fitbyhk.jpg',
  },
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
    emoji: '🍔',
    title: 'Burger',
    subtitle: 'Burger restaurant website',
    description: 'A modern restaurant website with SwiperJS sliders, scroll reveal animations and a mobile-friendly layout.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Swiper'],
    liveUrl: 'https://abdullah7417.github.io/Burger/',
    codeUrl: 'https://github.com/abdullah7417/Burger',
    image: '/images/projects/burger.png',
  },
  {
    emoji: '🎨',
    title: 'Power of CSS',
    subtitle: 'CSS showcase',
    description: 'A visual and interactive exploration of CSS that demonstrates its ability to create advanced designs, effects and animations with just HTML and CSS.',
    tags: ['HTML', 'CSS'],
    liveUrl: 'https://abdullah7417.github.io/power-of-css/',
    codeUrl: 'https://github.com/abdullah7417/power-of-css',
    image: '/images/projects/master.png',
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

// Default fallback data for when API is unavailable or has no data
import heroimg from '../assets/hero.webp'
export const defaultSettings = {
  siteName: 'Voie Canada',
  siteTagline: 'Your Pathway to Canada',
  logo: '',
  hero: {
    badge: {
      text: 'IMMIGRATION CANADA',
      icon: 'flag'
    },
    headline: 'Your Pathway to Canada',
    subheadline: 'Immigration & Education Made Personal',
    description: 'Helping professionals, entrepreneurs, and students achieve their Canadian dream with personalized guidance and expert support.',
    backgroundImage: heroimg,
    overlayOpacity: 0.75,
    overlayDirection: 'left',
    textPosition: 'left',
    primaryCTA: {
      text: 'Explore Immigration Options',
      link: '/immigration'
    },
    secondaryCTA: {
      text: 'Discover Education Programs',
      link: '/education'
    },
    showStats: true,
    stats: [
      { value: '500+', label: 'Families Settled' },
      { value: '300+', label: 'Students Admitted' },
      { value: '95%', label: 'Success Rate' }
    ]
  },
  trustStats: [
    { number: '500+', label: 'Families Settled', icon: 'users' },
    { number: '300+', label: 'Students Admitted', icon: 'graduation' },
    { number: '95%', label: 'Success Rate', icon: 'check' },
    { number: '50+', label: 'Countries Served', icon: 'globe' }
  ],
  differentiator: {
    title: 'Why Choose Us',
    headline: 'Inclusive Education & Tailored Immigration Support',
    description: 'At Voie Canada, we specialize in inclusive education pathways and tailored entrepreneur immigration programs. Our unique expertise in supporting academically challenged students sets us apart.',
    points: [
      { title: 'Specialized Student Support', description: 'Expert guidance for students with learning challenges' },
      { title: 'Entrepreneur Immigration', description: 'Dedicated startup visa and business immigration programs' },
      { title: 'Personalized Approach', description: 'One-on-one guidance tailored to your unique journey' }
    ]
  },
  contact: {
    email: 'info@voiecanada.com',
    phone: '+1 (XXX) XXX-XXXX',
    whatsapp: '+1XXXXXXXXXX',
    offices: [
      {
        country: 'Canada',
        city: 'Toronto',
        address: '123 Main Street, Suite 400',
        phone: '+1 (416) XXX-XXXX',
        email: 'toronto@voiecanada.com',
        hours: 'Mon-Fri: 9:00 AM - 6:00 PM EST',
        mapLink: ''
      },
      {
        country: 'India',
        city: 'New Delhi',
        address: '456 Business Park, Floor 5',
        phone: '+91 XXX XXX XXXX',
        email: 'delhi@voiecanada.com',
        hours: 'Mon-Sat: 10:00 AM - 7:00 PM IST',
        mapLink: ''
      }
    ]
  },
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com'
  },
  certifications: [
    { name: 'ICCRC', description: 'Immigration Consultants of Canada Regulatory Council' },
    { name: 'CAPIC', description: 'Canadian Association of Professional Immigration Consultants' },
    { name: 'CSIC', description: 'Canadian Society of Immigration Consultants' }
  ],
  processSteps: [
    { number: 1, title: 'Free Consultation', description: 'Share your goals with us. We assess your eligibility and recommend the best pathway for your unique situation.' },
    { number: 2, title: 'Personalized Strategy', description: 'Our experts create a tailored immigration or education plan designed specifically for your needs and timeline.' },
    { number: 3, title: 'Document Preparation', description: 'We guide you through every document, ensuring accuracy and completeness for a successful application.' },
    { number: 4, title: 'Application Submission', description: 'Your application is professionally prepared and submitted. We handle the complexity so you can focus on your journey.' },
    { number: 5, title: 'Ongoing Support', description: 'From approval to arrival, we provide continuous guidance for settlement, education, and career success.' }
  ],
  faqs: [
    { question: 'How long does the immigration process take?', answer: 'Processing times vary by program. Express Entry typically takes 6-8 months, while Provincial Nominee Programs may take 12-18 months. We provide realistic timelines during your consultation.', category: 'immigration' },
    { question: 'What are the costs for immigration services?', answer: 'Our fees vary based on the complexity of your case. We offer transparent pricing with no hidden costs. Book a free consultation to receive a personalized quote.', category: 'immigration' },
    { question: 'Do you help with student visas?', answer: 'Yes! We specialize in student visas and university admissions. Our education consultants help with program selection, application, and study permit processing.', category: 'education' },
    { question: 'Can you help if my application was refused?', answer: 'Absolutely. We have extensive experience with refusal cases. Our team analyzes the refusal reasons and creates a strong strategy for reapplication or appeal.', category: 'immigration' },
    { question: 'What makes Voie Canada different?', answer: 'We specialize in inclusive education for students with learning challenges and provide personalized immigration strategies. Our unique expertise sets us apart from generic consultancies.', category: 'general' },
    { question: 'Do you offer services in languages other than English?', answer: 'Yes, our team provides services in multiple languages including Hindi, Punjabi, French, and others. We ensure clear communication throughout your journey.', category: 'general' }
  ],
  ctaSection: {
    headline: 'Start Your Canadian Journey Today',
    description: 'Take the first step towards your Canadian dream. Get a free assessment or book a consultation with our experts.',
    primaryButton: {
      text: 'Free Assessment',
      link: '/assessment'
    },
    secondaryButton: {
      text: 'Book Consultation',
      link: '/contact'
    }
  },
  footer: {
    aboutText: 'Your trusted partner for Canadian immigration and education services. Helping professionals, entrepreneurs, and students achieve their Canadian dream.',
    copyrightText: '© {year} Voie Canada. All rights reserved.'
  },

  // Homepage Sections - Dynamic sections for the homepage
  homepageSections: [
    {
      id: 'study-canada',
      type: 'image-content',
      title: 'Study in Canada',
      subtitle: 'Education Pathways',
      description: 'Canada hosts over 800,000 international students annually, offering world-class education at globally ranked institutions. We guide you through every step—from program selection to visa approval and beyond.',
      image: 'https://santamonicaedu.in/wp-content/uploads/2023/03/blog-3-1.jpg.webp',
      imageAlt: 'International students studying in Canada',
      points: [
        { title: 'Top Universities', description: 'Access to world-renowned institutions', icon: 'academic' },
        { title: 'Work Opportunities', description: 'Post-graduation work permits available', icon: 'work' },
        { title: 'Pathway to PR', description: 'Education leads to permanent residency', icon: 'passport' }
      ],
      cta: {
        primary: { text: 'Explore Programs', link: '/education' },
        secondary: { text: 'Talk to an Advisor', link: '/contact' }
      },
      backgroundColor: 'white',
      order: 1,
      isActive: true
    },
    {
      id: 'immigration-made-easy',
      type: 'content-image',
      title: 'Immigration Made Easy',
      subtitle: 'Your Journey Starts Here',
      description: 'Navigating Canadian immigration can be complex. Our RCIC-certified consultants simplify the process, ensuring your application has the best chance of success. From Express Entry to Provincial Nominee Programs, we handle it all.',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Canadian immigration documents',
      points: [
        { title: 'Express Entry', description: 'Fast-track your PR application', icon: 'rocket' },
        { title: 'Provincial Programs', description: 'Explore PNPs across Canada', icon: 'map' },
        { title: 'Family Sponsorship', description: 'Reunite with loved ones', icon: 'heart' }
      ],
      cta: {
        primary: { text: 'Get Started', link: '/immigration' },
        secondary: { text: 'Free Assessment', link: '/assessment' }
      },
      backgroundColor: 'gray',
      order: 2,
      isActive: true
    },
    {
      id: 'entrepreneur-pathway',
      type: 'image-content',
      title: 'Entrepreneur & Startup Visa',
      subtitle: 'Business Immigration',
      description: 'Build your business in Canada. Our startup visa program helps entrepreneurs launch innovative ventures with access to venture capital, incubators, and a pathway to permanent residency.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Business entrepreneurs in Canada',
      points: [
        { title: 'Startup Visa', description: 'Launch your innovative business', icon: 'lightbulb' },
        { title: 'Investor Programs', description: 'Invest and immigrate', icon: 'chart' },
        { title: 'Business Setup', description: 'Complete support from idea to launch', icon: 'briefcase' }
      ],
      cta: {
        primary: { text: 'Explore Immigration', link: '/immigration/startup-visa' },
        secondary: { text: 'Consult an Expert', link: '/contact' }
      },
      backgroundColor: 'white',
      order: 3,
      isActive: true
    },
    // {
    //   id: 'inclusive-education',
    //   type: 'content-image',
    //   title: 'Inclusive Education Support',
    //   subtitle: 'Specialized Programs',
    //   description: 'Every student deserves the opportunity to succeed. We specialize in finding the right educational environment for students with learning challenges, special needs, and unique requirements.',
    //   image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    //   imageAlt: 'Student receiving personalized education support',
    //   points: [
    //     { title: 'Needs Assessment', description: 'Understanding your unique requirements', icon: 'clipboard' },
    //     { title: 'School Matching', description: 'Finding schools with proper support', icon: 'search' },
    //     { title: 'Ongoing Guidance', description: 'Support throughout your journey', icon: 'support' }
    //   ],
    //   cta: {
    //     primary: { text: 'Learn More', link: '/education/specialized-programs' },
    //     secondary: { text: 'Contact Us', link: '/contact' }
    //   },
    //   backgroundColor: 'gray',
    //   order: 4,
    //   isActive: true
    // }
  ],

  // Enhanced Stats Section
  statsSection: {
    title: 'Trusted by Hundreds of Families',
    subtitle: 'Our track record speaks for itself',
    backgroundColor: 'gray',
    stats: [
      { number: '500+', label: 'Families Settled', icon: 'users', description: 'Successfully helped families relocate to Canada' },
      { number: '300+', label: 'Students Admitted', icon: 'graduation', description: 'Students placed in top Canadian institutions' },
      { number: '95%', label: 'Success Rate', icon: 'check', description: 'High approval rate for applications' },
      { number: '50+', label: 'Countries Served', icon: 'globe', description: 'Clients from around the world' }
    ]
  },

  // Testimonials Section Settings
  testimonialsSection: {
    title: 'Success Stories',
    subtitle: 'Real Journeys. Real Success.',
    description: 'From visa approvals to inclusive education placements, we make every journey possible.',
    backgroundColor: 'gray'
  },

  // CTA Banner
  ctaBanner: {
    headline: 'Start Your Canadian Journey Today',
    description: 'Take the first step towards your Canadian dream. Get a free assessment or book a consultation with our experts.',
    backgroundImage: 'https://i0.wp.com/calmatters.org/wp-content/uploads/2025/06/050625-TurnitinAICollege-JAH-CM-02.jpg?resize=1536%2C1024&ssl=1',
    backgroundColor: 'blue',
    primaryButton: {
      text: 'Free Assessment',
      link: '/assessment'
    },
    secondaryButton: {
      text: 'Book Consultation',
      link: '/contact'
    }
  }
};

export const defaultImmigrationServices = [
  {
    _id: 'imm-1',
    title: 'Express Entry & Skilled Worker Programs',
    slug: 'express-entry',
    description: 'Fast-track your Canadian permanent residency through Express Entry, Federal Skilled Worker, Canadian Experience Class, and Federal Skilled Trades programs.',
    category: 'immigration',
    benefits: ['CRS Score Optimization', 'Profile Enhancement', 'Documentation Support', 'Post-PR Guidance'],
    isActive: true
  },
  {
    _id: 'imm-2',
    title: 'Entrepreneur & Startup Visa Programs',
    slug: 'startup-visa',
    description: 'Launch your business in Canada with expert support for Startup Visa, Self-Employed Persons, and Business Immigration programs.',
    category: 'immigration',
    benefits: ['Business Plan Development', 'Investor Connections', 'Application Support', 'Business Setup Guidance'],
    isActive: true
  },
  {
    _id: 'imm-3',
    title: 'Provincial Nominee Programs (PNP)',
    slug: 'pnp',
    description: 'Explore immigration opportunities across Canada\'s provinces and territories with tailored PNP guidance for your skills and goals.',
    category: 'immigration',
    benefits: ['Province Selection', 'Stream Optimization', 'Documentation Support', 'Settlement Planning'],
    isActive: true
  },
  {
    _id: 'imm-4',
    title: 'Francophone Immigration Pathways',
    slug: 'francophone',
    description: 'Specialized support for French-speaking applicants seeking to immigrate to Canada through Francophone immigration streams.',
    category: 'immigration',
    benefits: ['Language Assessment', 'Program Selection', 'Application Support', 'Community Integration'],
    isActive: true
  },
  {
    _id: 'imm-5',
    title: 'Complex Case Handling',
    slug: 'complex-cases',
    description: 'Expert support for appeals, refusals, and reapplications. We navigate complex immigration situations with proven strategies.',
    category: 'immigration',
    benefits: ['Case Analysis', 'Appeal Strategy', 'Documentation Review', 'Representation'],
    isActive: true
  },
  {
    _id: 'imm-6',
    title: 'Post-Arrival Settlement Services',
    slug: 'settlement',
    description: 'Comprehensive support for housing, banking, community integration, and essential services after you arrive in Canada.',
    category: 'immigration',
    benefits: ['Housing Assistance', 'Banking Setup', 'Community Connections', 'Essential Services'],
    isActive: true
  }
];

export const defaultEducationServices = [
  {
    _id: 'edu-1',
    title: 'College & University Admissions',
    slug: 'admissions',
    description: 'Secure admission to Canada\'s top institutions with personalized guidance on programs, applications, and enrollment.',
    category: 'education',
    benefits: ['University Selection', 'Application Support', 'Document Preparation', 'Enrollment Guidance'],
    isActive: true,
    badge: 'Popular'
  },
  {
    _id: 'edu-2',
    title: 'Specialized Programs for Challenged Students',
    slug: 'specialized-programs',
    description: 'Inclusive support for students with learning challenges, special needs, and unique educational requirements.',
    category: 'education',
    benefits: ['Needs Assessment', 'School Matching', 'Accommodation Support', 'Ongoing Guidance'],
    isActive: true,
    badge: 'Unique'
  },
  {
    _id: 'edu-3',
    title: 'Bridge & Foundation Programs',
    slug: 'bridge-programs',
    description: 'Prepare for success with bridge programs and foundation courses designed for international students.',
    category: 'education',
    benefits: ['Program Selection', 'Academic Preparation', 'Language Support', 'Credit Transfer'],
    isActive: true
  },
  {
    _id: 'edu-4',
    title: 'Scholarship & Financial Aid Guidance',
    slug: 'scholarships',
    description: 'Maximize your opportunities with tailored scholarship support and financial aid application assistance.',
    category: 'education',
    benefits: ['Scholarship Search', 'Application Support', 'Financial Planning', 'Award Guidance'],
    isActive: true
  },
  {
    _id: 'edu-5',
    title: 'Career Clarity & Aptitude Testing',
    slug: 'career-clarity',
    description: 'Discover the right program for your future with professional career guidance and aptitude assessments.',
    category: 'education',
    benefits: ['Career Assessment', 'Aptitude Testing', 'Program Matching', 'Career Planning'],
    isActive: true
  },
  {
    _id: 'edu-6',
    title: 'Parent Advisory Services',
    slug: 'parent-advisory',
    description: 'Comprehensive guidance for families relocating with children, including school selection and educational planning.',
    category: 'education',
    benefits: ['School Selection', 'Educational Planning', 'Family Support', 'Transition Guidance'],
    isActive: true
  }
];

export const defaultTestimonials = [
  {
    _id: 'test-1',
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    company: 'Toronto, Canada',
    quote: 'From visa refusal to successful PR in 8 months. Voie Canada\'s expertise in handling complex cases was remarkable. They identified the issues with my previous application and guided me through every step.',
    category: 'professional',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'test-2',
    name: 'Ananya Patel',
    role: 'Student',
    company: 'University of British Columbia',
    quote: 'As a student with dyslexia, I thought studying abroad was impossible. Voie Canada found the perfect university with learning support. I\'m now thriving in my computer science program!',
    category: 'student',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'test-3',
    name: 'Mohammed & Sarah Ahmed',
    role: 'Entrepreneurs',
    company: 'Tech Startup, Vancouver',
    quote: 'Their startup visa guidance was exceptional. From business plan to PR, they supported us at every step. We\'re now running a successful tech company in Vancouver.',
    category: 'entrepreneur',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'test-4',
    name: 'The Johnson Family',
    role: 'Family',
    company: 'Calgary, Canada',
    quote: 'Moving our family of four was overwhelming. Voie Canada handled everything - from our Express Entry application to finding schools for our children. They made Canada feel like home.',
    category: 'family',
    isActive: true
  },
  {
    _id: 'test-5',
    name: 'Priya Sharma',
    role: 'Data Analyst',
    company: 'Toronto, Canada',
    quote: 'The PNP process seemed complicated, but Voie Canada made it simple. They helped me navigate the Ontario Immigrant Nominee Program and I received my nomination within months.',
    category: 'professional',
    isActive: true
  },
  {
    _id: 'test-6',
    name: 'David & Maria Rodriguez',
    role: 'Parents',
    company: 'Montreal, Canada',
    quote: 'My son has autism, and we were worried about his education in a new country. Voie Canada connected us with schools that offer excellent special needs programs. He\'s thriving now!',
    category: 'family',
    isActive: true
  }
];

export const defaultBlogPosts = [
  {
    _id: 'blog-1',
    title: 'Understanding Express Entry Draws in 2026',
    slug: 'express-entry-draws-2026',
    excerpt: 'Latest updates on Express Entry draws and what they mean for your application.',
    category: 'Immigration',
    author: 'John Smith',
    publishedAt: '2026-03-15',
    isPublished: true
  },
  {
    _id: 'blog-2',
    title: 'Top Scholarships for International Students in Canada',
    slug: 'top-scholarships-canada',
    excerpt: 'Discover the best scholarship opportunities for international students.',
    category: 'Education',
    author: 'Sarah Johnson',
    publishedAt: '2026-03-10',
    isPublished: true
  },
  {
    _id: 'blog-3',
    title: 'Schools Offering Learning Support in Canada',
    slug: 'schools-learning-support-canada',
    excerpt: 'A guide to Canadian institutions with excellent support services for students with learning challenges.',
    category: 'Education',
    author: 'Emily Williams',
    publishedAt: '2026-03-05',
    isPublished: true
  },
  {
    _id: 'blog-4',
    title: 'Provincial Nominee Program Updates',
    slug: 'pnp-updates-2026',
    excerpt: 'Recent changes to PNP streams and how they affect your immigration strategy.',
    category: 'Immigration',
    author: 'Michael Chen',
    publishedAt: '2026-03-01',
    isPublished: true
  },
  {
    _id: 'blog-5',
    title: 'Bridge Programs for International Students',
    slug: 'bridge-programs-international-students',
    excerpt: 'How bridge programs can help you transition to Canadian universities.',
    category: 'Education',
    author: 'Sarah Johnson',
    publishedAt: '2026-02-25',
    isPublished: true
  },
  {
    _id: 'blog-6',
    title: 'Settlement Tips for Newcomers',
    slug: 'settlement-tips-newcomers',
    excerpt: 'Essential advice for your first months in Canada.',
    category: 'Settlement',
    author: 'John Smith',
    publishedAt: '2026-02-20',
    isPublished: true
  }
];

export const defaultResources = [
  {
    _id: 'res-1',
    title: 'Top 10 Canadian Universities for International Students',
    description: 'A comprehensive guide to the best universities in Canada for international students.',
    type: 'PDF Guide',
    pages: '15 pages',
    downloadUrl: '#'
  },
  {
    _id: 'res-2',
    title: 'Express Entry Complete Guide 2026',
    description: 'Everything you need to know about Express Entry, from eligibility to application.',
    type: 'PDF Guide',
    pages: '20 pages',
    downloadUrl: '#'
  },
  {
    _id: 'res-3',
    title: 'Scholarships for International Students',
    description: 'Discover scholarship opportunities and financial aid options for studying in Canada.',
    type: 'PDF Guide',
    pages: '12 pages',
    downloadUrl: '#'
  },
  {
    _id: 'res-4',
    title: 'Inclusive Education Guide for Parents',
    description: 'Understanding special education options in Canadian schools.',
    type: 'PDF Guide',
    pages: '10 pages',
    downloadUrl: '#'
  }
];

export const defaultTeamMembers = [
  {
    _id: 'team-1',
    name: 'John Smith',
    title: 'Founder & Lead Consultant',
    bio: '15+ years of experience in Canadian immigration law and consultancy.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  },
  {
    _id: 'team-2',
    name: 'Sarah Johnson',
    title: 'Education Specialist',
    bio: 'Expert in Canadian university admissions and inclusive education pathways.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
  },
  {
    _id: 'team-3',
    name: 'Michael Chen',
    title: 'Immigration Consultant',
    bio: 'RCIC certified with expertise in Express Entry and Provincial Nominee Programs.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    _id: 'team-4',
    name: 'Emily Williams',
    title: 'Student Advisor',
    bio: 'Specializes in supporting students with learning challenges and unique needs.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80'
  }
];

export const defaultProcessSteps = [
  {
    number: 1,
    title: 'Free Consultation',
    description: 'Share your goals with us. We assess your eligibility and recommend the best pathway for your unique situation.'
  },
  {
    number: 2,
    title: 'Personalized Strategy',
    description: 'Our experts create a tailored immigration or education plan designed specifically for your needs and timeline.'
  },
  {
    number: 3,
    title: 'Document Preparation',
    description: 'We guide you through every document, ensuring accuracy and completeness for a successful application.'
  },
  {
    number: 4,
    title: 'Application Submission',
    description: 'Your application is professionally prepared and submitted. We handle the complexity so you can focus on your journey.'
  },
  {
    number: 5,
    title: 'Ongoing Support',
    description: 'From approval to arrival, we provide continuous guidance for settlement, education, and career success.'
  }
];

export const defaultFaqs = [
  {
    question: 'How long does the immigration process take?',
    answer: 'Processing times vary by program. Express Entry typically takes 6-8 months, while Provincial Nominee Programs may take 12-18 months. We provide realistic timelines during your consultation.',
    category: 'immigration'
  },
  {
    question: 'What are the costs for immigration services?',
    answer: 'Our fees vary based on the complexity of your case. We offer transparent pricing with no hidden costs. Book a free consultation to receive a personalized quote.',
    category: 'immigration'
  },
  {
    question: 'Do you help with student visas?',
    answer: 'Yes! We specialize in student visas and university admissions. Our education consultants help with program selection, application, and study permit processing.',
    category: 'education'
  },
  {
    question: 'Can you help if my application was refused?',
    answer: 'Absolutely. We have extensive experience with refusal cases. Our team analyzes the refusal reasons and creates a strong strategy for reapplication or appeal.',
    category: 'immigration'
  },
  {
    question: 'What makes Voie Canada different?',
    answer: 'We specialize in inclusive education for students with learning challenges and provide personalized immigration strategies. Our unique expertise sets us apart from generic consultancies.',
    category: 'general'
  },
  {
    question: 'Do you offer services in languages other than English?',
    answer: 'Yes, our team provides services in multiple languages including Hindi, Punjabi, French, and others. We ensure clear communication throughout your journey.',
    category: 'general'
  }
];
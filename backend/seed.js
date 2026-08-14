const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Service = require('./models/Service');
const Package = require('./models/Package');
const Testimonial = require('./models/Testimonial');

dotenv.config();

const services = [
  {
    icon: 'User',
    title: 'One-on-One Mentorship',
    desc: 'Personalized support focused on accountability, confidence, life skills, personal growth, and purpose.',
    details: 'Our one-on-one mentorship is the foundation of everything we do. You will work directly with a mentor who understands your journey and is committed to walking alongside you toward lasting change.',
    audience: 'Any individual seeking personal growth',
    order: 1,
  },
  {
    icon: 'Users',
    title: 'Youth Mentorship',
    desc: 'Guidance and encouragement that helps young people develop character, discipline, confidence, healthy decision-making, and a stronger sense of purpose.',
    details: 'Young people need strong mentors who believe in them. Our youth mentorship program meets teens and young adults where they are and helps them build the character and confidence to thrive.',
    audience: 'Youth & teenagers',
    order: 2,
  },
  {
    icon: 'Shield',
    title: 'Veteran Support & Mentorship',
    desc: 'Peer-based mentorship and guidance for veterans navigating transition, purpose, relationships, education, employment, and life after military service.',
    details: 'The transition from military to civilian life is one of the hardest challenges a veteran faces. Our veteran-owned mentorship program provides peer-based support from someone who has walked that road.',
    audience: 'U.S. Military Veterans',
    order: 3,
  },
  {
    icon: 'Heart',
    title: 'Recovery Support & Accountability',
    desc: 'Mentorship for individuals working to overcome addiction, unhealthy patterns, past struggles, and other barriers while building a healthier path forward.',
    details: 'Recovery is a journey, not a destination. We walk alongside individuals in recovery with compassion, accountability, and practical guidance — without judgment.',
    audience: 'Adults in recovery',
    order: 4,
  },
  {
    icon: 'Mic',
    title: 'Group Workshops & Community Programs',
    desc: 'Mentorship groups, workshops, speaking engagements, and collaborative programs for schools, churches, veteran organizations, and community partners.',
    details: 'We bring the power of mentorship to your organization. From speaking engagements to facilitated workshops, we partner with schools, churches, and community groups to create lasting impact.',
    audience: 'Schools, churches, organizations',
    order: 5,
  },
  {
    icon: 'Home',
    title: 'Family & Parent Support',
    desc: 'Guidance, resources, encouragement, and referrals for families seeking additional support for themselves or their children.',
    details: 'Families are the foundation of a strong community. We provide guidance and resources for parents navigating difficult challenges with their children or seeking support for the whole family.',
    audience: 'Families & parents',
    order: 6,
  },
  {
    icon: 'Compass',
    title: 'Resource Navigation & Referrals',
    desc: 'Connecting individuals and families with appropriate community, educational, employment, veteran, counseling, and other professional resources when needs extend beyond mentorship.',
    details: 'Sometimes the best help we can offer is connecting you with the right professionals. We maintain a network of trusted resources and will help you find the support you need.',
    audience: 'All individuals & families',
    order: 7,
  },
];

const packages = [
  {
    name: 'Foundation',
    price: 75,
    frequency: '/ month',
    tagline: 'One meeting per month',
    desc: "A starting point for individuals looking for guidance, encouragement, and accountability. Together we'll identify goals, discuss challenges, and begin building practical steps forward.",
    features: ['1 mentorship meeting/month', 'Goal identification', 'Accountability check-in', 'Email support'],
    featured: false,
    order: 1,
  },
  {
    name: 'Growth',
    price: 150,
    frequency: '/ month',
    tagline: 'Two meetings per month',
    desc: 'For individuals ready for greater structure, consistency, and support. Builds upon Foundation with more frequent mentorship and increased accountability.',
    features: ['2 mentorship meetings/month', 'Goal development', 'Increased accountability', 'Action planning', 'Email & message support'],
    featured: true,
    order: 2,
  },
  {
    name: 'Transformation',
    price: 250,
    frequency: '/ month',
    tagline: 'Weekly + phone/text support',
    desc: 'Our highest level of individualized mentorship for those ready to go deeper. Consistent support, personalized strategy, and greater accountability.',
    features: [
      '4 meetings/month (weekly)',
      'Phone/text between sessions',
      'Personalized goals & action plan',
      'Increased accountability',
      'Parent/guardian check-ins (youth)',
    ],
    featured: false,
    order: 3,
  },
];

const testimonials = [
  { name: 'Youth Mentee', role: 'Youth Program', rating: 5, quote: "Grit to Grace changed my life. They believed in me when I didn't believe in myself and helped me take the right steps forward.", order: 1 },
  { name: 'U.S. Veteran', role: 'Veteran Support', rating: 5, quote: "As a veteran, it's hard to transition. Their mentorship gave me direction, purpose, and a community that truly cares.", order: 2 },
  { name: 'Grateful Parent', role: 'Family Support', rating: 5, quote: 'The support my family received has been amazing. We finally have hope, guidance, and practical help moving forward.', order: 3 },
];

const run = async () => {
  await connectDB();

  // Admin user
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    const admin = await User.create({
      name: 'David Arenas',
      email: process.env.ADMIN_EMAIL || 'admin@grit-to-grace.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@12345',
      role: 'admin',
    });
    console.log(`✅ Admin user created: ${admin.email}`);
  } else {
    console.log('ℹ️  Admin user already exists — skipped.');
  }

  // Services
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany(services);
    console.log(`✅ Seeded ${services.length} services.`);
  } else {
    console.log('ℹ️  Services already exist — skipped.');
  }

  // Packages
  const packageCount = await Package.countDocuments();
  if (packageCount === 0) {
    await Package.insertMany(packages);
    console.log(`✅ Seeded ${packages.length} packages.`);
  } else {
    console.log('ℹ️  Packages already exist — skipped.');
  }

  // Testimonials
  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany(testimonials);
    console.log(`✅ Seeded ${testimonials.length} testimonials.`);
  } else {
    console.log('ℹ️  Testimonials already exist — skipped.');
  }

  console.log('🌱 Seeding complete.');
  process.exit(0);
};

run().catch((err) => {
  console.error('❌ Seeding failed:', err.message);
  process.exit(1);
});

/**
 * Prisma Seed Script
 * Populates the database with initial data from existing TypeScript files
 *
 * Run with: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';
import { certificationsData } from './certifications-data';
import { projectsData } from './projects-seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Seed Experiences
  console.log('📝 Seeding experiences...');
  const experiences = [
    {
      company: "UOWD Tech Club",
      position: "Vice President",
      duration: "Jan 2025 - Present",
      location: "Dubai, UAE",
      description: [
        "Leading strategic initiatives to enhance engagement with the community",
        "Foster technical innovation within the club",
        "Overseeing club operations and executive team management"
      ],
      technologies: ["Project Management", "Leadership", "Technical Event Planning"],
      link: "https://uowdtechclub.com",
      logoLight: "/images/logos/uowdtechclub.png",
      logoDark: "/images/logos/uowdtechclub.png",
      displayOrder: 0
    },
    {
      company: "University of Wollongong Dubai",
      position: "Peer Tutor",
      duration: "Sep 2024 - Present",
      location: "Dubai, UAE",
      description: [
        "Provided personalized academic support to students",
        "Simplified complex technical concepts",
        "Monitored tutee progress to ensure continuous improvement"
      ],
      technologies: ["Teaching", "Communication"],
      link: "https://uowdubai.ac.ae",
      logoLight: "/images/logos/uowdl.png",
      logoDark: "/images/logos/uowdd.png",
      displayOrder: 1
    },
    {
      company: "UOWD Tech Club",
      position: "Head of Events",
      duration: "Jul 2024 - Present",
      location: "Dubai, UAE",
      description: [
        "Planned and proposed engaging technical workshops and events",
        "Organized cross-club collaborations and faculty partnerships",
        "Managed a team of 9 executives for event execution"
      ],
      technologies: ["Event Planning", "Team Management", "Project Coordination"],
      link: "https://uowdtechclub.com",
      logoLight: "/images/logos/uowdtechclub.png",
      logoDark: "/images/logos/uowdtechclub.png",
      displayOrder: 2
    },
    {
      company: "UOWD Sustainability Society",
      position: "Vice President",
      duration: "Jun 2024 - Present",
      location: "Dubai, UAE",
      description: [
        "Restructured the executive committee to improve operational efficiency",
        "Developed new member retention strategies",
        "Enhanced community engagement initiatives"
      ],
      technologies: ["Leadership", "Organizational Management", "Strategic Planning"],
      link: "https://www.linkedin.com/company/uowd-sustainability-society/",
      logoLight: "/images/logos/uowdsustainability.png",
      logoDark: "/images/logos/uowdsustainability.png",
      displayOrder: 3
    },
    {
      company: "UOWD Capture Club",
      position: "Activities Officer",
      duration: "Apr 2024 - Dec 2024",
      location: "Dubai, UAE",
      description: [
        "Organized and implemented photography events and workshops",
        "Managed event setup and coordination",
        "Provided member support during club activities"
      ],
      technologies: ["Event Management", "Photography", "Member Relations"],
      link: "https://www.linkedin.com/company/the-creators-club-uowd/",
      logoLight: "/images/logos/uowdcapturel.png",
      logoDark: "/images/logos/uowdcaptured.PNG",
      displayOrder: 4
    },
    {
      company: "The Creator's Club, UOWD",
      position: "Events Executive",
      duration: "Jan 2024 - Dec 2024",
      location: "Dubai, UAE",
      description: [
        "Executed diverse club events ensuring high attendee satisfaction",
        "Conducted post-event analysis for continuous improvement",
        "Coordinated event logistics and planning"
      ],
      technologies: ["Event Planning", "Data Analysis", "Project Management"],
      link: "https://www.linkedin.com/company/the-creators-club-uowd/",
      logoLight: "/images/logos/tccl.png",
      logoDark: "/images/logos/tccd.png",
      displayOrder: 5
    },
    {
      company: "UOWD Tech Club",
      position: "Operations Officer",
      duration: "Jan 2024 - Jul 2024",
      location: "Dubai, UAE",
      description: [
        "Planned and executed club events and logistics",
        "Coordinated with faculty for resource allocation",
        "Managed recruitment process for executive positions"
      ],
      technologies: ["Operations Management", "Event Planning", "Resource Coordination"],
      link: "https://uowdtechclub.com",
      logoLight: "/images/logos/uowdtechclub.png",
      logoDark: "/images/logos/uowdtechclub.png",
      displayOrder: 6
    },
    {
      company: "UOWD Sustainability Society",
      position: "Media Head",
      duration: "Jan 2024 - Jun 2024",
      location: "Dubai, UAE",
      description: [
        "Developed comprehensive social media strategy",
        "Oversaw creation of multimedia content",
        "Achieved 80% increase in Instagram followers"
      ],
      technologies: ["Social Media Management", "Content Creation", "Digital Marketing"],
      link: "https://www.linkedin.com/company/uowd-sustainability-society/",
      logoLight: "/images/logos/uowdsustainability.png",
      logoDark: "/images/logos/uowdsustainability.png",
      displayOrder: 7
    },
    {
      company: "UOWD Sustainability Society",
      position: "Media Co-Head",
      duration: "Oct 2023 - Jan 2024",
      location: "Dubai, UAE",
      description: [
        "Led team of media professionals for campaign execution",
        "Monitored and optimized media performance metrics",
        "Implemented innovative media strategies"
      ],
      technologies: ["Team Leadership", "Analytics", "Media Strategy"],
      link: "https://www.linkedin.com/company/uowd-sustainability-society/",
      logoLight: "/images/logos/uowdsustainability.png",
      logoDark: "/images/logos/uowdsustainability.png",
      displayOrder: 8
    }
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log(`✅ Seeded ${experiences.length} experiences`);

  // Seed Volunteering
  console.log('📝 Seeding volunteering...');
  const volunteering = [
    {
      company: "University of Wollongong Dubai",
      position: "Open Days & Induction Week Volunteer",
      duration: "Aug 2024 - Present",
      location: "Dubai, UAE",
      description: [
        "Guided students to appropriate departments based on queries",
        "Assisted freshmen with account setup and system access",
        "Provided comprehensive program information to potential students"
      ],
      technologies: ["Student Support", "Technical Support", "Communication"],
      link: "https://uowdubai.ac.ae",
      logoLight: "/images/logos/uowdl.png",
      logoDark: "/images/logos/uowdd.png",
      displayOrder: 0
    },
    {
      company: "University of Wollongong Dubai",
      position: "Graduation Ceremony Volunteer",
      duration: "Oct 2024",
      location: "Dubai, UAE",
      description: [
        "Directed graduates throughout the ceremony proceedings",
        "Managed guest seating arrangements and inquiries",
        "Contributed to maintaining a welcoming atmosphere"
      ],
      technologies: ["Event Management", "Guest Relations", "Logistics"],
      link: "https://uowdubai.ac.ae",
      logoLight: "/images/logos/uowdl.png",
      logoDark: "/images/logos/uowdd.png",
      displayOrder: 1
    },
    {
      company: "Abu Dhabi National Oil Company (ADNOC)",
      position: "Marathon Marshal",
      duration: "Dec 2023",
      location: "Abu Dhabi, UAE",
      description: [
        "Managed race pack distribution in the Race Village",
        "Assisted with crowd control and event coordination",
        "Provided refreshments and support to marathon runners"
      ],
      technologies: ["Event Operations", "Crowd Management", "Safety Protocol"],
      link: "https://adnocabudhabimarathon.com/",
      logoLight: "/images/logos/adnoc.png",
      logoDark: "/images/logos/adnoc.png",
      displayOrder: 2
    },
    {
      company: "International Institute for Environment and Development (IIED)",
      position: "Development & Climate Days Volunteer",
      duration: "Dec 2023",
      location: "Dubai, UAE",
      description: [
        "Assisted with event setup and logistics coordination",
        "Managed attendee check-in and registration process",
        "Directed attendees to correct session halls"
      ],
      technologies: ["Event Management", "Registration Systems", "Customer Service"],
      link: "https://www.iied.org",
      logoLight: "/images/logos/iiedl.png",
      logoDark: "/images/logos/iiedd.png",
      displayOrder: 3
    }
  ];

  for (const vol of volunteering) {
    await prisma.volunteering.create({ data: vol });
  }
  console.log(`✅ Seeded ${volunteering.length} volunteering entries`);

  // Seed Education
  console.log('📝 Seeding education...');
  const education = [
    {
      school: "University of Wollongong in Dubai",
      degree: "Bachelor of Engineering (Honours)",
      field: "Computer and Autonomous Systems",
      duration: "2023 - 2027",
      location: "Dubai, UAE",
      description: [],
      displayOrder: 0
    },
    {
      school: "GEMS United Indian School",
      degree: "High School Diploma",
      field: "Computer Science & Mathematics",
      duration: "2018 - 2023",
      location: "Abu Dhabi, UAE",
      description: [
        "Head of IT & Design | UIS Model United Nations Core Team (2020 - 2022)",
        "IT Coordinator - Digital Media | UIS Student Council (2021)",
        "Media Award | Yas F1 in Schools (2021)"
      ],
      displayOrder: 1
    }
  ];

  for (const edu of education) {
    await prisma.education.create({ data: edu });
  }
  console.log(`✅ Seeded ${education.length} education entries`);

  // Seed all certifications from external data file
  console.log('📝 Seeding certifications...');
  for (const cert of certificationsData) {
    await prisma.certification.create({ data: cert });
  }
  console.log(`✅ Seeded ${certificationsData.length} certifications`);

  // Seed Projects
  console.log('📝 Seeding projects...');
  for (const project of projectsData) {
    await prisma.project.create({ data: project });
  }
  console.log(`✅ Seeded ${projectsData.length} projects`);

  // Seed Gallery
  console.log('📝 Seeding gallery...');
  const gallery = [
    {
      imagePath: "/images/deans-merit-6.jpg",
      caption: "Fellow Dean's Merit List Awardees",
      altText: "Fellow Dean's Merit List Awardees",
      displayOrder: 0,
      isVisible: true
    },
    {
      imagePath: "/images/tech-club-vc-2.jpg",
      caption: "Tech Club welcomes the Vice Chancellor",
      altText: "Tech Club welcomes the Vice Chancellor",
      displayOrder: 1,
      isVisible: true
    },
    {
      imagePath: "/images/tech-club-award-1.jpg",
      caption: "Tech Club wins \"Club of the Year 2024-2025\" Award",
      altText: "Tech Club wins \"Club of the Year 2024-2025\" Award",
      displayOrder: 2,
      isVisible: true
    },
    {
      imagePath: "/images/tech-club-exec-night-1.jpg",
      caption: "Tech Club's first Executive's Night",
      altText: "Tech Club's first Executive's Night",
      displayOrder: 3,
      isVisible: true
    },
    {
      imagePath: "/images/capture-club.jpg",
      caption: "Capture Club family",
      altText: "Capture Club family",
      displayOrder: 4,
      isVisible: true
    }
  ];

  for (const img of gallery) {
    await prisma.gallery.create({ data: img });
  }
  console.log(`✅ Seeded ${gallery.length} gallery images`);

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

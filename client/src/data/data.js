import bookStoreImg from "../assets/projects/book_store.png";
import hireNestImg from "../assets/projects/hire_nest.png";
import namasteJunctionImg from "../assets/projects/namaste_junction.png";
import oncoSphereImg from "../assets/projects/onco_sphere.png";

export const personalInfo = {
  name: "Kayas Mishra",
  role: "Full Stack Software Engineer",
  tagline: "Crafting digital experiences that inspire.",
  bio: [
    "I'm a passionate full stack engineer who believes great software should not only work flawlessly but also look and feel exceptional. I bridge the gap between engineering precision and design aesthetics.",
    "With a focus on performance, accessibility, and smooth user experiences, I build applications that scale while maintaining pixel-perfect fidelity. When I'm not coding, you can find me analyzing software architectures, reading design blogs, or brewing a fresh cup of coffee."
  ],
  location: "India",
  email: "kayasmishra29s@gmail.com",
  github: "https://github.com/KayasSecret",
  linkedin: "https://www.linkedin.com/in/kayas-mishra",
  twitter: "https://x.com/kayasmishra",
  youtube: "https://www.youtube.com/@Kayasverse",
  instagram: "https://www.instagram.com/kayas_mishra/",
  availableForWork: true,
};

export const projects = [
  {
    id: "project-1",
    title: "OncoSphere Cancer Institute",
    slug: "oncosphere-cancer-institute",
    category: "Healthcare Platform",

    shortDescription:
      "A modern full-stack cancer hospital management platform with AI-powered features, appointment scheduling, patient management, and an intuitive healthcare experience.",

    longDescription:
      "OncoSphere Cancer Institute is a comprehensive healthcare platform designed to digitize and simplify cancer care. The platform enables patients to book appointments, explore treatments, connect with specialists, access medical services, and receive a seamless digital healthcare experience. Built with a scalable architecture, it integrates modern UI, secure authentication, and AI-ready modules to support future intelligent healthcare solutions.",

    problem:
      "Many healthcare websites provide limited digital services, making appointment booking, treatment discovery, and patient interaction inefficient and difficult to manage.",

    solution:
      "Developed a scalable full-stack healthcare platform that streamlines patient registration, appointment scheduling, treatment information, doctor management, and administrative workflows while providing a clean, responsive, and accessible user experience.",

    myRole: "Full Stack Developer",

    techStack: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "JWT Authentication"
    ],

    features: [
      {
        icon: "🏥",
        title: "Hospital Management",
        desc: "Comprehensive platform for managing patients, doctors, treatments, and hospital services."
      },
      {
        icon: "📅",
        title: "Appointment Booking",
        desc: "Easy online appointment scheduling with doctors through an intuitive booking workflow."
      },
      {
        icon: "👨‍⚕️",
        title: "Doctor Directory",
        desc: "Browse specialist profiles, departments, qualifications, and treatment expertise."
      },
      {
        icon: "🧬",
        title: "Cancer Treatment Information",
        desc: "Detailed information about oncology treatments, therapies, and patient care services."
      },
      {
        icon: "🤖",
        title: "AI-Ready Architecture",
        desc: "Designed with scalable modules to integrate AI-powered healthcare features in future releases."
      },
      {
        icon: "📱",
        title: "Responsive Healthcare UI",
        desc: "Modern, accessible interface optimized for desktop, tablet, and mobile devices."
      }
    ],

    challenges: "Designing a scalable healthcare architecture, organizing complex medical information, implementing secure authentication, and creating an intuitive patient experience while maintaining performance and maintainability.",
    learnings: "Strengthened my expertise in scalable application architecture, healthcare workflow design, REST API development, secure authentication, responsive UI development, and modular project organization for enterprise-level applications.",
    image: oncoSphereImg,
    githubUrl: "https://github.com/prawar-hash/Cancer-Institute-Management",
    liveUrl: "https://github.com/KayasSecret",
    featured: true,
    year: "2025",
  },
  {
    id: "project-2",
    title: "Hire-Nest",
    slug: "hire-nest",
    category: "Full Stack",

    shortDescription:
      "A modern full-stack job portal that connects job seekers with recruiters through secure authentication, intelligent job discovery, and seamless application management.",

    longDescription:
      "Hire-Nest is a comprehensive MERN Stack recruitment platform designed to simplify the hiring process for both candidates and recruiters. The application enables users to explore job opportunities, manage applications, and build professional profiles, while recruiters can publish vacancies, manage applicants, and streamline recruitment through an intuitive dashboard.",

    problem:
      "Traditional recruitment platforms often provide a fragmented experience with complex application workflows, limited recruiter management tools, and inefficient communication between employers and job seekers.",

    solution:
      "Built a scalable MERN Stack job portal featuring secure authentication, recruiter and candidate dashboards, dynamic job listings, profile management, and a streamlined application workflow to deliver a fast and user-friendly hiring experience.",

    myRole: "Full Stack Developer",

    techStack: [
      "React.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT Authentication",
      "REST APIs",
      "Cloudinary"
    ],

    features: [
      {
        icon: "💼",
        title: "Job Listings",
        desc: "Browse, search, and filter thousands of job opportunities across multiple industries."
      },
      {
        icon: "👨‍💼",
        title: "Recruiter Dashboard",
        desc: "Post jobs, manage applicants, and monitor recruitment activities from a centralized dashboard."
      },
      {
        icon: "📄",
        title: "Application Management",
        desc: "Apply for jobs, upload resumes, and track application status in real time."
      },
      {
        icon: "🔐",
        title: "Secure Authentication",
        desc: "JWT-based authentication with separate candidate and recruiter access control."
      },
      {
        icon: "👤",
        title: "Profile Management",
        desc: "Create professional profiles with skills, experience, and resume integration."
      },
      {
        icon: "⚡",
        title: "Real-Time Dashboard",
        desc: "Dynamic dashboards with instant updates for jobs, applications, and recruiter activities."
      }
    ],

    challenges: "Implementing role-based authentication, designing scalable recruiter and candidate workflows, managing secure file uploads, and maintaining efficient communication between frontend, backend, and database.",
    learnings: "Strengthened my expertise in MERN Stack architecture, Redux state management, JWT authentication, REST API development, MongoDB data modeling, and building scalable production-ready recruitment platforms.",
    image: hireNestImg,
    githubUrl: "https://github.com/KayasSecret/Job_Portal",
    liveUrl: "https://github.com/KayasSecret",
    featured: true,
    year: "2025",
  },
  {
    id: "project-3",
    title: "Namaste Junction",
    slug: "namaste-junction",
    category: "Full Stack",

    shortDescription:
      "A modern Airbnb-inspired full-stack property booking platform with secure authentication, property listings, and seamless reservation management.",

    longDescription:
      "Namaste Junction is a full-stack vacation rental platform inspired by Airbnb, enabling users to discover, explore, and book unique stays through an intuitive and responsive interface. The application features secure authentication, dynamic property listings, detailed property pages, and a streamlined booking experience powered by a scalable MERN stack architecture.",

    problem:
      "Many traditional rental platforms provide a fragmented user experience with slow navigation, limited property discovery, and inefficient booking workflows.",

    solution:
      "Built a scalable Airbnb-inspired platform using the MERN stack that offers dynamic property listings, secure user authentication, responsive design, and an optimized booking workflow for a smooth user experience.",

    myRole: "Full Stack Developer",

    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "JavaScript",
      "CSS3"
    ],

    features: [
      {
        icon: "🏡",
        title: "Property Listings",
        desc: "Browse properties with images, pricing, location, and detailed descriptions."
      },
      {
        icon: "🔍",
        title: "Search & Explore",
        desc: "Find accommodations through an intuitive and user-friendly browsing experience."
      },
      {
        icon: "🔐",
        title: "Secure Authentication",
        desc: "User registration and login system with protected routes and account management."
      },
      {
        icon: "📅",
        title: "Booking System",
        desc: "Book stays through a streamlined reservation workflow."
      },
      {
        icon: "📱",
        title: "Responsive Design",
        desc: "Optimized experience across desktop, tablet, and mobile devices."
      },
      {
        icon: "⚡",
        title: "REST API Integration",
        desc: "Dynamic frontend-backend communication for property and user data."
      }
    ],

    challenges: "Implementing a scalable booking workflow, integrating secure authentication, and efficiently managing property data while maintaining a smooth user experience.",
    learnings: "Enhanced my expertise in full-stack MERN development, REST API design, authentication, MongoDB data modeling, and building responsive, production-ready web applications.",
    image: namasteJunctionImg,
    githubUrl: "https://github.com/KayasSecret/Namaste-Junction_full-stack-web-dev-project_Frontend-Backend-DBMS",
    liveUrl: "https://github.com/KayasSecret",
    featured: true,
    year: "2025",
  },
];

export const skills = {
  Language: [
    { name: "C", level: 95 },
    { name: "C++", level: 90 },
    { name: "JavaScript (ES6+)", level: 95 },
    { name: "SQL", level: 80 }
  ],
  frontend: [
    { name: "HTML5 & CSS3", level: 90 },
    { name: "React.js", level: 95 },
    { name: "Tailwind CSS", level: 85 },
    { name: "JavaScript (ES6+)", level: 95 },
  ],
  backend: [
    { name: "Node.js", level: 88 },
    { name: "Express.js", level: 90 },
    { name: "REST APIs", level: 95 },
    { name: "CRUD Operations", level: 92 }
  ],
  database: [
    { name: "MongoDB", level: 85 },
    { name: "MYSQL", level: 80 },
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Github", level: 90 },
    { name: "VS Code", level: 95 }
  ]
};

export const experience = [
  {
    company: "Self-Employed",
    role: "MERN Stack Developer (Freelance)",
    type: "Freelance",
    startDate: "May 2026",
    endDate: "Present",
    location: "Remote / India",
    achievements: [
      "Developed responsive full-stack web applications using the MERN stack for personal and freelance projects.",
      "Built RESTful APIs, implemented authentication, and integrated MongoDB for efficient data management.",
      "Worked closely with clients to understand requirements, fix bugs, and deliver features on time."
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "Tailwind CSS",
      "Git",
      "GitHub"
    ]
  },
  {
    company: "Self-Employed",
    role: "Graphic Designer (Canva)",
    type: "Freelance",
    startDate: "Jul 2024",
    endDate: "Present",
    location: "Remote / India",
    achievements: [
      "Created 500+ designs including social media posts, banners, presentations, flyers, posters, and marketing materials using Canva.",
      "Designed visually engaging content while maintaining brand consistency and modern design principles.",
      "Worked with clients to understand design requirements and delivered creative assets within deadlines."
    ],
    techStack: [
      "Canva",
      "Figma",
      "Adobe Express",
      "Branding",
      "Social Media Design"
    ]
  }
];

export const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Product Director",
    company: "Vivid Labs",
    text: "Kayas stands out as an exceptional software engineer who understands design as deeply as he understands system architecture. He delivers clean, robust code and has a rare eye for pixel-perfect detail. Every sprint he set a new bar for what our team believed was possible.",
  },
  {
    name: "Sarah Jenkins",
    role: "Co-Founder",
    company: "EcoSphere",
    text: "Working with Kayas on our carbon-tracking platform was a transformative experience. His backend speed improvements and clean API architecture enabled our frontend team to build and iterate twice as fast. He is the kind of engineer you want on every critical project.",
  },
  {
    name: "Rohan Verma",
    role: "Lead UI/UX Designer",
    company: "Pixel Craft",
    text: "In my entire career I have rarely seen a developer who bridges design and engineering so seamlessly. Kayas would take a Figma screen and ship it with sub-pixel precision — and then go beyond with thoughtful micro-interactions we had not even specified. Truly gifted.",
  },
  {
    name: "Priya Nair",
    role: "CTO",
    company: "LaunchStack",
    text: "We brought Kayas in to rescue a struggling Node.js monolith that was costing us customers. Within three weeks he had refactored the core services, slashed API response times by 65%, and documented everything clearly. Calm under pressure, fast, and brilliant.",
  },
  {
    name: "James Harrington",
    role: "Founder",
    company: "Freelance Client",
    text: "I hired Kayas to build my personal brand website from scratch and he delivered something that genuinely wowed every visitor. The animations, the performance score, the attention to SEO — everything was top-tier. He is my go-to developer for every future project.",
  },
];



export const education = [
  {
    level: "Post-Graduation",
    degree: "Master of Computer Applications (MCA)",
    school: "Acropolis Institute of Technology and Research (AITR)",
    year: "2025 - 2027",
    score: "8.13 SGPA (First Year)",
    details: "Pursuing my MCA while strengthening my expertise in the MERN stack, building full-stack applications, and using AI tools to improve development workflows and productivity."
  },
  {
    level: "Graduation",
    degree: "Bachelor of Science in Computer Science",
    school: "Vindhya Institute of Technology and Science (VITS)",
    year: "2021 - 2024",
    score: "7.36 CGPA",
    details: "During my graduation, I discovered my interest in Computer Science and began learning frontend development, turning curiosity into practical skills through hands-on projects."
  },
  {
    level: "12th Standard",
    degree: "Higher Secondary Certificate (HSC)",
    school: "Govt. H. S. S. Susari, Dhar (M.P.)",
    year: "2021",
    score: "A+ (PCM Branch)",
    details: "Completed higher secondary education with the PCM stream, developing a solid understanding of mathematics and scientific concepts through consistent learning."
  },
  {
    level: "10th Standard",
    degree: "Secondary School Certificate (SSC)",
    school: "Govt. H. S. S. Susari, Dhar (M.P.)",
    year: "2019",
    score: "A+ (School Topper)",
    details: "Built a strong academic foundation while learning the value of discipline, consistency, and continuous improvement throughout my school years."
  }
];


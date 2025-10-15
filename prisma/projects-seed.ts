/**
 * Projects Seed Data
 * All project information extracted from project pages
 */

export const projectsData = [
  // Personal Projects
  {
    title: "vacan.see",
    slug: "vacansee",
    description: "The only website you need to find empty rooms in university. Real-time room availability with interactive visualizations.",
    githubUrl: "https://github.com/tahayparker/vacan.see",
    liveUrl: "https://vacansee.vercel.app",
    projectType: "personal",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    featured: true,
    displayOrder: 0,
    imageUrl: "/images/vacansee.png",
    backgroundContent: "You're in uni, and you need an emergency team meeting for your project - like, right now. All the proper meeting rooms are booked solid. Great.\n\nWhile wandering the halls in desperation, you spot a classroom. The lights are off, projector dark. Your sleep-deprived brain does some questionable math: Dark room + no projector = empty room, right? RIGHT?\n\nYou approach the door, heart racing. The handle turns with an ominous squeak. You take one tentative step inside, then another. Your eyes haven't adjusted yet, but something feels... off. There's this weird energy in the air, like when you walk into a room where people have been talking.\n\nThen you hear it. A voice mid-lecture: \"...and that's why the quantum entanglement principle...\"\n\nYour eyes adjust to reveal your worst nightmare: forty pairs of eyes swiveling towards you like synchronized swimmers. And there, illuminated by a single shaft of light from the hallway, stands the professor. Not just any professor – it's the Dean. The same Dean who, three years ago, still remembers the time you called her \"mom\" during freshman orientation.\n\nYou freeze. Your brain screams \"ABORT!\" but your feet are cement blocks. The silence stretches like warm cheese. Someone coughs. Someone else stifles a giggle.\n\nThe dean's eyebrow arches so high it could qualify for its own degree.\n\nYou manage a strangled \"sorry\" before executing the fastest backward shuffle known to mankind. The door clicks shut behind you with the finality of a coffin nail.\n\nLater, during your online meeting, as your teammate freezes mid-presentation for the fifth time, their face stuck in an unflattering double-chin position, you can still feel the phantom burn of embarrassment. Someone's kid screams in the background. Another teammate can't unmute. The project you've worked on for months spirals down the drain, all because you couldn't find a proper room.\n\nThe next morning, you swear the Dean smirks when they pass you in the hallway. That Dean's memory really is remarkable. Too remarkable.\n\nIf only there was a way to see which rooms were available…",
    overviewContent: "The only website you need to find empty rooms in university. Built with Next.js, TypeScript, Tailwind CSS, PostgreSQL & Prisma, vacan.see is a web application designed to help students find available rooms on campus, providing real-time availability information and interactive visualizations of room schedules.",
    keyFeatures: [
      "Real-time room availability",
      "Search for specific rooms and their availability at specific times",
      "Interactive graph for all rooms",
      "Create custom graphs for the rooms, days and timings you care about",
      "Automatic updates every night to ensure the latest data",
      "Mobile responsive for the same great experience, no matter which device you are on"
    ],
    technicalDetails: "The application is built using Next.js for both frontend and backend, with TypeScript providing type safety and Prisma ORM managing database operations with PostgreSQL hosted on Neon. The frontend utilizes TailwindCSS for styling, with custom animations and a responsive design that works across different devices, while the backend implements API routes for handling room availability checks, schedule data retrieval, and database operations through the Prisma client.\n\nThe project implements an automated update system using GitHub Actions that runs daily to keep the room availability data current. This automation pipeline includes a Python-based scraper that collects timetable data, updates the PostgreSQL database through Prisma, and generates a new schedule JSON file that's used for the interactive visualizations. The application also implements caching strategies for API responses to optimize performance and reduce database load, while maintaining data consistency through scheduled updates.",
    relatedProjects: ["findmyprof"]
  },
  {
    title: "FindMyProf",
    slug: "findmyprof",
    description: "Find out if your professors are in class or not. Real-time professor availability with interactive schedule visualizations.",
    githubUrl: "https://github.com/tahayparker/findmyprof",
    liveUrl: "https://findmyprof-uowd.vercel.app",
    projectType: "personal",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    featured: true,
    displayOrder: 1,
    imageUrl: "/images/findmyprof.png",
    backgroundContent: "You're clutching your assignment, racing up the stairs. Your professor's feedback is crucial, and the deadline is tomorrow.\n\nYou reach their office. Through the window, you see an empty chair. The lights are off.\n\nAre they teaching right now? Who knows. The course listing website is a maze of timetables. You could check their office hours, proudly displayed on their door: \"Thursdays 2-3PM.\"\n\nOne hour. One single hour per week.\n\nThrough this same window, you've seen them working here every day this week. Monday morning - typing away. Tuesday afternoon - grading papers. Wednesday - just scrolling on their computer. But nope, couldn't go in. Not \"official hours.\" And you're too shy to send in an email asking for a consultation outside those hours.\n\nYou try another professor down the hall who teaches the same subject. Their office is open! You walk in... to an empty room. Their coffee is still warm, which somehow makes it worse.\n\nA student walks past.\n\"Oh, they're teaching right now.\"\n\"Any idea when they'll be back?\"\n\"Nope.\"\n\nYou slump against the wall. If only there was a simple system that showed which professors were currently in class. Not meetings, not lunch breaks - just whether they're teaching or not. Then at least you'd know when to try catching them apart from their mythical office hours.\n\nNext Thursday at 2PM, you join the Black Friday sale of office hours along with fifteen other desperate students who've been hoarding questions all week. The hour disappears in a blur of raised hands and rushed explanations.\n\nYou leave with more questions than you came with.\n\nIf only there was a way to know who was actually teaching and who wasn't……",
    overviewContent: "Because consultation hours are severely limited. Built with Next.js, TypeScript, Tailwind CSS, PostgreSQL & Prisma, FindMyProf is a web application designed to help students find out if their professors are in class or not, providing real-time availability information and interactive visualizations of their schedules.",
    keyFeatures: [
      "Real-time professor availability",
      "Search for specific professors and their availability at specific times",
      "Interactive graph for all professors",
      "Create custom graphs for the professors, days and timings you care about",
      "Automatic updates every night to ensure the latest data",
      "Mobile responsive for the same great experience, no matter which device you are on"
    ],
    technicalDetails: "Similar architecture to vacan.see, leveraging Next.js, TypeScript, Tailwind CSS, PostgreSQL, and Prisma for a robust and scalable solution. The application features automated data collection and real-time updates to ensure accurate professor availability information.",
    relatedProjects: ["vacansee"]
  },
  {
    title: "YapMap",
    slug: "yapmap",
    description: "Web service for creating word cloud visualizations with near-instant generation. Built with Next.js frontend and Python backend.",
    githubUrl: "https://github.com/tahayparker/yapmap",
    liveUrl: "https://yapmap.vercel.app",
    projectType: "personal",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Python", "Render"],
    featured: false,
    displayOrder: 2,
    imageUrl: "/images/yapmap.png",
    overviewContent: "YapMap is a web service that creating a word cloud visualization using a web-based interface. The project is bootstrapped with Next.js, which is a React framework for building server-side rendered and static web applications.",
    keyFeatures: [
      "Near-instant wordcloud generation",
      "Built with Next.js, TypeScript, and Tailwind CSS for performance",
      "Python backend hosted on Render, enabling smooth frontend-backend communication."
    ],
    technicalDetails: "The project utilizes Next.js for server-side rendering and static site generation. The application is built with TypeScript, ensuring type safety and improved developer experience. Tailwind CSS is used for styling, providing utility-first CSS classes for rapid development and customization.\n\nThe backend is run by a Python script which is able to create wordclouds from a given text. The script is run on Render, which is triggered by an HTTP request from the frontend. The wordcloud is then returned to the frontend and displayed to the user.",
    relatedProjects: []
  },
  {
    title: "Portfolio",
    slug: "portfolio",
    description: "A personal portfolio website with custom theme switcher, smooth animations, and responsive design. Built with Next.js and Tailwind CSS.",
    githubUrl: "https://github.com/tahayparker/portfolio",
    liveUrl: "https://tahayparker.vercel.app",
    projectType: "personal",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Prisma", "PostgreSQL"],
    featured: false,
    displayOrder: 3,
    imageUrl: "/images/portfolio.png",
    overviewContent: "A personal portfolio website built with Next.js and Tailwind CSS. Features a custom theme switcher, smooth animations, and responsive design.",
    keyFeatures: [
      "Modern, responsive design using Tailwind CSS",
      "Custom theme switcher with smooth animations",
      "Dynamic page transitions using Framer Motion",
      "Server-side rendering with Next.js",
      "TypeScript for type safety and better development experience"
    ],
    technicalDetails: "The portfolio is built using Next.js with the new App Router, leveraging React Server Components for optimal performance. The styling is handled through Tailwind CSS, providing a utility-first approach to styling while maintaining a consistent design system.\n\nFramer Motion is used extensively throughout the site to create smooth, engaging animations that enhance the user experience without being distracting. The theme switcher is implemented using CSS variables and React context for seamless transitions between light and dark modes.",
    relatedProjects: []
  },

  // University Projects
  {
    title: "Webots Simulation",
    slug: "csci291",
    description: "Autonomous robot navigation in Webots to locate and stop at the brightest light source using sensors, GPS, and modular C-based control.",
    githubUrl: "https://github.com/Aymn-Mohd/CSCI291_Project_A24_GRP1",
    liveUrl: null,
    projectType: "university",
    technologies: ["C", "Webots", "Robotics", "GPS"],
    featured: false,
    displayOrder: 0,
    imageUrl: "/images/csci291.png",
    backgroundContent: "To develop a Webots robot application that autonomously navigates a maze to locate and stop at the brightest light source",
    overviewContent: "The robot uses sensors for navigation, light detection, and GPS-based positioning to explore the maze dynamically. It implements a modular C-based control system to handle junction decisions, path tracking, and target acquisition efficiently",
    keyFeatures: [
      "Autonomous maze navigation using distance sensors",
      "Light intensity detection to locate the brightest source",
      "GPS-based coordinate tracking for real-time positioning",
      "Modular C programming for scalability and maintainability",
      "Dynamic decision-making at junctions for efficient pathfinding"
    ],
    technicalDetails: "The robot simulation is developed in Webots using C programming. It uses distance sensors for obstacle detection and navigation, light sensors to identify the brightest light source, and GPS for tracking position. The modular control system efficiently manages junction decisions and path tracking.",
    relatedProjects: ["ecte233", "engg100"]
  },
  {
    title: "Custom 4-bit Arithmetic Logic Unit (ALU)",
    slug: "ecte233",
    description: "Custom-designed 4-bit ALU using basic logic gates (AND, OR, NOT, XOR). Includes overflow detection and modular multiplexer design.",
    githubUrl: null,
    liveUrl: null,
    projectType: "university",
    technologies: ["MultiSim", "Digital Logic", "Circuit Design"],
    featured: false,
    displayOrder: 1,
    imageUrl: "/images/ecte233.png",
    backgroundContent: "To design a custom-made 4-bit arithmetic logic unit (ALU) and test the design using a simulation such as Simulink or Multisim. All logic must be computed using basic gates (AND, OR, NOT, XOR, NAND, NOR and XNOR only). No advanced blocks available in a simulation environment may be used, except for the creation and analysis of inputs/outputs.",
    overviewContent: "The ALU has 10 inputs and 5 outputs. Two input bits are used to define the operation that will be applied (OP1:0). Two lots of four input bits are used to create nibbles A3:0 and B3:0. Four output bits are used to create the nibble S3:0, which is the main output of the operation. One output bit (Overflow) is used to indicate if an overflow has occurred during an operation.",
    keyFeatures: [
      "Performs four distinct operations controlled by two selection bits",
      "Implements logic using basic gates like AND, OR, NOT, and XOR",
      "Includes an overflow detection bit for any operations with overflows",
      "Utilizes SPDT switches to prevent ambiguous states",
      "Features a modular multiplexer for efficient signal routing"
    ],
    technicalDetails: "Using basic digital logic principles, the 4-bit ALU is a small but powerful processing unit that can perform a variety of logical operations using two 4-bit inputs (A3:0 and B3:0) and two operation selection bits (OP1:0). The results are shown on a 4-bit output (S3:0), and an overflow detection bit (OF) is included for operations with potential overflow. This layout guarantees that the system can process binary computations with accuracy and dependability.\n\nSPDT switches are used in the ALU's input mechanism to avoid ambiguous states and to control operations and enter binary data. To ensure reliable binary state representation, each switch is connected to either ground or a voltage source. In addition to clearly distinguishing between logical high and low states, this tactile interface enables interactive manipulation of computing parameters by users. The ALU's versatility is demonstrated by the separate switches for operation control, which provide smooth transitions between different logical functions.\n\nThe multiplexer (MUX) plays a crucial role in signal selection, utilizing a configuration of four AND gates, two NOT gates, and one OR gate. The MUX routes the appropriate signal to the output based on the operation selection bits, ensuring precise data processing. By complementing control signals using NOT gates and applying these alongside original inputs to AND gates, the circuit establishes a highly flexible logic network. The modular design not only enhances the ALU's operational efficiency but also simplifies potential expansions, allowing additional operations to be integrated seamlessly.",
    relatedProjects: ["csci291", "engg100"]
  },
  {
    title: "Projectile Simulator",
    slug: "engg100",
    description: "Interactive MATLAB-based projectile motion simulator with real-time graphs, history tracking, and multi-scenario comparison.",
    githubUrl: "https://github.com/tahayparker/ProjectileSimulator",
    liveUrl: null,
    projectType: "university",
    technologies: ["MATLAB", "GUI Design", "Physics Simulation"],
    featured: false,
    displayOrder: 2,
    imageUrl: "/images/projsim.png",
    backgroundContent: "To create an interactive projectile motion simulator using MATLAB that allows users to input parameters and visualize the trajectory, while also comparing multiple scenarios.",
    overviewContent: "The Projectile Simulator is a MATLAB-based application that simulates projectile motion with an interactive GUI. Users can input initial conditions, visualize trajectories in real-time, and compare multiple simulation runs through a history feature.",
    keyFeatures: [
      "Interactive GUI for parameter input and visualization",
      "Real-time trajectory plotting with acceleration, velocity, and displacement graphs",
      "History tab for saving and comparing multiple simulation runs",
      "Customizable initial conditions (velocity, angle, height, drag coefficient)",
      "Accurate physics calculations including air resistance"
    ],
    technicalDetails: "The simulator is built using MATLAB's App Designer, providing an intuitive user interface for parameter input and result visualization. The physics engine calculates projectile motion considering initial velocity, launch angle, starting height, and air resistance. Results are displayed through multiple graphs showing acceleration, velocity, and displacement over time, with the ability to save and compare different scenarios.",
    relatedProjects: ["csci291", "ecte233"]
  }
];

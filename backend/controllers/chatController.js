exports.handleChat = (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const input = message.toLowerCase().trim();

    // 1. Hardcoded Q&A Responses based on keywords
    let reply = "";

    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      reply = "Hello! I'm Kayas's virtual assistant. How can I help you today? You can ask me about my skills, projects, experience, or how to contact me.";
    } 
    else if (input.includes('skill') || input.includes('stack') || input.includes('languages') || input.includes('technology')) {
      reply = "Kayas is a Full Stack Developer proficient in:\n" +
              "- Frontend: React, Next.js, HTML5, CSS3, Tailwind CSS, Framer Motion\n" +
              "- Backend: Node.js, Express.js, RESTful APIs\n" +
              "- Databases: MongoDB, PostgreSQL, Redis\n" +
              "- Tools: Git, Docker, Figma, VS Code\n" +
              "He is currently learning Kubernetes and System Design!";
    } 
    else if (input.includes('project') || input.includes('work') || input.includes('portfolio')) {
      reply = "Here are a few featured projects Kayas has built:\n" +
              "1. Zenith Workspace: A collaborative digital workspace with real-time editing (React, Node, Socket.io, MongoDB).\n" +
              "2. Verdant Analytics: A carbon tracking API and dashboard (Express, TypeScript, PostgreSQL, Redis).\n" +
              "3. Aura Audio: An interactive audio visualizer and ambient streaming platform (Next.js, Tailwind, Web Audio API).\n" +
              "4. Novus DevKit: A lightweight dark-mode utilities React/Vite package.\n" +
              "Would you like details on any of these?";
    } 
    else if (input.includes('zenith')) {
      reply = "Zenith Workspace is a collaborative workspace that combines document syncing (using CRDTs) and Trello-style boards. It is built with React, Node.js, MongoDB, and Tailwind CSS.";
    } 
    else if (input.includes('verdant') || input.includes('analytics')) {
      reply = "Verdant Analytics is a developer-focused API/Dashboard that profiles container execution and carbon footprints in real-time, built with Express, PostgreSQL, Redis, and Docker.";
    } 
    else if (input.includes('aura') || input.includes('audio') || input.includes('visualizer')) {
      reply = "Aura Audio is an ambient soundscape visualizer built with Web Audio API, Next.js, and Canvas, featuring low-latency frequency analysis mapped to organic visual representations.";
    } 
    else if (input.includes('experience') || input.includes('job') || input.includes('history')) {
      reply = "Kayas's professional timeline includes:\n" +
              "- Full Stack Engineer at Vivid Labs (Jan 2023 - Present): Led migration of dashboard to modern Next.js, boosted loading speeds by 42%, and reduced client onboarding setups using PostgreSQL/Node.\n" +
              "- Frontend Engineer Intern at Pixel Craft (Jun 2022 - Dec 2022): Developed responsive visual components and smooth micro-animations using GSAP and Framer Motion.";
    } 
    else if (input.includes('contact') || input.includes('email') || input.includes('reach') || input.includes('hire') || input.includes('available')) {
      reply = "You can reach Kayas directly via:\n" +
              "- Email: kayasmishra.dev@gmail.com\n" +
              "- LinkedIn: https://linkedin.com/in/kayasmishra\n" +
              "- GitHub: https://github.com/kayasmishra\n" +
              "He is currently available for Full Stack Software Engineer roles and freelance projects!";
    } 
    else if (input.includes('resume') || input.includes('cv')) {
      reply = "You can download Kayas's resume directly from the Hero section of this website, or reach out to him via email at kayasmishra.dev@gmail.com to get a direct copy!";
    } 
    else if (input.includes('location') || input.includes('where') || input.includes('live')) {
      reply = "Kayas is located in India, working remotely with teams globally.";
    } 
    else if (input.includes('who are you') || input.includes('name') || input.includes('about') || input.includes('kayas')) {
      reply = "Kayas Mishra is a Full Stack Software Engineer who bridges the gap between engineering precision and visual design. He specializes in building highly performant, responsive web apps with stable MERN stack structures.";
    } 
    else {
      reply = "I'm not sure I fully understand. You can ask me about:\n" +
              "- 'What are your skills?'\n" +
              "- 'Tell me about your projects'\n" +
              "- 'Where have you worked?' (experience)\n" +
              "- 'How can I contact you?'\n" +
              "- 'Where are you located?'";
    }

    return res.status(200).json({
      success: true,
      reply
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to process chat message'
    });
  }
};

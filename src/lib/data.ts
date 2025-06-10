
import type { CVData } from './types';

export const cvData: CVData = {
  name: 'Mohamed Ismail',
  title: 'Software Tester and Software Engineer',
  profilePhotoUrl: '/mohamed.jpg', // Ensure this points to the correct image in the public folder
  contact: {
    phone: '(+20) 01144289394',
    email: 'mohamedhisham735@gmail.com',
    website: 'https://github.com/kingusa1',
    linkedin: 'linkedin.com/in/mohamed-hisham-ismail-32ba2b134',
    github: 'github.com/kingusa1',
    address: '239a hadyak el ahram, 12511, giza, Egypt',
  },
  summary:
    "I'm a junior software tester and developer with a passion for delivering high-quality software solutions. With a strong foundation in computer software engineering.",
  experience: [
    {
      id: 'exp_new_1',
      title: 'SOFTWARE TESTER',
      subtitle: 'SOFT INNOVATION - INTERSHIP',
      location: 'giza, Egypt',
      date: '01/01/2024 – 01/08/2024',
      description: [
        'Assisted in developing features for desktop applications using C++ and C#, contributing to the design and implementation of user-friendly interfaces while conducting manual testing to ensure functionality and usability.',
        'Participated in a project integrating Kinect technology to create interactive, gesture-based applications, enhancing user interaction capabilities and validating system performance with test cases for gesture accuracy and responsiveness.',
        'Collaborated with the team to analyze client requirements, ensuring solutions were tailored to meet business needs and user expectations, and created test scenarios to verify the implementation of these requirements.',
        'Contributed to writing requirement specifications, technical documentation, and test plans, ensuring clear communication between stakeholders and the development team while streamlining the testing process.',
      ],
    },
    {
      id: 'exp_new_2',
      title: 'SYSTEM ANALYST',
      subtitle: 'DEFY INSURANCE AGENCY',
      location: 'Princeton, New Jersey - Remote, United States',
      date: '01/12/2024 – CURRENT',
      description: [
        'As a Systems Analyst at Defy Insurance, I specialize in bridging the gap between business needs and technical solutions. My expertise lies in analyzing complex systems, optimizing workflows, and ensuring that our technology aligns seamlessly with the company’s strategic goals.',
        'Requirements Analysis: Identifying and documenting system requirements to enhance operational efficiency.',
        'Process Optimization: Streamlining workflows to reduce costs and improve customer experiences.',
        'Collaboration: Working closely with cross functional teams, including developers, testers, and business stakeholders, to deliver scalable and innovative solutions.',
        "At Defy Insurance, I’m passionate about leveraging technology to transform the insurance landscape. By integrating cutting-edge tools and data-driven insights, I help ensure our systems remain robust, user-friendly, and future-proof.",
      ],
    },
    {
      id: 'exp_new_3',
      title: 'AUTOMATION SYSTEMS ENGINEER',
      subtitle: 'SHARAF & ASSOCIATES',
      location: 'Holmdel, New Jersey - Remote, United States',
      date: '01/12/2024 – CURRENT',
      description: [
        'As a Systems Automation Engineer, I specialize in designing and implementing efficient, scalable, and innovative automation solutions that streamline processes and enhance operational performance. My role bridges the gap between cutting-edge technology and real-world business challenges, ensuring seamless integration and reliable systems.',
        'Process Optimization: Identifying inefficiencies and crafting automated workflows to improve productivity.',
        'Monitored and maintained automated systems, ensuring reliability and efficiency.',
        'Conducted regular maintenance and troubleshooting of automated systems to ensure uptime and reliability.',
        'Continuously researched and implemented the latest automation technologies and methodologies to keep systems up-to-date.',
      ],
    },
  ],
  education: [
    {
      id: 'edu_new_1',
      title: "BACHELOR'S DEGREE IN COMPUTER SCIENCE",
      subtitle: 'Modern Sciences and Arts University',
      location: 'giza, Egypt',
      date: '02/02/2016 – 16/02/2022',
      description: [
        'Website: https://www.msa.edu.eg/',
        'Field of study Software Engineering',
        'Final grade 2.4',
        'Level in EQF EQF level 6',
      ],
    },
    {
      id: 'edu_new_2',
      title: "BACHELOR'S DEGREE IN COMPUTER SCIENCE",
      subtitle: 'University of Greenwich',
      location: 'greenwich, United Kingdom',
      date: '02/02/2016 – 16/02/2022',
      description: [
        'Website: https://www.gre.ac.uk',
        'Field of study Software Engineering',
        'Final grade second honor',
        'Level in EQF EQF level 6',
      ],
    },
    {
      id: 'edu_new_3',
      title: 'Master Class in Software Testing – Machinfy',
      subtitle: 'Machinfy',
      location: 'Online',
      date: '23/10/2024',
      description: [
        'Completed an intensive, advanced training course on software testing principles and techniques. The course covered a wide range of topics, including test planning, test case design, automation strategies, defect tracking, and performance testing. It provided hands-on experience with industry-standard testing tools and methodologies, enhancing my ability to implement effective testing strategies and ensure high-quality software delivery.',
      ],
    },
  ],
  skills: [
    { id: 'sk_new_1', name: 'C++', category: 'Programming & Development Tools' },
    { id: 'sk_new_2', name: 'C#', category: 'Programming & Development Tools' },
    { id: 'sk_new_3', name: 'Java', category: 'Programming & Development Tools' },
    { id: 'sk_new_4', name: 'CSS', category: 'Programming & Development Tools' },
    { id: 'sk_new_5', name: 'HTML', category: 'Programming & Development Tools' },
    { id: 'sk_new_6', name: 'GitHub', category: 'Programming & Development Tools' },
    { id: 'sk_new_7', name: 'JavaScript', category: 'Programming & Development Tools' },
    { id: 'sk_new_8', name: 'Microsoft Visual Studio', category: 'Programming & Development Tools' },
    { id: 'sk_new_9', name: 'IntelliJ IDEA', category: 'Programming & Development Tools' },
    { id: 'sk_new_10', name: 'Visual Studio Code', category: 'Programming & Development Tools' },
    { id: 'sk_new_11', name: 'Jira', category: 'Software Testing Tools' },
    { id: 'sk_new_12', name: 'Selenium', category: 'Software Testing Tools' },
    { id: 'sk_new_13', name: 'Appium', category: 'Software Testing Tools' },
    { id: 'sk_new_14', name: 'Postman', category: 'Software Testing Tools' },
    { id: 'sk_new_15', name: 'Microsoft Excel', category: 'Productivity & Collaboration Tools' },
    { id: 'sk_new_16', name: 'Word', category: 'Productivity & Collaboration Tools' },
    { id: 'sk_new_17', name: 'PowerPoint', category: 'Productivity & Collaboration Tools' },
    { id: 'sk_new_18', name: 'Windows', category: 'Operating Systems & Platforms' },
    { id: 'sk_new_19', name: 'Linux (Basic)', category: 'Operating Systems & Platforms' },
  ],
  projects: [
    {
      id: 'proj_new_1',
      name: 'kickboxing style enhancement while training (KIckfit)',
      description:
        'Developed an interactive system leveraging Kinect v2 hardware and the Kinect for Windows SDK 2.0 to provide real-time feedback on body posture and movement during workouts. The system tracks user skeleton data, including joint positions, angles, and movements, to ensure proper form and prevent injury.',
      summaryBullets: [
        "Real-time posture & movement feedback using Kinect v2.",
        "Tracks user's skeleton data (joints, angles) for form correction.",
        "Aims to ensure proper workout form and prevent injuries."
      ],
      technologies: ['Kinect v2', 'Kinect for Windows SDK 2.0'],
      youtubeUrl: 'https://youtu.be/oG9I-a3pgLg',
    },
    {
      id: 'proj_new_2',
      name: 'E-commerce Website Testing',
      description:
        'Executed comprehensive manual testing of core e-commerce functionalities—including user registration, authentication, product search, and checkout—to validate adherence to business requirements.  Designed and maintained detailed test cases and test scripts to cover all user scenarios, proactively uncovering edge-case defects.  Logged, triaged, and tracked issues in Jira, ensuring clear, actionable bug reports and facilitating efficient collaboration with developers.  Developed and implemented Selenium WebDriver scripts to automate critical login workflows, reducing regression testing time by 40% and increasing test reliability.',
      summaryBullets: [
        "Performed comprehensive manual testing of core e-commerce features.",
        "Designed and executed detailed test cases, identifying edge-case defects.",
        "Managed bug tracking in Jira for clear developer collaboration.",
        "Automated critical login workflows with Selenium, reducing regression time by 40%."
      ],
      technologies: ['Manual Testing', 'Jira', 'Selenium WebDriver'],
    },
    {
      id: 'proj_new_3',
      name: 'Library Management System',
      description:
        'Designed and executed test cases for a library management system using skills learned in the Manual and Automation Software Testing course. Automated key workflows, such as book search and user login, using Selenium WebDriver and TestNG. Performed API testing using Postman to validate database interactions and system integration. Conducted basic performance testing using Apache JMeter to measure system stability under load.',
      summaryBullets: [
        "Tested a library management system, applying course-learned skills.",
        "Automated key workflows (book search, login) with Selenium & TestNG.",
        "Validated API and database interactions using Postman.",
        "Conducted basic performance tests with Apache JMeter."
      ],
      technologies: ['Manual Testing', 'Automation Testing', 'Selenium WebDriver', 'TestNG', 'Postman', 'Apache JMeter'],
    },
    {
      id: 'proj_new_4',
      name: 'Email→Pipedrive CRM Data Extractor (n8n)',
      description:
        "Overview: Built an n8n workflow that automatically reads incoming support-request emails, parses out key fields (name, company, issue type, priority) and pushes them into Pipedrive as new leads or deals.\n\nKey Steps & Challenges:\nEmail Trigger: IMAP node polls the support inbox every 2 minutes.\nParsing: Used custom JS regex to pull client name, ticket ID, description, and priority tags from semi-structured email body.\nDeduplication: Checked Pipedrive for existing contacts by email to avoid duplicates.\nError Handling: Wrapped API calls in “Retry” node to handle occasional rate-limit errors.\nTesting & Deployment: Deployed on Docker with Watchtower auto-updates and Prometheus for uptime monitoring.\n\nResults / Impact:\n90% reduction in manual data entry time for support team.\n0 duplicates created after dedupe logic deployed.\n~150 leads/week created automatically.",
      summaryBullets: [
        "Automated email parsing to Pipedrive CRM using n8n.",
        "Reduced manual data entry by 90% and eliminated duplicates.",
        "Automatically created ~150 leads/week.",
        "Utilized IMAP, JS regex, and Docker for deployment."
      ],
      technologies: ["n8n (self-hosted)", "Pipedrive API", "IMAP email node", "JavaScript Function nodes", "Docker", "Watchtower", "Prometheus"],
    },
    {
      id: 'proj_new_5',
      name: 'PDF & Image Text Extractor → Google Sheets + CRM',
      description:
        "Overview: Developed a two-branch n8n workflow to OCR-extract text from both PDF attachments and photos, then normalize that data into a Google Sheet and sync key fields to Pipedrive.\n\nKey Steps & Challenges:\nTrigger: New file upload in a monitored Google Drive folder triggers the flow.\nFile Type Routing: “If” node splits between .pdf and image formats (.jpg/.png).\nOCR Processing:\nPDFs: Converted each page to image (using ImageMagick) then OCR.\nImages: Fed directly to Tesseract.\nText Cleanup: Stripped out boilerplate, ran keyword-extraction to identify customer name, invoice numbers, and dates.\nData Output:\nGoogle Sheets: Appended raw text + structured columns (“Invoice #”, “Date”, “Amount”).\nPipedrive: Created a deal with custom fields for invoice data.\n\nResults / Impact:\nProcessed 500 docs/month in under 30 seconds each.\nEliminated 80% of manual document-processing errors.\nGoogle Sheet “master log” became single source of truth for finance team.",
      summaryBullets: [
        "Developed n8n workflow for OCR text extraction from PDFs & images.",
        "Normalized data and synced to Google Sheets & Pipedrive.",
        "Processed 500 docs/month, reducing errors by 80%.",
        "Used Tesseract OCR, Google Drive API, and ImageMagick."
      ],
      technologies: ["n8n", "Tesseract OCR (via Docker container)", "Google Drive", "Google Sheets", "Pipedrive API", "ImageMagick"],
    },
    {
      id: 'proj_new_6',
      name: 'Weekly Connection Insights Dashboard',
      description:
        "Overview & Business Need: Marketing leaders need visibility into new connections’ industries, regions, and seniority to refine targeting strategy.\n\nSolution & Key Steps:\nAutomated Scrape: Every Monday, automation tools export new 1st-degree connections to CSV.\nData Transformation: n8n normalizes location fields, maps titles to seniority tiers, timestamps records.\nSheet & Dashboard Update: Data appended to Google Sheets; triggers a Data Studio refresh.\nPDF Report: n8n generates a summary slide deck and emails it to stakeholders automatically.\n\nOutcome & Benefits:\n100% automated weekly reports.\nData-driven targeting refinements.\nExecutive-ready PDFs delivered without manual effort.",
      summaryBullets: [
        "Created an automated weekly dashboard for LinkedIn connection insights.",
        "Provided visibility into connection industries, regions, and seniority.",
        "Enabled data-driven marketing targeting refinements.",
        "Generated executive-ready PDF reports automatically via n8n and Google Slides."
      ],
      technologies: ["Automation tools", "n8n", "CSV processing", "Google Sheets", "Google Slides", "Google Data Studio"],
    },
    {
      id: 'proj_new_7',
      name: 'Hyper-Targeted Lead Mining & Outreach',
      description:
        "Overview & Business Need: Sales teams spend too much time manually finding and messaging prospects in niche industries. They need a hands-free pipeline that discovers, enriches, and contacts only high-value profiles.\n\nSolution & Key Steps:\nDynamic Prospect Search: Automation tools query LinkedIn with industry, seniority, and location filters.\nProfile Data Harvest: Scraped metadata (name, title, company, public email) is captured automatically.\nEnrichment & Scoring: Data is sent through n8n to enrichment APIs (e.g., Clearbit) and scored by company size and seniority.\nCRM Injection: Qualified leads auto-synced into Pipedrive (or HubSpot) with all metadata.\nPersonalized Drip Messaging: The system sends a templated connection request; on acceptance, it triggers a 3-step message sequence over LinkedIn.\n\nOutcome & Benefits:\n1,200 targeted contacts reached monthly.\n22% average connection-rate uplift.\n35% faster lead-to-opportunity conversion.",
      summaryBullets: [
        "Built a hands-free pipeline for hyper-targeted lead mining and outreach.",
        "Automated prospect discovery, enrichment, and personalized messaging.",
        "Reached 1,200+ targeted contacts monthly, boosting connection rates by 22%.",
        "Integrated LinkedIn scraping, n8n, Clearbit, and CRM APIs (Pipedrive/HubSpot)."
      ],
      technologies: ["Automation tools", "LinkedIn scraping", "LinkedIn messaging", "n8n", "Clearbit", "Hunter", "Pipedrive API", "HubSpot API"],
    },
    {
      id: 'proj_new_8',
      name: 'AI Imaging Hub — Web Portal + Automation Engine Orchestration',
      description:
        "Overview & Business Need: Businesses and creators often juggle multiple AI tools for image generation, watermark removal, and upscaling—and struggle to stitch them together with user management. You needed a single branded portal where users could register, then access a suite of AI-driven image services without bouncing between platforms.\n\nSolution & Key Steps:\nWebsite Development & User Management: Built a responsive React/Next.js frontend with Tailwind CSS. Implemented secure registration, login, and profile pages (JWT-backed sessions, email verification). “My Dashboard” lets users view credits, service history, and account settings.\nAutomation Engine Integration Layer: Frontend calls your backend API for each user request (e.g., “Generate Image from Text”). Backend triggers the automation engine via webhooks, passing user ID, input data, and API key. The engine manages rate-limiting, credit checks, and routing to external AI services.\nAI Service Workflows: Text → Image Generator: Calls OpenAI’s Image API (or Stable Diffusion endpoint), returns URL to generated image. Image → Image Transformation: Routes user uploads through a style-transfer inference endpoint, then returns stylized output. Watermark Removal: Invokes a watermark-removal microservice (based on LaMa), verifies output quality, and stores result. Image Upscaling: Sends files to a Real-ESRGAN upscaling API and monitors job status until completion. Batch Processing: Parallel branches process multiple uploads and zip results for download.\nCredit & Usage Tracking: Before each workflow, the automation engine checks remaining credits in your PostgreSQL database. On success, it deducts credits and logs a transaction record (service type, timestamp, usage details). On failure—or if credits are insufficient—it returns a structured error, and the frontend surfaces an “Upgrade Plan” prompt.\nStorage & Delivery: All user inputs and outputs are stored in AWS S3 private buckets. The automation engine generates signed URLs for secure, time-limited downloads. Users are notified via WebSocket (or polling) when jobs complete.\nMonitoring & Notifications: The engine sends daily usage summaries to Slack for your ops team. Errors or high-latency jobs trigger immediate email alerts.\n\nOutcome & Benefits:\nUnified Experience: Users access all AI image services through a single portal with one login.\nScalable Automation: Engine handles spikes by parallelizing jobs and throttling requests.\nCost Control: Credit-based billing ensures users only pay for what they consume—and you can easily upsell higher plans.\nOperational Visibility: Automated alerts and daily reports keep you on top of performance and errors without manual checks.",
      summaryBullets: [
        "Developed a unified web portal for multiple AI image generation services.",
        "Integrated React/Next.js frontend with a Node.js/Express backend & n8n orchestration.",
        "Managed user authentication, credits, and AI service calls (OpenAI, Stable Diffusion).",
        "Ensured scalable automation, cost control, and operational visibility."
      ],
      technologies: ["React", "Next.js", "Tailwind CSS", "JWT", "Webhooks", "OpenAI Image API", "Stable Diffusion", "LaMa watermark removal", "Real-ESRGAN upscaling", "Node.js", "Express", "PostgreSQL", "AWS S3", "Signed URLs", "WebSockets", "Slack API", "SendGrid API"],
    },
  ],
  languageSkills: [
    { id: 'lang_1', name: 'ARABIC', motherTongue: true },
    {
      id: 'lang_2',
      name: 'ENGLISH',
      listening: 'C1',
      reading: 'C2',
      spokenInteraction: 'B2',
      spokenProduction: 'B2',
      writing: 'B1',
    },
  ],
};

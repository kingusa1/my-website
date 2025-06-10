
# Mohamed Ismail - Interactive Full-Stack CV

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <!-- Replace with your chosen license if different -->

Welcome to the repository for my personal interactive CV and portfolio website! This project is designed to showcase my skills, professional experience, educational background, and projects in a modern, engaging, and responsive format.

<!-- Optional: Add a live demo link if deployed -->
<!-- **Live Demo:** [your-live-site-url.com](https://your-live-site-url.com) -->

<!-- Optional: Add a screenshot or GIF of the application -->
<!--
![App Screenshot](https://placehold.co/800x450.png?text=App+Screenshot+Here)
*A glimpse of the interactive CV in action.*
-->

## ✨ Features

This application comes packed with features to provide a seamless and informative user experience:

*   **Interactive CV Timeline**: Visually appealing sections for Work Experience, Education, Skills, and Projects, presented in chronological order with clear timelines and dividers.
*   **Dynamic Content**: CV data is managed centrally in `src/lib/data.ts`, making updates straightforward.
*   **Comprehensive Profile**: Includes a prominent contact information header and dedicated sections for a detailed summary, skills breakdown, and language proficiency.
*   **Projects Showcase**: A dedicated page to display projects with descriptions, technologies used, and links to GitHub, YouTube, or live demos.
*   **Responsive Design**: Fully responsive layout that adapts beautifully to all screen sizes, from mobile devices to desktops.
*   **Modern UI/UX**:
    *   Sleek dark mode theme as default.
    *   Built with modern UI components from ShadCN UI.
    *   Utilizes Tailwind CSS for utility-first styling.
    *   Smooth scroll-triggered animations for an engaging browsing experience.
    *   Minimalist icons from Lucide React for visual cues.
*   **User-Friendly Navigation**: Clear and intuitive navigation bar to easily access different sections of the CV (CV, Projects, Contact).
*   **Contact Page**: A dedicated contact page with direct contact links and an email form that opens the user's default mail client.

## 🛠️ Tech Stack

This project leverages a modern, robust, and scalable technology stack:

*   **Framework**: [Next.js](https://nextjs.org/) (v15+ with App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Library**: [React](https://reactjs.org/)
*   **Component Library**: [ShadCN UI](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps.
*   **Styling**:
    *   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
    *   CSS Variables for theming (customizable in `src/app/globals.css`).
*   **Icons**: [Lucide React](https://lucide.dev/) - Simply beautiful open-source icons.
*   **Animations**: Scroll-triggered animations using Intersection Observer API (via `useScrollAnimation` hook).
*   **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation (used in the Contact Me page).

## 📂 Project Structure

The codebase is organized to promote maintainability and scalability:

```
.
├── public/               # Static assets (images, favicons, etc.)
├── src/
│   ├── app/              # Next.js App Router (pages, layouts, global styles)
│   │   ├── (main)/       # Main application routes (CV, Projects, Contact)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx      (CV page)
│   │   │   ├── contact/
│   │   │   └── projects/
│   │   ├── globals.css   # Global styles and Tailwind directives
│   │   └── layout.tsx    # Root layout
│   ├── components/       # Reusable UI components
│   │   ├── cv/           # CV specific components
│   │   ├── layout/       # Layout components (Navbar, etc.)
│   │   ├── projects/     # Project specific components
│   │   └── ui/           # ShadCN UI components
│   ├── hooks/            # Custom React Hooks (e.g., useScrollAnimation, useToast)
│   ├── lib/              # Utility functions, type definitions, and CV data
│   │   ├── data.ts       # Centralized CV data
│   │   ├── types.ts      # TypeScript type definitions
│   │   └── utils.ts      # Utility functions (e.g., cn for classnames)
│   └── ...
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── components.json       # ShadCN UI configuration
├── package.json
└── README.md
```

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```
    *(Replace `your-username/your-repository-name` with your actual repository details)*

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```
    Or using pnpm:
    ```bash
    pnpm install
    ```

### Running the Development Server

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    Or using yarn:
    ```bash
    yarn dev
    ```
    Or using pnpm:
    ```bash
    pnpm dev
    ```

2.  Open your browser and navigate to `http://localhost:9002` (or the port specified in your terminal).

## 🎨 Customization

This CV is designed to be easily personalized.

### 1. Update Your Information

All personal data (name, title, contact info, experience, education, skills, projects, etc.) is stored in:
`src/lib/data.ts`

Modify this file with your own details. The website will dynamically update to reflect these changes.

### 2. Change Profile Photo

*   Place your profile photo (e.g., `your-photo.jpg`) in the `public/` directory at the root of the project.
*   Update the `profilePhotoUrl` field in `src/lib/data.ts` to point to your image file (e.g., `profilePhotoUrl: '/your-photo.jpg',`).

### 3. Customize Theme & Styling

*   **Colors**: The primary color scheme (background, foreground, accent) is defined using HSL CSS variables in `src/app/globals.css` within the `.dark` scope. Adjust these values to change the overall look and feel.
    ```css
    /* src/app/globals.css */
    .dark {
      --background: 0 0% 0%; /* Black */
      --foreground: 0 0% 90%; /* Off-white */
      --accent: 45 74% 53%; /* Soft Gold */
      /* ... other color variables */
    }
    ```
*   **Fonts**: The primary font ('Inter') is imported in `src/app/layout.tsx` via Google Fonts. You can change this to any other Google Font or self-hosted font. Remember to update `tailwind.config.ts` if you change the font family names.
*   **Component Styling**: Most components utilize Tailwind CSS. You can modify existing Tailwind classes or add new ones directly in the component files (`.tsx`) located in `src/components/`.

### 4. Add or Modify Sections

*   **Pages**: New pages can be added under `src/app/(main)/`. Follow the Next.js App Router conventions.
*   **Components**: Create new React components in `src/components/` and integrate them into your pages.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
*(If you haven't added a LICENSE.md file, you can choose one like MIT and add it to your repository.)*

---

Thank you for checking out my portfolio project! Feel free to connect with me.

<!-- Optional: Add direct contact links here -->
<!--
**Mohamed Ismail**
*   LinkedIn: [linkedin.com/in/mohamed-hisham-ismail-32ba2b134](https://linkedin.com/in/mohamed-hisham-ismail-32ba2b134)
*   GitHub: [github.com/kingusa1](https://github.com/kingusa1)
*   Email: [mohamedhisham735@gmail.com](mailto:mohamedhisham735@gmail.com)
-->

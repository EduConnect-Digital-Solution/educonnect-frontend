# EduConnect Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)

A school management system built with React and Vite, providing a platform for Administrators, Teachers, and Parents.

---

## Table of Contents

- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Key Features

- **Role-Based Access Control:** Separate dashboards and functionalities for Administrators, Teachers, and Parents.
- **Administrator Dashboard:**
  - Manage users (Teachers, Parents, Students).
  - Oversee school-wide information and settings.
- **Teacher Dashboard:**
  - View and manage assigned classes and students.
  - Track student performance and analytics.
- **Parent Dashboard:**
  - View their children's progress and school-related information.
- **Modern UI:** Built with Tailwind CSS and a mix of headless UI libraries for a clean and responsive user experience.
- **Form Handling:** Robust and type-safe forms powered by React Hook Form and Zod.

---

## Technology Stack

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A modern frontend build tool for faster development.
- **[React Router](https://reactrouter.com/)**: For client-side routing.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework.
- **UI Components**:
  - **[Chakra UI](https://chakra-ui.com/)**: For accessible and reusable UI components.
  - **[Radix UI](https://www.radix-ui.com/)**: For headless, low-level UI primitives.
- **[React Hook Form](https://react-hook-form.com/)**: For flexible and performant form validation.
- **[Zod](https://zod.dev/)**: For TypeScript-first schema declaration and validation.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or higher recommended)
- [npm](https://www.npmjs.com/) (or a compatible package manager like Yarn or pnpm)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd educonnect-frontend
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

---

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the codebase using ESLint.
-   `npm run preview`: Serves the production build locally to preview before deployment.

---

## Project Structure

```
educonnect-frontend/
├── public/              # Static assets like logo.png
├── src/
│   ├── assets/          # Images, icons, and other static files
│   ├── components/      # Reusable React components (Header, Footer, UI elements)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components mapped to routes
│   │   ├── auth/        # Authentication pages (Login, Success, etc.)
│   │   ├── application/ # Core application dashboards
│   │   │   ├── AdminDashboard/
│   │   │   ├── ParentDashboard/
│   │   │   └── TeacherDashboard/
│   │   └── Home.jsx     # Landing page
│   ├── utils/           # Other utility functions
│   ├── App.jsx          # Main application component with routing setup
│   └── main.jsx         # Application entry point
├── .gitignore
├── package.json
└── README.md
```

---

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## License

This project is licensed under the MIT License.
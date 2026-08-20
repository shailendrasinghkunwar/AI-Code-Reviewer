# AI Code Reviewer - Production AI Powered Code Analysis & Refactoring

A production-ready, full-stack web application that performs automated AI-driven code reviews using the Google Gemini API. Built with React (Vite), Monaco Editor, Tailwind CSS, Node.js, Express.js, MongoDB (Mongoose), and JWT Authentication.

---

## 🌟 Key Features

1. **User Authentication**: Secure Registration and Login with JWT and password hashing using `bcryptjs`.
2. **Monaco Code Editor**: Professional browser-based code editor (powering VS Code) with syntax highlighting, line numbers, and theme integration.
3. **Multi-Language Support**: Supports JavaScript, Python, Java, C++, C#, Go, TypeScript, HTML, CSS, SQL.
4. **Code Import & Presets**: Drag-and-drop or upload code files directly (`.js`, `.py`, `.java`, `.cpp`), plus pre-built preset code snippets for instant demo testing.
5. **AI Code Analysis Engine (Google Gemini API)**:
   - 🐞 **Bugs & Errors**: Line-by-line flaw detection with severity indicators (Critical, High, Medium, Low) and suggested fixes.
   - 🛡️ **Security Vulnerabilities**: Injection risks, pointer/memory issues, input validation checks.
   - ⚡ **Performance Optimization**: Bottlenecks, unnecessary loops, and memory overhead.
   - ⏱️ **Time & Space Complexity**: Big-O notation evaluation (e.g. `O(N log N)`).
   - 🔍 **Code Quality & Architecture**: Structure and naming convention advice.
   - 💡 **Best Practices & Readability**: Modern language standards and clean code tips.
   - 🏆 **Overall Code Score**: Animated rating out of 10 with color coding.
   - ✨ **Refactored Code**: Complete optimized and ready-to-run refactored output.
6. **Review History Dashboard**: Full audit history saved in MongoDB with stats counters (Total Reviews, Average Score, Bugs Found, Language Breakdown) and search/filtering options.
7. **Export & Sharing**: Copy full GitHub-flavored Markdown reports or refactored code to clipboard, or download as `.md` file.
8. **Dark & Light Mode**: Toggleable modern glassmorphism design system.
9. **Responsive Design**: Tailored layout for mobile, tablet, and desktop displays.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: React.js (Vite), `@monaco-editor/react`, React Router v6, Tailwind CSS, Axios, Lucide React.
- **Backend**: Node.js, Express.js (MVC Architecture).
- **Database**: MongoDB with Mongoose ORM.
- **AI Integration**: Google Gemini API (`@google/genai` SDK with the configurable `gemini-3.6-flash` model).
- **Security**: JWT (JSON Web Tokens), `bcryptjs` hashing, CORS protection, custom auth middleware.

---

## 📂 Folder Structure

```
AI Code Reviewer Project/
├── server/                    # Node.js + Express Backend
│   ├── config/                # Database (db.js) & Gemini API (gemini.js)
│   ├── controllers/           # AuthController.js & ReviewController.js
│   ├── middleware/            # AuthMiddleware.js & ErrorHandler.js
│   ├── models/                # User.js & Review.js (Mongoose Schemas)
│   ├── routes/                # AuthRoutes.js & ReviewRoutes.js
│   ├── utils/                 # Gemini prompt constructor & JSON parser
│   ├── .env.example           # Backend environment variable template
│   ├── server.js              # Express app entry point
│   └── package.json
│
├── client/                    # Vite + React Frontend
│   ├── src/
│   │   ├── components/        # Navbar, MonacoEditor, ReviewOutput, ScoreBadge, FileUploader, etc.
│   │   ├── context/           # AuthContext & ThemeContext
│   │   ├── pages/             # Home, Dashboard, ReviewDetails, Login, Register, NotFound
│   │   ├── services/          # Axios instance & API services
│   │   ├── utils/             # Export helpers & sample code presets
│   │   ├── App.jsx            # Router & Layout
│   │   ├── index.css          # Tailwind CSS styles
│   │   └── main.jsx           # Entry point
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Setup & Single Command Run Guide

### Prerequisites
- Node.js (v18 or higher)
- NPM or Yarn
- MongoDB (Local MongoDB or Atlas URI)
- Google Gemini API Key

---

### Step 1: Install Dependencies (All in One)

Run from the main project root folder (`AI Code Reviewer Project`):
```bash
npm run install:all
```
*This automatically installs dependencies for both backend (`server`) and frontend (`client`).*

---

### Step 2: Configure Environment Variables

Create `.env` inside the `server/` folder:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/ai-code-reviewer
JWT_SECRET=your_jwt_secret_key_123!
GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY_HERE
# Optional: defaults to gemini-3.6-flash
GEMINI_MODEL=gemini-3.6-flash
```

---

### Step 3: Run Both Backend & Frontend with ONE Command! ⚡

Run from the main project root folder:
```bash
npm run dev
```

This will launch **both** services simultaneously:
- 🟢 **Backend Express Server**: `http://localhost:5000`
- 🔵 **Frontend Vite React App**: `http://localhost:3000`


---

## 📡 REST API Documentation

### Auth Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | No |
| `GET` | `/api/auth/me` | Fetch current user profile | Yes (Bearer Token) |

### Review Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/reviews/analyze` | Submit code for Gemini AI analysis | Yes (Bearer Token) |
| `GET` | `/api/reviews` | Get list of user's past code reviews | Yes (Bearer Token) |
| `GET` | `/api/reviews/stats` | Get review history analytics & stats | Yes (Bearer Token) |
| `GET` | `/api/reviews/:id` | Get details for a single review | Yes (Bearer Token) |
| `DELETE` | `/api/reviews/:id` | Delete review record | Yes (Bearer Token) |

---

## 🌐 Production Deployment Guide

1. **Database**: Use a MongoDB Atlas cluster and set `MONGODB_URI` in production environment variables.
2. **Backend**: Deploy the Express `server` to platforms like Render, Railway, AWS ECS, or DigitalOcean App Platform. Ensure `GEMINI_API_KEY`, `JWT_SECRET`, and `NODE_ENV=production` are set.
3. **Frontend**: Build production assets (`npm run build` in `client`) and deploy the static build to Vercel, Netlify, or Cloudflare Pages.

### Current Render + Vercel setup

The client already defaults to the Render API in production. You can override
that URL in the Vercel project settings by adding this environment variable for
**Production** (and Preview if desired), then redeploy:

```env
VITE_API_URL=https://ai-code-reviewer-2-mjno.onrender.com/api
```

The backend allows `https://ai-code-reviewer-six-kappa.vercel.app` by default.
For additional frontend domains, set the Render environment variable below to
a comma-separated list and redeploy the backend:

```env
CLIENT_URL=https://ai-code-reviewer-six-kappa.vercel.app
```

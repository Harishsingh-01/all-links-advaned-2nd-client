# Project Hub - MERN Stack

A modern project management tool built with MongoDB, Express, React, and Node.js.

## Features

- ✨ Modern, polished UI with gradient designs
- 🔍 Search and filter projects by status
- 📝 Add, edit, and delete projects
- 🔗 Quick access to project URLs and GitHub repos
- 📋 Copy local commands with one click
- 💾 Persistent storage with MongoDB
- ⚡ Fast and responsive interface

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose

## Setup Instructions

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb://localhost:27017/project-hub
PORT=5000
```

Or use MongoDB Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-hub
```

### 4. Start MongoDB

Make sure MongoDB is running on your system. If using local MongoDB:

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
# MongoDB should start automatically as a service
```

### 5. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:5000`

## Project Structure

```
.
├── server/           # Backend (Express + MongoDB)
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── server.js     # Express server
├── src/              # Frontend (React)
│   ├── components/   # React components
│   ├── utils/        # API utilities
│   └── hooks/        # Custom hooks
└── package.json      # Frontend dependencies
```

## API Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `PATCH /api/projects/:id/last-opened` - Update last opened timestamp

## Keyboard Shortcuts

- `Ctrl/Cmd + N` - Add new project
- `Ctrl/Cmd + K` - Command palette (coming soon)

## Data Model

```javascript
{
  name: String (required),
  slug: String (required, unique),
  type: 'Frontend' | 'Backend' | 'Fullstack',
  techStack: [String],
  status: 'Stable' | 'Debugging' | 'Broken',
  url: String,
  githubUrl: String,
  localCommand: String,
  notes: String,
  lastOpened: Date,
  createdAt: Date,
  updatedAt: Date
}
```

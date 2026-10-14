# FlowBoard — Smart Project & Task Management Dashboard

A modern, responsive project and task management application built with **React, Vite, Tailwind CSS, and Redux Toolkit**. FlowBoard helps users organize projects, manage tasks, collaborate with team members, track productivity, and monitor progress through an intuitive dashboard.

🚀 Live Website: https://flow-board-ten-plum.vercel.app/

## ✨ Features

### 📊 Dashboard

- Personalized dashboard greeting
- Project and task statistics
- Task completion rate
- Recent tasks and upcoming deadlines
- Productivity charts and visual summaries
- Responsive dashboard cards

### 📁 Project Management

- Create, view, and delete projects
- Search projects by name or description
- Filter projects by status
- Track project progress and status
- Responsive project cards

### ✅ Task Management

- Create and edit tasks
- Delete tasks with confirmation
- Search tasks by title and description
- Filter tasks by status and priority
- Assign tasks to team members
- Associate tasks with projects
- Manage due dates and descriptions

### 🗂️ Kanban Board

- Visual task organization
- Columns for To Do, In Progress, In Review, and Done
- Drag-and-drop task movement
- Update task status through board interactions

### 👥 Team Management

- Display team members
- Track team member information
- Associate tasks with assignees
- Organize project collaboration

### 📅 Calendar

- View tasks and deadlines in a calendar layout
- Track upcoming work
- Organize tasks by date

### 📈 Analytics

- Visualize task and project progress
- Display productivity statistics
- Present data through charts

### ⏱️ Focus Mode

- Dedicated focus workspace
- Pomodoro-style productivity workflow

### 🔔 Notifications

- View notifications
- Mark individual notifications as read
- Mark all notifications as read
- Delete notifications

### ⚙️ Settings

- Manage application preferences
- Switch between light and dark themes
- Customize the user experience

### 🔐 Authentication

- Login and registration screens
- Protected application routes
- Logout functionality
- Demo authentication state persistence

### 🎨 UI & UX

- Responsive desktop, tablet, and mobile layouts
- Violet and indigo visual theme
- Light and dark modes
- Reusable React components
- Search and filtering interfaces
- Form validation and interactive controls
- Loading and empty states where implemented
- Consistent buttons, cards, and form styling

## 🛠️ Tech Stack

| Technology      | Purpose                              |
| --------------- | ------------------------------------ |
| React           | Component-based UI development       |
| Vite            | Development server and build tooling |
| React Router    | Client-side routing                  |
| Tailwind CSS    | Responsive styling and UI design     |
| Redux Toolkit   | Global application state management  |
| React Redux     | Connect React components to Redux    |
| React Icons     | Interface icons                      |
| Framer Motion   | UI animations and transitions        |
| dnd-kit         | Drag-and-drop Kanban interactions    |
| Recharts        | Analytics and productivity charts    |
| React Hook Form | Form state management                |
| Yup             | Form validation schemas              |
| LocalStorage    | Demo data persistence in the browser |

## 📂 Project Folder Structure

```text
FlowBoard/
├── public/
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── EmptyState.jsx
│   │   │   └── Skeleton.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   ├── GlobalSearch.jsx
│   │   │   ├── NotificationDropdown.jsx
│   │   │   └── ProfileDropdown.jsx
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectCard.jsx
│   │   │   └── ProjectForm.jsx
│   │   │
│   │   ├── tasks/
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskFilters.jsx
│   │   │   └── KanbanBoard.jsx
│   │   │
│   │   └── dashboard/
│   │       ├── StatCard.jsx
│   │       └── RecentTasks.jsx
│   │
│   ├── context/
│   │   └── ThemeContext.jsx
│   │
│   ├── data/
│   │   └── dashboardData.js
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   ├── Tasks.jsx
│   │   ├── Kanban.jsx
│   │   ├── TaskDetails.jsx
│   │   ├── Team.jsx
│   │   ├── Calendar.jsx
│   │   ├── Analytics.jsx
│   │   ├── Focus.jsx
│   │   ├── Notifications.jsx
│   │   ├── Settings.jsx
│   │   └── NotFound.jsx
│   │
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── projectSlice.js
│   │   │   ├── taskSlice.js
│   │   │   └── teamSlice.js
│   │   │
│   │   └── store.js
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── utils/
│   │   └── storage.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

**Folder responsibilities**

- `assets/` — Images, illustrations, and static visual resources.
- `components/` — Reusable UI components grouped by feature.
- `context/` — Shared React context, such as theme management.
- `data/` — Demo datasets and initial dashboard data.
- `pages/` — Route-level screens.
- `redux/slices/` — State and reducer logic for application features.
- `redux/store.js` — Central Redux store configuration.
- `routes/` — Application route definitions and protected-route logic.
- `utils/` — Shared helpers, including LocalStorage utilities.
- `public/` — Static files served directly by Vite.

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- Node.js (a current LTS version is recommended)
- npm
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd FlowBoard
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL printed in the terminal, usually:

```text
http://localhost:5173
```

### 4. Create a production build

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

### 6. Run lint checks

```bash
npm run lint
```

## 🧭 Application Routes

| Page          | Purpose                                 |
| ------------- | --------------------------------------- |
| Login         | Sign in to the application              |
| Register      | Create a demo account                   |
| Dashboard     | View overall project and task progress  |
| Projects      | Manage projects                         |
| Tasks         | Manage, search, and filter tasks        |
| Kanban        | Organize tasks by workflow status       |
| Task Details  | View individual task information        |
| Team          | View team members                       |
| Calendar      | Track scheduled tasks and deadlines     |
| Analytics     | Review productivity and progress charts |
| Focus         | Work in a focus session                 |
| Notifications | Manage application notifications        |
| Settings      | Manage preferences and appearance       |

## 🧠 State Management

FlowBoard uses Redux Toolkit to organize shared application data.

Typical state responsibilities include:

- **Authentication:** Current user and authentication status.
- **Projects:** Project creation, updates, and deletion.
- **Tasks:** Task creation, editing, deletion, and status updates.
- **Team:** Team member information and related operations.

React components access the Redux store through `useSelector` and dispatch actions through `useDispatch`.

Example:

```jsx
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/slices/taskSlice";

const tasks = useSelector((state) => state.tasks.tasks);
const dispatch = useDispatch();

// Example action:
dispatch(addTask(taskData));
```

## 💾 LocalStorage Persistence

FlowBoard uses browser LocalStorage to preserve demo application data between page reloads.

Storage keys used during development include:

```text
flowboard-user
flowboard-projects
flowboard-tasks
flowboard-team
flowboard-recent-searches
```

The storage utility should handle missing, invalid, or undefined values safely.

## 🎨 Styling and Theme

FlowBoard uses Tailwind CSS utility classes for:

- Responsive grids and layouts
- Spacing and typography
- Buttons, cards, and form controls
- Hover and focus states
- Light and dark theme variants
- Responsive behavior across screen sizes

The interface uses a violet-indigo accent palette with neutral slate backgrounds. Shared styles help keep the dashboard, task cards, forms, and navigation visually consistent.

## 📱 Responsive Design

The UI is designed to adapt to different screen sizes.

- **Mobile:** Single-column layouts, touch-friendly controls, and stacked forms.
- **Tablet:** Flexible grids and compact navigation.
- **Desktop:** Multi-column dashboards, expanded navigation, and wider data views.

Responsive behavior should be tested with the browser's device toolbar and on real devices where possible.

## 🧪 Testing Checklist

Before releasing a new version, verify:

- [ ] Login and registration flows work as expected.
- [ ] Protected pages handle signed-out users correctly.
- [ ] Projects can be created, searched, filtered, and deleted.
- [ ] Tasks can be created, edited, searched, filtered, and deleted.
- [ ] Task status changes are reflected on the Kanban board.
- [ ] Calendar and analytics reflect the expected data.
- [ ] Theme changes work throughout the interface.
- [ ] Notifications can be read and deleted.
- [ ] Data remains consistent after a page refresh.
- [ ] Mobile and tablet layouts have no horizontal overflow.
- [ ] Buttons, dropdowns, and form controls are keyboard accessible.
- [ ] The production build completes successfully.

## 🔒 Security Notes

FlowBoard currently uses a frontend demo architecture with LocalStorage persistence.

For a production-ready application, consider adding:

- A backend API
- Database persistence, such as MongoDB or PostgreSQL
- Secure server-side authentication
- Password hashing and appropriate session/token handling
- Server-side input validation
- Authorization checks for projects and tasks
- User-specific data access rules
- Rate limiting and appropriate security headers

Do not store plaintext passwords, secret API keys, or other sensitive credentials in LocalStorage or frontend source code.

## 🌱 Future Improvements

- [ ] Backend API integration
- [ ] Real database persistence
- [ ] Secure authentication and authorization
- [ ] User-specific projects and tasks
- [ ] Team invitations and collaboration
- [ ] Task comments and activity history
- [ ] File attachments
- [ ] Real-time notifications
- [ ] Advanced search and sorting
- [ ] Automated unit and integration tests
- [ ] Accessibility improvements
- [ ] Performance and SEO optimization

## 📦 Production Deployment

FlowBoard can be deployed to a frontend hosting platform such as Vercel or Netlify.

General deployment steps:

1. Push the project to GitHub.
2. Import the repository into your hosting provider.
3. Configure the build command as `npm run build`.
4. Set the output directory to `dist`.
5. Configure SPA fallback rewrites if required for client-side routes.
6. Deploy and test direct navigation to nested routes.

If the project later uses a backend, configure production API URLs through environment variables and ensure the backend allows requests from the deployed frontend.

## 👩‍💻 Author

**Pooja Patel**

Frontend Developer | React Developer

GitHub: [Pooja23494](https://github.com/Pooja23494)

## 📄 License

This project is intended for learning, portfolio development, and demonstration. Add a `LICENSE` file to the repository if you want to specify formal reuse and distribution terms.

---

**FlowBoard — Plan smarter. Work better. Achieve more.**

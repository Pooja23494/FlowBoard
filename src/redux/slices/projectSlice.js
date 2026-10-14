import { loadFromStorage, saveToStorage } from "../../utils/storage";
import { createSlice } from "@reduxjs/toolkit";

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign company website",
    progress: 72,
    tasks: 25,
    completedTasks: 18,
    members: 4,
    status: "In Progress",
  },
  {
    id: 2,
    name: "Mobile Application",
    description: "Build mobile application UI",
    progress: 48,
    tasks: 25,
    completedTasks: 12,
    members: 5,
    status: "In Progress",
  },
  {
    id: 3,
    name: "Marketing Website",
    description: "Create marketing landing pages",
    progress: 86,
    tasks: 28,
    completedTasks: 24,
    members: 3,
    status: "In Progress",
  },
];

const savedProjects = loadFromStorage("flowboard-projects", initialProjects);

const validProjects = Array.isArray(savedProjects)
  ? savedProjects.filter(
      (project) =>
        project &&
        project.id !== undefined &&
        typeof project.name === "string" &&
        typeof project.description === "string",
    )
  : initialProjects;

const initialState = {
  projects: validProjects.length > 0 ? validProjects : initialProjects,
  selectedProject: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",

  initialState,

  reducers: {
    addProject: (state, action) => {
      state.projects.push({
        ...action.payload,
        id: Date.now(),
      });

      saveToStorage("flowboard-projects", state.projects);
    },

    updateProject: (state, action) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id,
      );

      if (index !== -1) {
        state.projects[index] = {
          ...state.projects[index],
          ...action.payload,
        };

        saveToStorage("flowboard-projects", state.projects);
      }
    },

    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );

      saveToStorage("flowboard-projects", state.projects);
    },

    selectProject: (state, action) => {
      state.selectedProject =
        state.projects.find((project) => project.id === action.payload) || null;
    },

    clearSelectedProject: (state) => {
      state.selectedProject = null;
    },
  },
});

export const {
  addProject,
  updateProject,
  deleteProject,
  selectProject,
  clearSelectedProject,
} = projectSlice.actions;

export default projectSlice.reducer;

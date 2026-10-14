import { createSlice } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../../utils/storage";

const initialTasks = [
  {
    id: 1,
    title: "Design homepage",
    description: "Create responsive homepage design",
    projectId: 1,
    assignee: "Pooja Patel",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-09-30",
  },
  {
    id: 2,
    title: "Fix login validation",
    description: "Fix email and password validation",
    projectId: 2,
    assignee: "Rahul Shah",
    status: "review",
    priority: "urgent",
    dueDate: "2026-10-01",
  },
  {
    id: 3,
    title: "Create hero section",
    description: "Build responsive hero section",
    projectId: 3,
    assignee: "Neha Mehta",
    status: "todo",
    priority: "medium",
    dueDate: "2026-10-02",
  },
  {
    id: 4,
    title: "Update navigation",
    description: "Improve responsive navigation",
    projectId: 1,
    assignee: "Pooja Patel",
    status: "done",
    priority: "low",
    dueDate: "2026-10-03",
  },
];

const initialState = {
  tasks: loadFromStorage("flowboard-tasks", initialTasks),
  selectedTask: null,

  filters: {
    status: "all",
    priority: "all",
    assignee: "all",
    search: "",
  },

  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        ...action.payload,
        id: Date.now(),
      });
      saveToStorage("flowboard-tasks", state.tasks);
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );

      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
        };
        saveToStorage("flowboard-tasks", state.tasks);
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveToStorage("flowboard-tasks", state.tasks);
    },

    selectTask: (state, action) => {
      state.selectedTask =
        state.tasks.find((task) => task.id === action.payload) || null;
    },

    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },

    updateTaskStatus: (state, action) => {
      const { taskId, status } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);

      if (task) {
        task.status = status;
        saveToStorage("flowboard-tasks", state.tasks);
      }
    },

    updateTaskPriority: (state, action) => {
      const { taskId, priority } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);

      if (task) {
        task.priority = priority;
        saveToStorage("flowboard-tasks", state.tasks);
      }
    },

    setTaskFilter: (state, action) => {
      const { filter, value } = action.payload;

      state.filters[filter] = value;
    },

    resetTaskFilters: (state) => {
      state.filters = {
        status: "all",
        priority: "all",
        assignee: "all",
        search: "",
      };
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  selectTask,
  clearSelectedTask,
  updateTaskStatus,
  updateTaskPriority,
  setTaskFilter,
  resetTaskFilters,
} = taskSlice.actions;

export default taskSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../../utils/storage";

const initialMembers = [
  {
    id: 1,
    name: "Pooja Patel",
    email: "pooja@example.com",
    role: "Developer",
    department: "Engineering",
    tasks: 12,
    completedTasks: 10,
    progress: 84,
  },
  {
    id: 2,
    name: "Rahul Shah",
    email: "rahul@example.com",
    role: "Designer",
    department: "Design",
    tasks: 8,
    completedTasks: 6,
    progress: 72,
  },
  {
    id: 3,
    name: "Neha Mehta",
    email: "neha@example.com",
    role: "Developer",
    department: "Engineering",
    tasks: 10,
    completedTasks: 9,
    progress: 91,
  },
  {
    id: 4,
    name: "Amit Patel",
    email: "amit@example.com",
    role: "Project Manager",
    department: "Management",
    tasks: 6,
    completedTasks: 5,
    progress: 78,
  },
  {
    id: 5,
    name: "Kiran Joshi",
    email: "kiran@example.com",
    role: "QA Engineer",
    department: "Quality",
    tasks: 9,
    completedTasks: 7,
    progress: 76,
  },
];

const initialState = {
  members: loadFromStorage("flowboard-team", initialMembers),
  selectedMember: null,
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: "team",

  initialState,

  reducers: {
    addMember: (state, action) => {
      state.members.push({
        ...action.payload,
        id: Date.now(),
        tasks: 0,
        completedTasks: 0,
        progress: 0,
      });
      saveToStorage("flowboard-team", state.members);
    },

    updateMember: (state, action) => {
      const index = state.members.findIndex(
        (member) => member.id === action.payload.id,
      );

      if (index !== -1) {
        state.members[index] = {
          ...state.members[index],
          ...action.payload,
        };
        saveToStorage("flowboard-team", state.members);
      }
    },

    deleteMember: (state, action) => {
      state.members = state.members.filter(
        (member) => member.id !== action.payload,
      );
      saveToStorage("flowboard-team", state.members);
    },

    selectMember: (state, action) => {
      state.selectedMember =
        state.members.find((member) => member.id === action.payload) || null;
    },

    clearSelectedMember: (state) => {
      state.selectedMember = null;
    },
  },
});

export const {
  addMember,
  updateMember,
  deleteMember,
  selectMember,
  clearSelectedMember,
} = teamSlice.actions;

export default teamSlice.reducer;

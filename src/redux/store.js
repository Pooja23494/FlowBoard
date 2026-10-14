import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import taskReducer from "./slices/taskSlice";
import uiReducer from "./slices/uiSlice";
import teamReducer from "./slices/teamSlice";
import notificationReducer from "./slices/notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    tasks: taskReducer,
    ui: uiReducer,
    team: teamReducer,
    notifications: notificationReducer,
  },
});

export default store;

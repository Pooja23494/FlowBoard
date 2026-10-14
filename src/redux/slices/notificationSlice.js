import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [
    {
      id: 1,
      type: "task",
      title: "Task deadline approaching",
      message: "Design homepage is due today.",
      time: "10 minutes ago",
      read: false,
      relatedId: 1,
    },
    {
      id: 2,
      type: "project",
      title: "Project progress updated",
      message: "Website Redesign reached 72% completion.",
      time: "1 hour ago",
      read: false,
      relatedId: 1,
    },
    {
      id: 3,
      type: "team",
      title: "New team activity",
      message: "Neha Mehta completed a task.",
      time: "3 hours ago",
      read: true,
      relatedId: 3,
    },
    {
      id: 4,
      type: "task",
      title: "Task moved to review",
      message: "Fix login validation is ready for review.",
      time: "Yesterday",
      read: true,
      relatedId: 2,
    },
  ],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,

  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift({
        ...action.payload,
        id: Date.now(),
        read: false,
      });
    },

    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        (item) => item.id === action.payload,
      );

      if (notification) {
        notification.read = true;
      }
    },

    markAllAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
    },

    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;

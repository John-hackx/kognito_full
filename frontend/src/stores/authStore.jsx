import { create } from "zustand";
import axios from "axios";
import { baseURL } from "../api/api";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setError: (errorValue) => {
    set({ error: errorValue });
  },
  setLoading: (loadingValue) => {
    set({ error: loadingValue });
  },
  signUp: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${baseURL}/api/auth/signup`, formData, {
        withCredentials: true,
      });

      set({
        user: res.data.data,
        isLoading: false,
      });
      return res.data.data;
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.error });
    }
  },
  logIn: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${baseURL}/api/auth/login`, formData, {
        withCredentials: true,
      });

      set({ user: res.data.data, isLoading: false });
      return res.data.data;
    } catch (error) {
      console.log(error.response);
      set({ error: error.response.data.error });
    }
  },
  logOut: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.post(
        `${baseURL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      set({ user: null, isLoading: false, error: null });
      return res.data;
    } catch (error) {
      console.log(error.response);
      set({ error: error.response.data.error });
    }
  },
  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${baseURL}/api/auth/me`, {
        withCredentials: true,
      });
      set({ user: res.data?.data, isLoading: false });
      return res.data?.data;
    } catch (error) {
      console.log(error.response);
      set({ error: error.response?.data.error });
    }
  },
}));

export default useAuthStore;

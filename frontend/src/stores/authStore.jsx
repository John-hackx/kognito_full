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
    set({ isLoading: loadingValue });
  },
  signUp: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const { role } = formData;
      const res = await axios.post(
        `${baseURL}/api/auth/${role}/signup`,
        formData,
        {
          withCredentials: true,
        }
      );
      // console.log(res.data);

      set({
        user: res.data.data,
        isLoading: false,
      });
      return res.data.data;
    } catch (error) {
      console.log(error.response.data.errors);
      const message = error?.response?.data?.errors[0] || "Unknown Error!!";
      set({ error: message, isLoading: false });
    }
  },
  logIn: async (formData) => {
    if (!formData.email || !formData.password) {
      return set({ error: "All fields are required!!" });
    }
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${baseURL}/api/auth/login`, formData, {
        withCredentials: true,
      });

      console.log(res);

      set({ user: res.data.data, isLoading: false });
      return res.data.data;
    } catch (error) {
      console.log("came here instead", error);
      const message = error?.response?.data?.error || "Unknown Error!!";
      set({ error: message, isLoading: false });
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
    // set({ error: null });
    try {
      const res = await axios.get(`${baseURL}/api/auth/me`, {
        withCredentials: true,
      });
      set({ user: res.data?.data, isLoading: false });
      return res.data?.data;
    } catch (error) {
      console.log(error.response);
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;

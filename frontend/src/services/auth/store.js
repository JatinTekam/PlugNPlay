import { create } from "zustand";
import { login } from "./auth";

const AUTH_STORAGE_KEY = "auth_app";

const isAuthenticated = false;

const useAuth = create((set) => ({
  accessToken: null,
  user: null,
  authStatus: false,
  authLoading: false,
  login: async (loginData) => {
    console.log("Started Login.....");
    set({ authLoading: true });

    try {
      const loginResponse = await login(loginData);
      console.log("Login Response:", loginResponse);
      set({
        accessToken: loginResponse?.accessToken,
        user: loginResponse?.user,
        authStatus: true,
      });
    } catch (error) {
        console.error("Login Error in Store:", error);
        throw error;
    }
  },
  logout: (slient) => {},
}));

export default useAuth;

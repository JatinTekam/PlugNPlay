import { create } from "zustand";
import { login, logout as logoutApi } from "./auth";
import { persist } from "zustand/middleware";

const AUTH_STORAGE_KEY = "auth_app";

const useAuth = create(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,
      login: async (loginData) => {
        set({ authLoading: true });

        try {
          const loginResponse = await login(loginData);
          set({
            accessToken: loginResponse?.accessToken,
            user: loginResponse?.user,
            authStatus: true,
          });

          return loginResponse;
        } catch (error) {
          throw error;
        } finally {
          set({
            authLoading: false,
          });
        }
      },
      logout: async () => {
        try {
          set({
            authLoading: true,
          });
          await logoutApi();
        } catch (error) {
        } finally {
          set({
            authLoading: false,
          });
        }
        //await logout();
        set({
          accessToken: null,
          user: null,
          authStatus: false,
          authLoading: false,
        });
      },
      checkLogin: () => {
        if (get().accessToken && get().authStatus) {
          return true;
        } else {
          return false;
        }
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
    },
  ),
);

export default useAuth;

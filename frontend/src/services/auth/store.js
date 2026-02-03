import { create } from "zustand";
import { login, logout as logoutApi } from "./auth";
import { persist } from "zustand/middleware";
import { getTemplates } from "../user/user";

const AUTH_STORAGE_KEY = "auth_app";

const useAuth = create(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,
      snippests:[],
      codes:[],
      templates:[],

      //Login function
      login: async (loginData) => {
        set({ authLoading: true });

        try {
          const loginResponse = await login(loginData);
          set({
            accessToken: loginResponse?.accessToken,
            user: loginResponse?.user,
            snippests:loginResponse?.user.codeSnippests,
            codes:loginResponse?.user?.codeSnippests?.flatMap(snippest=>snippest.codeFiles)||[],
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

      allTemplates:async()=>{
        try{
          set({ authLoading: true });
          const templatesResponse=await getTemplates();
          set({
              templates:templatesResponse,
          });
          return templatesResponse;
        }catch(error){
          throw error;
        }finally{
          set({
            authLoading: false,
          });
        }
      },

      //Logout function
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
          snippests:[]
        });
      },

      // Check if user is logged in
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

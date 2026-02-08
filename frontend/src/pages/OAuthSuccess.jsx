import React, { useEffect, useState } from "react";
import useAuth from "../services/auth/store";
import toast from "react-hot-toast";
import { refreshToken } from "../services/user/user";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../services/user/user'

const OAuthSuccess = () => {
  const [isRefreshing, setIsRefrehing] = useState(false);
  const loginData = useAuth((state) => state.changeLocalLoginData);
  const setSnippests = useAuth((state) => state.setSnippests);
  const setUser = useAuth((state) => state.setUser);

  const navigate=useNavigate();

  useEffect(() => {
    async function getAccessToken() {
      if (!isRefreshing) {
        setIsRefrehing(true);

        try {
          const responseLoginData = await refreshToken();
          loginData(
            responseLoginData.accessToken,
            responseLoginData.user,
            true,
          );
          toast.success("Login Successfull Redirecting to Dashboard...");
          setSnippests(responseLoginData.user.codeSnippests || []);
          navigate("/profile");
          //console.log(responseLoginData?.user?.codeSnippests);
          
        } catch (error) {
          toast.error("Login Failed Please Try Again");
          navigate("/login");
          console.log(error);
          
        } finally {
          setIsRefrehing(false);
        }
      }
    }

    getAccessToken();
  }, []);


  

  return (
    <div className="p-10 flex flex-col gap-3 justify-center items-center">
      {isRefreshing && (
        <>
          <CircularProgress color="inherit" size={25} />
          <p>Processing Login...</p>
        </>
      )}
    </div>
  );
};

export default OAuthSuccess;

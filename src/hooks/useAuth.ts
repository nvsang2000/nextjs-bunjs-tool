"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getCurrentUser, login } from "../actions/auth";
import { useRouter } from "next/navigation";
import { message } from "antd";

export default function useAuth() {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await getCurrentUser();
      if (data) {
        setCurrentUser(data);
        return data;
      } else return router.push("/login");
    } catch (error: any) {
      message.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (payload: any) => {
    setLoading(true);
    try {
      const { token, mess } = await login(payload);
      if (token) {
        Cookies.set("acc", token, { expires: 30 });
        router.push("/dashboard");
      } else {
        message.error(mess);
      }
    } catch (error: any) {
      message.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    Cookies.remove("acc");
    router.refresh();
  };

  return {
    currentUser,
    setCurrentUser: (data: any) => {
      setCurrentUser(data);
    },
    fetchProfile,
    login: handleLogin,
    logout,
    loading,
  };
}

"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { getUserQuery } from "../schema/graphql";
import { useRouter } from "next/navigation";

// Création du contexte global
export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState({});
  const [errors, setErrors] = useState(null);
  const [token, setToken] = useState(null);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(null);

  const router = useRouter();

  const getDatas = async (token) => {
    if (!token) {
      setLoading(false);
      router.push("/");
      return;
    }
    try {
      const response = await fetch(
        "https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query: getUserQuery }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors.map((err) => err.message).join(", "));
      }

      setAllData(data);
    } catch (error) {
      setErrors(error.message);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    const encodeToBase64 = (str) => btoa(unescape(encodeURIComponent(str)));
    const hash = encodeToBase64(`${emailOrUsername}:${password}`);

    try {
      const res = await fetch("https://learn.zone01dakar.sn/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${hash}`,
        },
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      localStorage.setItem("token", data);
      setToken(data);
      await getDatas(data);
      router.push("/dashboard");
    } catch (error) {
      setErrorLogin(error.message);
      setLoading(false);
      router.push("/");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        getDatas(storedToken);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      getDatas(token);
    }
  }, [token]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!loading && (!token || !Object.keys(allData).length)) {
        router.push("/");
      }
    }
  }, [loading, token, allData]);

  const User = allData.data?.user;
  const AuditTransaction = allData.data?.transaction_audits;
  const Skills = allData.data?.transaction_skills;
  const XpTransaction = allData.data?.transaction_xp;
  const XpTotal = allData.data?.totalXp;
  const XpView = allData.data?.xp_view;
  const AuditInteractions = allData.data?.interaction;

  return (
    <GlobalContext.Provider
      value={{
        loading,
        allData,
        errors,
        token,
        emailOrUsername,
        setEmailOrUsername,
        password,
        setPassword,
        errorLogin,
        login,
        User,
        XpTransaction,
        AuditTransaction,
        Skills,
        XpTotal,
        XpView,
        AuditInteractions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

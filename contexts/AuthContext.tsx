import { getProfileService } from "@/services/auth-service";
import { createContext, useEffect, useState } from "react";

export const AuthStoreContext = createContext<any>(null);

const AuthStoreProvider = ({ children }: any) => {
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkLogin = async () => {
    try {
      const res = await getProfileService();
      if (res?.data.data.user) {
        setIsLogin(true);
        setProfile(res.data.data.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const authStoreData = {
    isLogin: isLogin,
    profile: profile,
    isLoading: isLoading,
    updateProfile: (user: any) => {
      setProfile(user);
    },
  };

  return (
    <AuthStoreContext.Provider value={authStoreData}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export default AuthStoreProvider;

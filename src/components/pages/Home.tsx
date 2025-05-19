import { useAuth } from "../../authContext/AuthContext.tsx";
import { useEffect, useState } from "react";
import SideNav from "../templates/SideNav.tsx";
import TopBar from "../templates/TopBar.tsx";
import MainArea from "../templates/MainArea.tsx";

const Home = () => {
  const auth = useAuth();
  const user = auth?.user;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [FName, setFName] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          console.log(user);
          console.log(user.uid);

          const response = await fetch(`${BACKEND_URL}/api/user/${user.uid}`);

          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }

          const data = await response.json();
          setFName(data.firstName);
          console.log("User data fetched:", data);
          console.log("First Name:", data.firstName);
          console.log(typeof FName);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <div className="flex h-svh">
      <SideNav />
      <div className="flex flex-col w-full">
        <TopBar firstName={FName} />
        <MainArea />
      </div>{" "}
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuthStore, User } from "../store/authStore";

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<User>(`/user/${user?.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>
    </div>
  );
};

export default UserProfile;

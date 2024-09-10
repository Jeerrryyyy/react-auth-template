import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { User } from "../store/authStore";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (
    userId: string,
    newRole: "ADMIN" | "USER"
  ) => {
    try {
      await axios.patch("/user/role", { id: userId, role: newRole });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Failed to change user role:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`/user/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.email} - {user.role}
          </p>
          <button
            onClick={() =>
              handleRoleChange(
                user.id,
                user.role === "ADMIN" ? "USER" : "ADMIN"
              )
            }
          >
            Change Role
          </button>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;

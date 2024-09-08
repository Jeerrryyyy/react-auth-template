import React, { useEffect } from "react";
import { useUserStore } from "../store/userStore";

const UserList: React.FC = () => {
  const { users, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} (ID: {user.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
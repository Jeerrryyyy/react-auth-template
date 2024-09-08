import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser, fetchUserById } = useUserStore();

  useEffect(() => {
    if (id) {
      fetchUserById(parseInt(id));
    }
  }, [id, fetchUserById]);

  return (
    <div>
      <h1>User Detail</h1>
      {currentUser && (
        <div>
          <p>ID: {currentUser.id}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
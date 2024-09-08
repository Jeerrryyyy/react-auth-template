import React, { useState } from "react";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

const CreateUser: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createUser = useUserStore((state) => state.createUser);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(email, password);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUser;
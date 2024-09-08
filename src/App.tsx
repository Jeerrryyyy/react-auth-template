import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import CreateUser from "./components/CreateUser";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user/create" element={<CreateUser />} />

        <Route element={<PrivateRoute />}>
          <Route path="/user/:id" element={<UserDetail />} />
        </Route>

        {/* Admin-only route */}
        <Route element={<PrivateRoute isAdminRoute />}>
          <Route path="/" element={<UserList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
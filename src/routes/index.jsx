import { Route, Routes } from "react-router-dom";
import Protected from "./protected";
import Home from "../Pages/home";
import Signin from "../Pages/signin";
import Signup from "../Pages/signup";
import Verify from "../pages/verify";
import ErrorPage from "../pages/error-page";
import Public from "./public";

const Index = () => {
  return (
      <Routes>
        <Route path="/">
          <Route element={<Protected />}>
            <Route index element={<Home />} />
          </Route>
          <Route element={<Public />}>
            <Route path="signin" element={<Signin />} />
            <Route path="verify" element={<Verify />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="error-page" element={<ErrorPage />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
  );
};

export default Index;

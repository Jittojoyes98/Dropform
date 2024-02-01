import React, { Suspense } from "react";
import { Layout } from "../_layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../LoginPage";
import HomePage from "../HomePage";
import SignupPage from "../SignupPage";
import { Authorize } from "../auth";
import { Dashboard } from "../Dashboard";
import { ForgotPassword } from "../ForgotPassword";
import { PrivateRoute } from "../_components/PrivateRoute";
import SignUpEmail from "../SignupPage/SignUpEmail";
import NewPassword from "../ForgotPassword/NewPassword";
import Editor from "../Editor/Editor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/_styles/theme.scss";
import Result from "../Results/Result";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Suspense>
        <ToastContainer />
        <Authorize>
          <Routes>
            {/* add routes here */}
            <Route path="/" element={<Layout layout="home" />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Layout layout="dashboard" />}>
                <Route index element={<Dashboard />} />
              </Route>
              <Route path="/:formid/edit" element={<Layout layout="editor" />}>
                <Route index element={<Editor />} />
              </Route>
              <Route
                path="/:formid/results"
                element={<Layout layout="results" />}
              >
                <Route index element={<Result />} />
              </Route>
            </Route>

            <Route path="/login" element={<Layout layout="login" />}>
              <Route index element={<LoginPage />} />
              <Route
                path="/login/password/request"
                element={<ForgotPassword />}
              />
              <Route path="/login/password/update" element={<NewPassword />} />
            </Route>
            <Route path="/signup" element={<Layout layout="signup" />}>
              <Route index element={<SignupPage />} />
              <Route path="/signup/email" element={<SignUpEmail />} />
            </Route>
          </Routes>
        </Authorize>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

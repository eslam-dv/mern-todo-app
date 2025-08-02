import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { login } from "../lib/api";
import ErrorMsg from "../components/ErrorMsg";
import queryClient from "../config/queryClient";
import { AUTH } from "../hooks/useAuth";
import { LoadingSpinner } from "../components/LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirectUrl = location.state?.redirectUrl || "/";

  const {
    mutate: signIn,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData([AUTH], data);
      navigate(redirectUrl, { replace: true });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ email, password });
  };

  if (isPending) return <LoadingSpinner />;

  return (
    <main>
      <div className="container mx-auto px-4 md:px-0 max-w-lg mt-5">
        <h1 className="text-3xl text-center mb-5">Sign into account</h1>
        {isError && (
          <ErrorMsg
            isError={isError}
            error={error}
            message={"Invalid email or password"}
          />
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 bg-gray-200 p-5 rounded">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email address</label>
              <input
                required
                id="email"
                type="email"
                placeholder="yow@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 py-1 px-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                required
                id="password"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-400 py-1 px-2 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded py-1 cursor-pointer hover:bg-blue-400 disabled:bg-gray-500 disabled:cursor-default"
              disabled={password.length < 6}
            >
              Sign in
            </button>
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-700">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;

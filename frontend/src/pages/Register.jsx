import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { register } from "../lib/api";
import ErrorMsg from "../components/ErrorMsg";
import { AUTH } from "../hooks/useAuth";
import queryClient from "../config/queryClient";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {
    mutate: createAccount,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.setQueryData([AUTH], data);
      navigate("/", { replace: true });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount({ email, name, password });
  };
  return (
    <main>
      <div className="container mx-auto px-4 md:px-0 max-w-lg mt-5">
        <h1 className="text-3xl text-center mb-5">Create an account</h1>
        {isError && (
          <ErrorMsg
            isError={isError}
            error={error}
            message={"Invalid Email or password"}
          />
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 bg-gray-200 p-5 rounded">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Jhon Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 py-1 px-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email address</label>
              <input
                required
                id="email"
                type="email"
                placeholder="you@example.com"
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
              Create account
            </button>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;

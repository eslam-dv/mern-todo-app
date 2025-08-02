import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { AccountCircle } from "./icons/AccountCircle";
import useAuth from "../hooks/useAuth";
import { logout } from "../lib/api";
import queryClient from "../config/queryClient";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenu(false);

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login");
    },
  });

  const { user } = useAuth();

  return (
    <header className="bg-blue-500 text-white py-3">
      <div className="container mx-auto px-5 sm:px-0 flex justify-between items-center">
        <span className="text-4xl font-bold">Todo</span>
        <nav className="flex gap-5 items-center">
          <Link to="" className="hover:underline">
            Tasks
          </Link>
          {user ? (
            <div className="flex items-center relative">
              <AccountCircle
                className="text-3xl cursor-pointer"
                onClick={() => setMenu(!menu)}
              />
              <div
                className={`flex flex-col ${menu ? "" : "hidden"} absolute top-10 right-0 bg-gray-700 py-2 rounded text-gray-200`}
              >
                <Link
                  to="/profile"
                  className="hover:bg-gray-600 px-4 py-1 hover:text-white"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <Link
                  className="hover:bg-gray-600 px-4 py-1 hover:text-white"
                  onClick={() => {
                    closeMenu();
                    signOut();
                  }}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

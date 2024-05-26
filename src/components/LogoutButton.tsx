'use client';
import React from "react";

const LogoutButton = () => {
    const logout = async () => {
        
    }
  return (
    <div 
    className="flex bg-orange-400 py-2 px-4 rounded-lg text-xl cursor-pointer"
    onClick={logout}
    >
      Logout
    </div>
  );
};

export default LogoutButton;

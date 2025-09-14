"use client";
import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // 
import Logo from "../../public/chat.webp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <div className="flex justify-between px-5 md:px-20 p-4 bg-gray-900 text-white fixed w-full z-20">
      {/* Left side logo */}
      <div className="flex items-center">
        <Link to="/" className="ml-3 text-lg font-semibold tracking-wide flex items-center gap-2">
        <img src={Logo} alt="Logo" className="w-10 h-10 hover:rotate-360 transition-transform duration-300 rounded-[50%]" />
          TripMateAI
        </Link>
      </div>

      {/* Right side nav */}
      <div className="flex items-center gap-20">
        {/* Desktop nav */}
        <div className="md:flex gap-4 hidden">
          <Link to="/" className=" hover:text-cyan-600 text-white font-semibold">Home</Link>
          <Link to="/about" className=" hover:text-cyan-600 text-white font-semibold">About</Link>
          <Link to="/contact" className=" hover:text-cyan-600 text-white font-semibold">Contact</Link>
        </div>

        {/* Auth + Dropdown */}
        <div className="flex gap-4 items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 font-semibold">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link to="/chat" className="hidden md:block py-2 px-4 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-semibold">
              Chat
            </Link>
            <UserButton />

            {/* Mobile menu (3 lines) */}
          </SignedIn>
            <div className="flex md:hidden items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex flex-col justify-between w-6 h-5 p-0"
                  >
                    <span className="block w-6 h-0.5 bg-white rounded"></span>
                    <span className="block w-6 h-0.5 bg-white rounded"></span>
                    <span className="block w-6 h-0.5 bg-white rounded"></span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-[150px] bg-black/50 backdrop-blur-md text-white font-semibold rounded-lg"
                >
                  <DropdownMenuItem asChild>
                    <Link to="/">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/about">About</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/contact">Contact</Link>
                  </DropdownMenuItem>
                  <SignedIn>
                  <DropdownMenuItem asChild>
                    <Link to="/chat">Chat</Link>
                  </DropdownMenuItem>
                  </SignedIn>
                  
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

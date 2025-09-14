"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mic, Volume2, FileUp, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import HandleAddExpense from "@/components/handleAddExpense"
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 from-[#0f1115] to-[#1a1f24] text-gray-100">
      
      {/* ====== Hero Section ====== */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-4 sm:px-6 lg:px-8 bg-[url('/hero-bg.jpg')] bg-cover bg-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Your AI Travel Companion
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-xl mb-6">
          Plan your trips smarter and faster. Ask anything about destinations, 
          itineraries, budget, local food & safety tips.
        </p>
        <Link to="/chat" className="bg-cyan-500 hover:bg-cyan-600 hover:shadow-cyan-500/50 transition px-5 py-2 rounded-lg text-white font-semibold flex items-center gap-2 ">Start Chatting <MessageCircle className="w-5 h-5" /></Link>
      </section>
        <HandleAddExpense/>

      {/* ====== Features Section ====== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Voice Input */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg flex hover:shadow-cyan-500/50 transition flex-col items-center text-center">
            <Mic className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Voice Input</h3>
            <p className="text-gray-300 text-sm">
              Speak naturally and let the AI transcribe your travel queries instantly.
            </p>
          </div>
          {/* Speaker */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-cyan-500/50 transition">
            <Volume2 className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Speaker</h3>
            <p className="text-gray-300 text-sm">
              Listen to AI responses with a toggleable text-to-speech speaker.
            </p>
          </div>
          {/* File Upload */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-cyan-500/50 transition">
            <FileUp className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">File Upload</h3>
            <p className="text-gray-300 text-sm">
              Upload documents, itineraries, or photos to share with AI for better planning.
            </p>
          </div>
          {/* Copy Messages */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-cyan-500/50 transition">
            <Copy className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Copy to Clipboard</h3>
            <p className="text-gray-300 text-sm">
              Copy AI suggestions instantly for your notes or travel apps.
            </p>
          </div>
        </div>
      </section>

      {/* ====== Chat Preview Section ====== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">Live Chat Preview</h2>
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col space-y-4">
            <div className="self-start bg-gray-700 px-4 py-2 rounded-2xl max-w-[70%]">
              <p className="text-sm">Hello! Where would you like to travel next?</p>
            </div>
            <div className="self-end bg-cyan-500 text-white px-4 py-2 rounded-2xl max-w-[70%]">
              <p className="text-sm">I want to visit Paris in spring!</p>
            </div>
            <div className="self-start bg-gray-700 px-4 py-2 rounded-2xl max-w-[70%] flex flex-col justify-between items-end">
              <p className="text-sm">Great! Here’s a 3-day itinerary for Paris...</p>
              <div className="flex space-x-2 ml-4">
                <Button size="icon" variant="ghost">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Copy className="w-4 h-4 text-cyan-400" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Footer ====== */}
      <footer className="py-12 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} TripMateAI. All rights reserved.
        <Link to="/privacypolicy" className="text-cyan-400 hover:underline">Privacy Policy</Link>
      </footer>
    </div>
  );
}

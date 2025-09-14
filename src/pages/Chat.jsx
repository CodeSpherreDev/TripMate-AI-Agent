import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import logo from "../assets/chat.webp";
import {
  Send,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Menu,
  Mic,
  FileUp,
  LogOut,
  Copy,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Chat() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [listening, setListening] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  const activeChat = chats.find((c) => c.id === activeChatId);

  // Download chat as PDF
  const handleDownloadPDF = () => {
    if (!activeChat) return;

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Chat History", pageWidth / 2, 15, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Chat Title: ${activeChat.title}`, 10, 30);
    doc.text(`Created At: ${formatDateTime(activeChat.createdAt)}`, 10, 37);

    let y = 50;
    activeChat.messages.forEach((msg) => {
      const sender = msg.sender === "user" ? "User" : "Bot";

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${sender}:`, 10, y);
      y += 6;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const splitText = doc.splitTextToSize(msg.text, pageWidth - 25);
      doc.text(splitText, 20, y);

      y += splitText.length * 6 + 8;

      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 20, pageHeight - 10);
    }

    doc.save(`chat_${activeChat.id}.pdf`);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId, chats]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good morning! 🌅");
    else if (hour >= 12 && hour < 17) setGreeting("Good afternoon! ☀️");
    else if (hour >= 17 && hour < 21) setGreeting("Good evening! 🌇");
    else setGreeting("Good night! 🌙");
  }, []);

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/health`);
      const data = (await res.ok) ? await res.json() : null;
      setBackendStatus(data?.api_ready ? "ready" : "error");
    } catch {
      setBackendStatus("error");
    }
  };

  const sendToWatson = async (msg) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Request failed");
    return (await res.json()).response;
  };

  useEffect(() => {
    if (chats.length === 0) {
      const id = Date.now().toString();
      const newChat = {
        id,
        title: "Chat",
        messages: [],
        createdAt: new Date(),
      };
      setChats([newChat]);
      setActiveChatId(id);
    }
  }, [chats]);

  const handleSend = async () => {
    if (!message.trim() || loading || !activeChatId) return;
    const id = Date.now().toString();
    const newMsg = {
      id,
      text: message.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, newMsg] }
          : chat
      )
    );
    setMessage("");
    setLoading(true);
    setError(null);

    try {
      const reply = await sendToWatson(message.trim());
      const botMsg = {
        id: id + "_bot",
        text: reply,
        sender: "bot",
        timestamp: new Date(),
      };
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, botMsg] }
            : chat
        )
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unexpected error";
      setError(msg);
      const errMsg = {
        id: id + "_err",
        text: `⚠️ ${msg}`,
        sender: "bot",
        timestamp: new Date(),
      };
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, errMsg] }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    if (!activeChatId) return;
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId ? { ...chat, messages: [] } : chat
      )
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const id = Date.now().toString();
    const fileMsg = {
      id,
      text: `📂 Uploaded file: ${file.name}`,
      sender: "user",
      timestamp: new Date(),
    };
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, fileMsg] }
          : chat
      )
    );
  };

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        if (transcript) {
          setMessage((prev) => (prev ? prev + " " + transcript : transcript));
        }
      };

      recognitionRef.current.onend = () => {
        if (listening) recognitionRef.current.start();
      };
    }
  }, [listening]);

  const handleSpeakToggle = (id, text) => {
    if (speakingId === id) {
      synthRef.current.cancel();
      setSpeakingId(null);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeakingId(null);
      synthRef.current.speak(utterance);
      setSpeakingId(id);
    }
  };

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatDateTime = (d) =>
    new Date(d).toLocaleString([], { dateStyle: "short", timeStyle: "short" });

  return (
    <div className="flex h-dvh overflow-hidden font-sans text-gray-100 bg-gradient-to-br from-[#1a1f24] via-[#12161b] to-black">

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        sm:relative sm:w-64 bg-gray-900 border-gray-700 border-r flex flex-col justify-between p-4 `}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 right-4 z-50 p-1 bg-gray-800/70 hover:bg-gray-800 rounded-full transition sm:hidden"
        >
          {isSidebarOpen ? (
            <ChevronRight className="w-5 h-5 text-white" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-white" />
          )}
        </button>
        <div>
          <div className="flex items-center pb-5">
            <Link
              to="/"
              className="text-lg font-semibold tracking-wide flex items-center gap-2"
            >
              {/* <img src="./assets/chat.webp" alt="Logo"  /> */}
              <img
                src={logo}
                alt="Logo"
                className="w-10 h-10 hover:rotate-360 transition-transform duration-300 rounded-[50%]"
              />
              TripMateAI
            </Link>
          </div>

          <p className="text-xs text-cyan-300 mb-4">{greeting}</p>

          <div className="space-y-2 mb-4 overflow-y-auto max-h-[40vh]">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-2 py-1 rounded text-xs ${
                  chat.id === activeChatId
                    ? "bg-cyan-500/20 text-cyan-300"
                    : "hover:bg-gray-700/30"
                }`}
              >
                <div className="truncate">{chat.title}</div>
                <div className="text-[10px] text-gray-400">
                  {formatDateTime(chat.createdAt)}
                </div>
              </button>
            ))}
          </div>

          {/* Backend status */}
          <div
            className={`flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              backendStatus === "ready"
                ? "bg-green-500/20 text-green-300"
                : backendStatus === "error"
                ? "bg-red-500/20 text-red-300"
                : "bg-yellow-500/20 text-yellow-300"
            }`}
          >
            <span
              className={`w-2 h-2 mr-2 rounded-full ${
                backendStatus === "ready"
                  ? "bg-green-300"
                  : backendStatus === "error"
                  ? "bg-red-300"
                  : "bg-yellow-300"
              }`}
            />
            {backendStatus === "ready"
              ? "Online"
              : backendStatus === "error"
              ? "Error"
              : "Checking"}
          </div>
        </div>

        {/* User info and logout */}
        <div>
          {user && (
            <div className="flex items-center mt-4 mb-2">
              <img
                src={user.imageUrl}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-gray-600"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-400">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          )}
          <Button
            onClick={handleDownloadPDF}
            className="cursor-pointer mt-2 flex items-center w-full justify-center gap-2 bg-cyan-600 text-white hover:bg-cyan-700 rounded-md py-2 px-3 text-sm"
          >
            ⬇️ Download PDF
          </Button>
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer mt-4 flex items-center w-full justify-center gap-2 bg-gray-800 text-gray-200 hover:bg-gray-700 rounded-md py-4 px-5 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Exit
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between p-2 sm:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-cyan-400"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-base font-semibold text-gray-100">
            TripMateAI Planner
          </h1>
          <button></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
          {activeChat?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm shadow-md ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white"
                    : "bg-gray-800 border border-gray-700 text-gray-100"
                }`}
              >
                <div className="whitespace-pre-wrap">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
                <p className="text-[10px] mt-1 font-mono opacity-50">
                  {formatTime(msg.timestamp)}
                </p>
                {msg.sender === "bot" && (
                  <div className="flex space-x-2 justify-end px-2 pb-1">
                    <Button
                      size="icon"
                      variant={speakingId === msg.id ? "default" : "ghost"}
                      onClick={() => handleSpeakToggle(msg.id, msg.text)}
                    >
                      <Volume2
                        className={`w-4 h-4 ${
                          speakingId === msg.id
                            ? "text-red-500"
                            : "text-cyan-400"
                        }`}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => navigator.clipboard.writeText(msg.text)}
                    >
                      <Copy className="w-4 h-4 text-cyan-400" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 border border-teal-500/20 px-3 py-1.5 rounded-xl flex items-center space-x-2 text-xs text-gray-300">
                <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />{" "}
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 sm:p-4 border-t border-gray-700 bg-[#101418]/90 flex items-center space-x-2 sm:space-x-3">
          <Button
            size="icon"
            variant={listening ? "default" : "outline"}
            onClick={handleVoiceToggle}
            className={`${
              listening
                ? "text-white"
                : "bg-gray-800 cursor-pointer text-gray-300"
            } rounded-md p-2`}
          >
            <Mic className={`w-4 h-4 ${listening ? "text-red-500" : ""}`} />
          </Button>

          <label className="cursor-pointer">
            <FileUp className="w-6 h-6 text-gray-300 hover:text-cyan-400" />
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={2}
            className="flex-1 resize-none rounded-md border border-gray-700 bg-gray-800 px-2 py-1 text-sm text-gray-100 placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />

          <Button
            onClick={handleSend}
            disabled={!message.trim() || loading}
            className="bg-cyan-600 hover:bg-cyan-700 rounded-md p-2"
          >
            <Send className="w-4 h-4 text-white" />
          </Button>

          <Button
            onClick={handleClearChat}
            disabled={!activeChat || activeChat.messages.length === 0}
            className="bg-red-600 hover:bg-red-700 rounded-md p-2"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </Button>
        </div>
      </main>
    </div>
  );
}

export default Chat;

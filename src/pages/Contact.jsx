import React, { useState, useRef, useEffect } from "react";

export default function Contact() {
  const [result, setResult] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "ba19d376-e6f0-49bc-be50-2a2be244dd8f");


    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully ✅");
        setSubmitted(true);
        event.target.reset();
      } else {
        setResult(data.message || "Something went wrong!");
        console.log("Error", data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("Network error. Please try again later.");
    }
  };

  const handleClear = () => {
    formRef.current.reset();
    setResult("");
  };

  const handleBack = () => {
    setSubmitted(false);
    setResult("");
  };


  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        handleBack();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-100 p-4">
        <div className="bg-gray-800 p-8 rounded-xl shadow-md text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600 mb-2">✅ Message Sent</h2>
          <p>We will get back to you soon.</p>
          <p className="text-sm text-gray-400">Returning to the form in 5 seconds...</p>
          <button
            onClick={handleBack}
            className="mt-2 py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold"
          >
            Go Back Now
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 text-gray-100 flex justify-center">
      <div className="w-full pt-10 max-w-md sm:max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-center text-gray-300 mb-6 text-sm sm:text-base">
          Have questions, suggestions, or need assistance? Reach out to us using the form below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-center">
          <div className="flex flex-col items-center gap-1">
            <span className="text-red-600 text-2xl">📍</span>
            <p className="text-sm sm:text-base">Kolkata, India</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-red-600 text-2xl">📞</span>
            <p className="text-sm sm:text-base">+91 XXXXXXXXXX</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-red-600 text-2xl">✉️</span>
            <a href="mailto:codespherre.official@gmail.com" className="text-sm sm:text-base">
              codespherre.official@gmail.com
            </a>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600"
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 resize-none"
          ></textarea>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold cursor-pointer"
            >
              Send Message
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md text-white font-semibold cursor-pointer"
            >
              Clear Form
            </button>
          </div>
        </form>
        <span className="block mt-3 text-green-500">{result}</span>
      </div>
    </main>
  );
}

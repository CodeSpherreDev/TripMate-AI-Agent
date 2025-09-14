// "use client";

// import React from "react";
// import { Users, Target, Sparkles } from "lucide-react";

// export default function About() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f1115] to-[#1a1f24] text-gray-100">
      
//       {/* ===== Hero Section ===== */}
//       <section className="text-center py-20 px-6">
//         <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
//           About Us
//         </h1>
//         <p className="text-lg max-w-2xl mx-auto text-gray-300">
//           We’re building the future of AI-powered conversations.  
//           Our mission is to make your journey easier, smarter, and more enjoyable 
//           with the help of intelligent, voice-enabled chat.
//         </p>
//       </section>

//       {/* ===== Mission & Vision ===== */}
//       <section className="py-16 px-6 bg-gray-900">
//         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
//           <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition">
//             <Target className="w-10 h-10 text-cyan-400 mb-4" />
//             <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
//             <p className="text-gray-300">
//               To empower travelers and users worldwide with an AI assistant 
//               that listens, speaks, and helps you explore the world with confidence.
//             </p>
//           </div>

//           <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition">
//             <Sparkles className="w-10 h-10 text-cyan-400 mb-4" />
//             <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
//             <p className="text-gray-300">
//               We imagine a world where planning, learning, and exploring 
//               is as natural as talking to a friend — powered by AI, accessible to all.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ===== Team Section ===== */}
//       <section className="py-20 px-6">
//         <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {/* Team Member 1 */}
//           <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-cyan-500/20 transition">
//             <img
//               src="/team1.jpg"
//               alt="Team Member"
//               className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-cyan-400"
//             />
//             <h3 className="text-lg font-semibold">Avijit Dey</h3>
//             <p className="text-sm text-gray-400">Founder & Developer</p>
//           </div>

//           {/* Team Member 2 */}
//           <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-cyan-500/20 transition">
//             <img
//               src="/team2.jpg"
//               alt="Team Member"
//               className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-cyan-400"
//             />
//             <h3 className="text-lg font-semibold">Priya Sharma</h3>
//             <p className="text-sm text-gray-400">UI/UX Designer</p>
//           </div>

//           {/* Team Member 3 */}
//           <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-cyan-500/20 transition">
//             <img
//               src="/team3.jpg"
//               alt="Team Member"
//               className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-cyan-400"
//             />
//             <h3 className="text-lg font-semibold">Rahul Verma</h3>
//             <p className="text-sm text-gray-400">AI Researcher</p>
//           </div>
//         </div>
//       </section>

//       {/* ===== Footer ===== */}
//       <footer className="py-12 text-center text-gray-400 text-sm border-t border-gray-700">
//         <div className="flex justify-center items-center space-x-2 mb-2">
//           <Users className="w-4 h-4 text-cyan-400" />
//           <p>We’re here to make your AI journey seamless</p>
//         </div>
//         &copy; {new Date().getFullYear()} AI Travel Companion. All rights reserved.
//       </footer>
//     </div>
//   );
// }



import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-15">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-400">
            ✈️ About <span className="text-teal-400">TripMateAI</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Your AI-Powered Travel Planning Companion
          </p>
        </header>

        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
            🌍 Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            At TripMateAI, we believe that travel planning should be effortless,
            personalized, and enjoyable. Our mission is to empower travelers
            with AI technology that delivers professional, detailed, and
            customized travel itineraries in seconds.
          </p>
        </section>

        {/* Technology */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-6">
            🤖 Our Technology
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            TripMateAI leverages advanced artificial intelligence trained on
            comprehensive travel data and powered by IBM Cloud services. Our
            system analyzes your preferences, budget, and interests to create
            optimized travel plans that include:
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-cyan-500/30 transition">
              <h3 className="text-lg font-semibold mb-2">
                🗓️ Detailed Itineraries
              </h3>
              <p className="text-gray-400">
                Day-by-day plans tailored to your trip duration
              </p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-cyan-500/30 transition">
              <h3 className="text-lg font-semibold mb-2">💰 Budget Planning</h3>
              <p className="text-gray-400">
                Comprehensive cost breakdowns for your entire trip
              </p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-cyan-500/30 transition">
              <h3 className="text-lg font-semibold mb-2">🍽️ Local Experiences</h3>
              <p className="text-gray-400">
                Authentic dining and cultural recommendations
              </p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-cyan-500/30 transition">
              <h3 className="text-lg font-semibold mb-2">🎒 Travel Tips</h3>
              <p className="text-gray-400">
                Packing advice and safety recommendations
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
            👥 Our Team
          </h2>
          <p className="text-gray-300 leading-relaxed">
            TripMateAI was created by a diverse team of travel enthusiasts, AI
            experts, and software developers who share a passion for making
            travel accessible and enjoyable for everyone. Our combined expertise
            in technology and travel ensures that you receive the most reliable
            and up-to-date recommendations.
          </p>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-6">
            💫 Our Values
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-cyan-500/30 transition">
              <h3 className="text-lg font-semibold mb-2">✨ Personalization</h3>
              <p className="text-gray-400">
                Every trip should reflect your unique preferences.
              </p>
            </div>
            <div className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-cyan-500/30 transition">
              <h3 className="text-lg font-semibold mb-2">🔒 Reliability</h3>
              <p className="text-gray-400">
                Recommendations based on updated and trusted data.
              </p>
            </div>
            <div className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-cyan-500/30 transition">
              <h3 className="text-lg font-semibold mb-2">🚀 Innovation</h3>
              <p className="text-gray-400">
                Smarter, intuitive AI for better travel planning.
              </p>
            </div>
            <div className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-cyan-500/30 transition">
              <h3 className="text-lg font-semibold mb-2">🌐 Accessibility</h3>
              <p className="text-gray-400">
                Travel planning made easy for everyone.
              </p>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="text-center mt-12 border-t border-gray-700 pt-6 text-gray-400">
          <p>✈️ Happy travels with TripMateAI! 🌍</p>
        </footer>
      </div>
    </div>
  );
};

export default About;

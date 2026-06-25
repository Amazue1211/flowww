import React, { useState, useContext } from "react";
import axios from "axios";
import Sidebar from "../component/SideBar";
import { AppContent } from "../context/AppContext";

const quickPrompts = [
  {
    title: "Build a monthly budget",
    prompt:
      "Help me create a monthly budget with 50% needs, 30% wants, and 20% savings.",
  },
  {
    title: "Save faster",
    prompt: "Give me 3 quick saving tips to reach my goals faster.",
  },
  {
    title: "Reduce spending",
    prompt: "How can I cut discretionary expenses this month?",
  },
  {
    title: "Track subscriptions",
    prompt: "Help me identify subscriptions I can cancel.",
  },
];

const initialMessages = [
  {
    role: "assistant",
    text: "Hi there! I'm your finance AI assistant. Ask me about budgeting, savings, expense reduction, or financial goals.",
  },
];

const Ai = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const [messages, setMessages] = useState(initialMessages);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (question) => {
    if (!question.trim()) return;

    const entry = question.trim();
    setMessages((prev) => [...prev, { role: "user", text: entry }]);
    setPrompt("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/openai/chat`,
        { prompt: entry },
        { headers: { "Content-Type": "application/json" } },
      );

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.answer },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: data.message || "Unable to generate a response right now.",
          },
        ]);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to connect to the AI service.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Error: ${message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAsk(prompt);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen w-[1000vw] p-6 bg-gradient-to-br from-indigo-50 to-white">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            {userData?.name
              ? `Welcome back, ${userData.name}.`
              : "Ask your AI assistant for budgeting, savings, or spending guidance."}
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr] mb-6">
          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-6 shadow-lg border border-white/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Chat with your finance coach
                  </h2>
                  <p className="text-sm text-gray-500">
                    Send a question and get a smart, practical response
                    instantly.
                  </p>
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
                  Quick advice
                </span>
              </div>

              <div className="space-y-4">
                <div className="max-h-[420px] overflow-y-auto rounded-3xl border border-gray-200 p-4 bg-slate-50">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[90%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                          message.role === "user"
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-800"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <textarea
                    rows="4"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask something like: 'How can I save more this month?'"
                    className="w-full resize-none rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-500">
                      Tip: ask about planning, saving, debt, or subscriptions.
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                      disabled={loading || !prompt.trim()}
                    >
                      {loading ? "Thinking..." : "Ask AI"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {quickPrompts.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleAsk(item.prompt)}
                  className="rounded-3xl border border-gray-200 bg-white p-5 text-left transition hover:border-indigo-300 hover:shadow-md"
                >
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.prompt}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-6 shadow-lg border border-white/80">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                AI Assistant Benefits
              </h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• Get instant guidance for budget planning and savings.</li>
                <li>
                  • Discover ways to reduce monthly expenses and subscriptions.
                </li>
                <li>• Break down goals into easy weekly actions.</li>
                <li>
                  • Learn smarter financial habits with simple suggestions.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 p-6 text-white shadow-lg">
              <h3 className="text-xl font-semibold mb-3">
                Ready for better money decisions?
              </h3>
              <p className="text-sm leading-6">
                Use this assistant to plan your budget, track what matters, and
                stay on top of spending without feeling overwhelmed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;

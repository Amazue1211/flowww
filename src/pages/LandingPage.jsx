import { useState } from "react";
import { Link } from "react-router-dom";
import Loginpage from "./Loginpage";
// Interactive Savings Calculator (internal component)
const SavingsCalculator = () => {
  const [principal, setPrincipal] = useState(5000);
  const [monthlyAdd, setMonthlyAdd] = useState(200);
  const [rate, setRate] = useState(5.5);
  const [years, setYears] = useState(5);

  const calculateFuture = () => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    let future = principal;
    for (let i = 0; i < months; i++) {
      future += monthlyAdd;
      future *= 1 + monthlyRate;
    }
    return future.toFixed(2);
  };

  const totalInvested = (principal + monthlyAdd * years * 12).toFixed(2);
  const futureValue = calculateFuture();
  const estimatedGain = (futureValue - totalInvested).toFixed(2);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 transition-all hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center text-indigo-600 text-xl">
          📈
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Savings Simulator</h3>
          <p className="text-gray-500 text-sm">
            Project your growth with AI forecasts
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700">
            <span>Initial amount ($)</span>
            <span className="text-indigo-600 font-semibold">
              ${principal.toLocaleString()}
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="100000"
            step="500"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>$0</span>
            <span>$100k</span>
          </div>
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700">
            <span>Monthly contribution</span>
            <span className="text-indigo-600 font-semibold">${monthlyAdd}</span>
          </label>
          <input
            type="range"
            min="0"
            max="5000"
            step="50"
            value={monthlyAdd}
            onChange={(e) => setMonthlyAdd(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg accent-indigo-600"
          />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700">
            <span>Annual interest rate (%)</span>
            <span className="text-indigo-600 font-semibold">{rate}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="15"
            step="0.2"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg accent-indigo-600"
          />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700">
            <span>Time horizon (years)</span>
            <span className="text-indigo-600 font-semibold">{years} yrs</span>
          </label>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg accent-indigo-600"
          />
        </div>

        <div className="mt-6 pt-4 border-t border-dashed border-gray-200 grid grid-cols-2 gap-4">
          <div className="bg-indigo-50/60 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total invested
            </p>
            <p className="text-xl font-bold text-gray-800">
              ${Number(totalInvested).toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50/60 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Est. future value
            </p>
            <p className="text-xl font-bold text-green-700">
              ${Number(futureValue).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-sm text-gray-600">
            📈 Projected gain{" "}
            <span className="font-bold text-indigo-700">
              +${Number(estimatedGain).toLocaleString()}
            </span>{" "}
            <span className="text-xs text-gray-400">(compounded monthly)</span>
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          *Hypothetical projection. Not financial advice.
        </p>
      </div>
    </div>
  );
};

// Feature Card component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 transition-all duration-300 shadow-sm hover:shadow-lg">
    <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center text-indigo-600 mb-5 text-2xl">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    <p className="text-gray-500 mt-2 leading-relaxed">{description}</p>
  </div>
);

// Main Landing Component
export default function FintechLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState(null); // 'success' | 'error' | null

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();

    if (!waitlistEmail) return;

    setWaitlistStatus("loading");

    try {
      const response = await fetch("http://localhost:5000/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setWaitlistStatus("success");
        setWaitlistEmail("");
      } else {
        throw new Error(data.message || "Failed to subscribe");
      }
    } catch (error) {
      console.error("Waitlist Error:", error);
      setWaitlistStatus("error");
    }

    setTimeout(() => setWaitlistStatus(null), 3000);
  };

  return (
    <div className="overflow-x-hidden font-sans antialiased text-gray-800 bg-[#fbfdfe]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex justify-between items-center py-4 md:py-5">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-700 text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-md text-lg">
                ⚡
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">
                Fin<span className="text-indigo-600">Lumen</span>
              </span>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
              <a href="#" className="hover:text-indigo-600 transition">
                Product
              </a>
              <a href="#" className="hover:text-indigo-600 transition">
                Pricing
              </a>
              <a href="#" className="hover:text-indigo-600 transition">
                Company
              </a>
              <a href="#" className="hover:text-indigo-600 transition">
                Resources
              </a>
              <button className="bg-indigo-600 cursor-pointer text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:bg-indigo-700 transition-all">
                <Link to="/loginpage">Login</Link>
              </button>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden text-gray-700 text-2xl focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden pb-5 flex flex-col space-y-4 text-gray-700 font-medium">
              <a href="#" className="hover:text-indigo-600 py-1">
                Product
              </a>
              <a href="#" className="hover:text-indigo-600 py-1">
                Pricing
              </a>
              <a href="#" className="hover:text-indigo-600 py-1">
                Company
              </a>
              <a href="#" className="hover:text-indigo-600 py-1">
                Resources
              </a>
              <a href="/loginPage">sign in </a>

              {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-full w-fit text-sm">

              </button> */}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 md:px-12 py-16 md:py-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-100/20 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6">
            🤖 <span>AI-powered finance · 2025 edition</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Bank smarter,
            <br />{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              invest with intelligence
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-6">
            Seamless payments, AI-driven insights, and wealth automation — all
            in one sleek fintech ecosystem. Zero hidden fees, real-time
            analytics.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-gray-800 transition flex items-center gap-2">
              App Store
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold shadow-sm hover:shadow-md transition flex items-center gap-2">
              📱 Google Play
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">✅ FDIC-insured</div>
            <div className="flex items-center gap-2">🛡️ 256-bit encryption</div>
            <div className="flex items-center gap-2">🌍 150+ countries</div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-6 border-y border-gray-100 bg-white/40">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-indigo-700">$2.8B+</span>
          <span className="text-gray-500">Total transaction volume</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-indigo-700">120k+</span>
          <span className="text-gray-500">Active members</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-indigo-700">4.92⭐</span>
          <span className="text-gray-500">App store rating</span>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything you need to master your money
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            Intelligent automation, real-time dashboards, and
            institutional-grade tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="🧠"
            title="AI Financial Coach"
            description="Get personalized saving tips, spending forecasts, and investment recommendations powered by machine learning."
          />
          <FeatureCard
            icon="⚡"
            title="Instant payments"
            description="Send and receive money in seconds with zero transfer fees. Real-time global settlements."
          />
          <FeatureCard
            icon="📊"
            title="Smart Portfolios"
            description="Automated, tax-efficient portfolios tailored to your goals. Rebalance dynamically."
          />
          <FeatureCard
            icon="🔒"
            title="Bank-grade security"
            description="Biometric login, hardware security keys, and real-time fraud monitoring."
          />
          <FeatureCard
            icon="💳"
            title="Virtual cards"
            description="Create disposable virtual cards for subscriptions & online shopping with spending limits."
          />
          <FeatureCard
            icon="📈"
            title="Wealth analytics"
            description="Track net worth, visualize cash flow, and plan for retirement with interactive tools."
          />
        </div>
      </div>

      {/* Calculator + Callout */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-xs font-semibold tracking-wide mb-4">
              📊 interactive tool
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Visualize your financial growth
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Adjust initial deposit, monthly savings, and expected returns. See
              exactly how compounding works — plus AI-enhanced projections based
              on market trends.
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-indigo-500 text-sm">✔️</span> Real-time
                compound interest simulation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-500 text-sm">✔️</span> Compare with
                historical S&P performance
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-500 text-sm">✔️</span> Export
                insights to PDF / share with advisor
              </li>
            </ul>
          </div>
          <div className="transform transition hover:scale-[1.01]">
            <SavingsCalculator />
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-indigo-50 to-white rounded-3xl p-8 md:p-12 shadow-md border border-indigo-100/40">
          <div className="text-indigo-300 text-4xl opacity-60 mb-4">“</div>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
            “FinFlow completely changed how I handle my finances. The AI coach
            helped me cut unnecessary spending and I've already saved 23% more
            this year. It's like a financial superpower.”
          </p>
          <div className="flex items-center gap-4 mt-8">
            <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold text-lg">
              JD
            </div>
            <div>
              <p className="font-bold text-gray-800">Jessica Delgado</p>
              <p className="text-sm text-gray-500">
                Verified user · early adopter
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-elevated p-8 md:p-12 border border-indigo-100/60">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                ⏳ <span>Limited early access</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Join the future of smart finance
              </h2>
              <p className="text-gray-600 mt-4 text-lg">
                Be the first to experience AI-driven insights, zero-fee
                investing, and seamless payments. Get priority access +
                exclusive launch rewards.
              </p>
              <form
                onSubmit={handleWaitlistSubmit}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-5 py-3 rounded-xl border border-gray-200 bg-white/90 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  ✉️ Secure my spot
                </button>
              </form>
              {waitlistStatus === "success" && (
                <div className="mt-5 text-green-700 bg-green-50 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium">
                  ✓ Thanks! We'll be in touch soon.
                </div>
              )}
              {waitlistStatus === "error" && (
                <div className="mt-5 text-red-600 bg-red-50 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium">
                  ⚠️ Please enter a valid email address.
                </div>
              )}
              <p className="text-xs text-gray-400 mt-6">
                No spam, unsubscribe anytime. 🔒 256-bit encrypted data
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-700 w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs">
                ⚡
              </div>
              <span className="font-bold text-xl text-gray-800">Finflow</span>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              Democratizing intelligent finance for the next generation.
            </p>
            <div className="flex gap-4 mt-5 text-gray-500 text-xl">
              <span className="hover:text-indigo-600 cursor-pointer">🐦</span>
              <span className="hover:text-indigo-600 cursor-pointer">🔗</span>
              <span className="hover:text-indigo-600 cursor-pointer">🐙</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>Features</li>
              <li>Pricing</li>
              <li>API</li>
              <li>Security</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>Help center</li>
              <li>Contact</li>
              <li>Legal</li>
              <li>Privacy</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-12 pt-6 text-center text-sm text-gray-400">
          © 2025 FinLumen Inc. All rights reserved. The future of finance is
          open.
        </div>
      </footer>
    </div>
  );
}

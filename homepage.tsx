import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import {
  Activity, Home, User, LogOut, HeartPulse, Stethoscope, MapPin, Zap,
  ArrowRight, Shield, Bot, Ambulance, Heart, Bell, Calendar, Cpu, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: Bot, label: "AI Health Chatbot", desc: "Ask any health question — powered by real AI",
    href: "/chatbot", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", badge: "AI",
  },
  {
    icon: Ambulance, label: "Ambulance Tracker", desc: "Track nearby ambulances with live ETA",
    href: "/ambulance", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", badge: "Live",
  },
  {
    icon: Heart, label: "Health Monitor", desc: "Real-time heart rate, SpO2 & vitals alerts",
    href: "/health-monitor", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", badge: null,
  },
  {
    icon: HeartPulse, label: "Symptom Checker", desc: "AI-powered symptom analysis (EN & Hindi)",
    href: "/checker", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", badge: null,
  },
  {
    icon: Bell, label: "Routine Reminders", desc: "Water, sleep, walk — set daily alarms",
    href: "/reminders", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", badge: null,
  },
  {
    icon: Calendar, label: "Daily Schedule", desc: "Track and complete your health tasks",
    href: "/schedule", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", badge: null,
  },
  {
    icon: Stethoscope, label: "Doctor Portal", desc: "Doctor login, dashboard & health posts",
    href: "/doctor", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", badge: "Doctors",
  },
  {
    icon: Shield, label: "Emergency SOS", desc: "One-tap emergency call — Ambulance 108",
    href: "/ambulance", color: "text-red-500", bg: "bg-red-600/10", border: "border-red-600/20", badge: "SOS",
  },
];

const healthStats = [
  { label: "Health Score", value: "87/100", sub: "Good", color: "text-green-400" },
  { label: "Last Check", value: "Today", sub: "Up to date", color: "text-blue-400" },
  { label: "Active Tasks", value: "6", sub: "This week", color: "text-primary" },
];

export default function HomePage() {
  const [, navigate] = useLocation();
  const { user, logout, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/8 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 glass-card border-b border-primary/20 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center neon-box">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-foreground dark:neon-text hidden sm:block">Smart Health System</span>
          </div>

          <div className="flex items-center space-x-1 md:space-x-2">
            <NavBtn icon={Home} label="Home" active onClick={() => navigate("/home")} />
            <NavBtn icon={User} label="Profile" onClick={() => navigate("/profile")} />
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-all text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center space-x-4 mb-8">
            <img
              src={user.avatar} alt={user.name}
              className="w-16 h-16 rounded-2xl border-2 border-primary/40 neon-box object-cover"
            />
            <div>
              <p className="text-muted-foreground text-sm font-medium">Good day,</p>
              <h1 className="text-2xl md:text-3xl font-black text-foreground dark:neon-text">{user.name} 👋</h1>
              <p className="text-primary text-sm font-medium flex items-center space-x-1 mt-0.5">
                <Zap className="w-3 h-3" />
                <span>AI-powered smart health system</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Health Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
          className="glass-card rounded-3xl border border-primary/25 neon-box p-6 mb-8"
        >
          <h2 className="text-base font-bold text-foreground mb-4 flex items-center space-x-2">
            <HeartPulse className="w-5 h-5 text-primary" />
            <span>Your Health Overview</span>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {healthStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className={`text-2xl md:text-3xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                <div className={`text-xs font-semibold ${s.color} mt-0.5`}>{s.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">All Features</h2>
            <span className="text-xs text-muted-foreground bg-muted/30 border border-border/30 px-3 py-1 rounded-full">
              {FEATURES.length} tools available
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
            {FEATURES.map((f, i) => (
              <motion.button
                key={f.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.15 }}
                onClick={() => navigate(f.href)}
                className={`glass-card p-4 rounded-2xl border ${f.border} text-left group card-hover hover:border-opacity-70 w-full relative`}
              >
                {f.badge && (
                  <span className={`absolute top-3 right-3 text-xs px-1.5 py-0.5 rounded-full font-bold ${f.bg} ${f.color} border ${f.border}`}>
                    {f.badge}
                  </span>
                )}
                <div className={`w-10 h-10 ${f.bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-bold text-sm text-foreground">{f.label}</h3>
                <p className="text-muted-foreground text-xs mt-1 leading-snug">{f.desc}</p>
                <ChevronRight className={`w-4 h-4 ${f.color} opacity-0 group-hover:opacity-100 mt-2 transition-all group-hover:translate-x-0.5`} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass-card rounded-3xl border border-red-500/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <Ambulance className="w-7 h-7 text-red-400" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Emergency? We're Here</h3>
              <p className="text-muted-foreground text-sm">Track live ambulances, get instant ETA, one-tap SOS call to 108</p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => navigate("/ambulance")}
              className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all flex items-center gap-2"
            >
              <Ambulance className="w-4 h-4" /> Track Ambulance
            </button>
            <a href="tel:108" className="px-5 py-2.5 rounded-xl border border-red-500/40 text-red-400 font-bold text-sm hover:bg-red-500/10 transition-colors">
              Call 108
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function NavBtn({ icon: Icon, label, onClick, active }: { icon: any; label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
        active ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

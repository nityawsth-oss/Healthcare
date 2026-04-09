import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  Stethoscope,
  LogIn,
  LogOut,
  Plus,
  Heart,
  Users,
  FileText,
  Activity,
  Clock,
  Trash2,
  Eye,
  Star,
} from "lucide-react";

const DOCTOR_CREDENTIALS = [
  {
    email: "dr.sharma@hospital.com",
    password: "doctor123",
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    patients: 142,
    avatar: "PS",
  },
  {
    email: "dr.kumar@hospital.com",
    password: "doctor123",
    name: "Dr. Rajesh Kumar",
    specialty: "General Physician",
    patients: 98,
    avatar: "RK",
  },
  {
    email: "dr.patel@hospital.com",
    password: "doctor123",
    name: "Dr. Anita Patel",
    specialty: "Neurologist",
    patients: 67,
    avatar: "AP",
  },
];

interface HealthPost {
  id: string;
  doctorName: string;
  specialty: string;
  avatar: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  views: number;
  time: string;
  liked: boolean;
}

const INITIAL_POSTS: HealthPost[] = [
  {
    id: "1",
    doctorName: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    avatar: "PS",
    title: "5 Heart-Healthy Habits for 2025",
    content:
      "Maintaining a healthy heart requires daily commitment. Start with 30 minutes of brisk walking, reduce sodium intake to less than 1500mg/day, practice deep breathing for 10 minutes, and limit processed foods. Regular checkups every 6 months are essential.",
    tags: ["Heart Health", "Cardiology", "Wellness"],
    likes: 48,
    views: 312,
    time: "2 hours ago",
    liked: false,
  },
  {
    id: "2",
    doctorName: "Dr. Rajesh Kumar",
    specialty: "General Physician",
    avatar: "RK",
    title: "Signs You Should See a Doctor Immediately",
    content:
      "Never ignore: sudden chest pain, difficulty breathing, severe headache, sudden vision changes, or weakness on one side of body. These could be signs of heart attack or stroke. Call 108 immediately if any of these occur.",
    tags: ["Emergency", "Prevention", "General Health"],
    likes: 92,
    views: 547,
    time: "5 hours ago",
    liked: false,
  },
  {
    id: "3",
    doctorName: "Dr. Anita Patel",
    specialty: "Neurologist",
    avatar: "AP",
    title: "Managing Migraine: Triggers & Relief",
    content:
      "Common migraine triggers include stress, dehydration, skipped meals, and screen time. Keep a headache diary, stay hydrated with 2–3L water daily, maintain regular sleep schedules, and limit caffeine. Consult a neurologist if migraines occur more than 4 times/month.",
    tags: ["Neurology", "Migraine", "Pain Management"],
    likes: 35,
    views: 189,
    time: "Yesterday",
    liked: false,
  },
];

const STORAGE_POSTS_KEY = "shc_doctor_posts";

export default function DoctorPage() {
  const [doctorUser, setDoctorUser] = useState<
    (typeof DOCTOR_CREDENTIALS)[0] | null
  >(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [posts, setPosts] = useState<HealthPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_POSTS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });
  const [showPostForm, setShowPostForm] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTags, setPostTags] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "posts">(
    "dashboard",
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
  }, [posts]);

  const handleLogin = () => {
    const doc = DOCTOR_CREDENTIALS.find(
      (d) => d.email === email && d.password === password,
    );
    if (doc) {
      setDoctorUser(doc);
      setLoginError("");
    } else {
      setLoginError(
        "Invalid credentials. Try: dr.sharma@hospital.com / doctor123",
      );
    }
  };

  const handleLogout = () => {
    setDoctorUser(null);
    setEmail("");
    setPassword("");
  };

  const addPost = () => {
    if (!postTitle.trim() || !postContent.trim() || !doctorUser) return;
    const newPost: HealthPost = {
      id: Date.now().toString(),
      doctorName: doctorUser.name,
      specialty: doctorUser.specialty,
      avatar: doctorUser.avatar,
      title: postTitle.trim(),
      content: postContent.trim(),
      tags: postTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      likes: 0,
      views: 0,
      time: "Just now",
      liked: false,
    };
    setPosts((p) => [newPost, ...p]);
    setPostTitle("");
    setPostContent("");
    setPostTags("");
    setShowPostForm(false);
  };

  const likePost = (id: string) => {
    setPosts((p) =>
      p.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const deletePost = (id: string) => {
    if (!doctorUser) return;
    setPosts((p) =>
      p.filter(
        (post) => !(post.id === id && post.doctorName === doctorUser.name),
      ),
    );
  };

  if (!doctorUser) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border/30 px-4 py-3 flex items-center gap-4 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <Link href="/home">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-blue-400" />
            </div>
            <span className="font-bold">Doctor Portal</span>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl border border-blue-500/30 p-8 w-full max-w-md"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-2xl font-black text-foreground">
                Doctor Login
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Smart Health System — Medical Portal
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Doctor Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dr.sharma@hospital.com"
                  className="w-full mt-1.5 bg-card border border-border/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/60"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full mt-1.5 bg-card border border-border/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/60"
                />
              </div>

              {loginError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3"
                >
                  {loginError}
                </motion.p>
              )}

              <button
                onClick={handleLogin}
                className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Login to Doctor Portal
              </button>
            </div>

            <div className="mt-6 p-4 bg-muted/20 rounded-xl border border-border/30">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Demo Accounts:
              </p>
              {DOCTOR_CREDENTIALS.map((d) => (
                <button
                  key={d.email}
                  onClick={() => {
                    setEmail(d.email);
                    setPassword(d.password);
                  }}
                  className="w-full text-left text-xs text-muted-foreground hover:text-foreground py-1 transition-colors"
                >
                  <span className="text-blue-400">{d.name}</span> — {d.email}
                </button>
              ))}
              <p className="text-xs text-muted-foreground mt-1">
                Password: <span className="text-primary">doctor123</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/30 px-4 py-3 flex items-center gap-4 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/home">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-black">
            {doctorUser.avatar}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">
              {doctorUser.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {doctorUser.specialty}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="ml-auto flex items-center gap-1.5 text-xs text-red-400 hover:bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Logout
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "dashboard", label: "Dashboard", icon: Activity },
            { id: "posts", label: "Health Posts", icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "dashboard" | "posts")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-blue-500/20 border border-blue-500/40 text-blue-400"
                  : "bg-muted/20 border border-border/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: Users,
                    label: "My Patients",
                    value: doctorUser.patients,
                    color: "text-blue-400",
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/20",
                  },
                  {
                    icon: FileText,
                    label: "Posts Published",
                    value: posts.filter((p) => p.doctorName === doctorUser.name)
                      .length,
                    color: "text-green-400",
                    bg: "bg-green-500/10",
                    border: "border-green-500/20",
                  },
                  {
                    icon: Heart,
                    label: "Total Likes",
                    value: posts
                      .filter((p) => p.doctorName === doctorUser.name)
                      .reduce((s, p) => s + p.likes, 0),
                    color: "text-red-400",
                    bg: "bg-red-500/10",
                    border: "border-red-500/20",
                  },
                  {
                    icon: Eye,
                    label: "Total Views",
                    value: posts
                      .filter((p) => p.doctorName === doctorUser.name)
                      .reduce((s, p) => s + p.views, 0),
                    color: "text-purple-400",
                    bg: "bg-purple-500/10",
                    border: "border-purple-500/20",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`glass-card rounded-xl border ${s.border} p-4 text-center`}
                  >
                    <div
                      className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}
                    >
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                    </div>
                    <p className={`text-2xl font-black ${s.color}`}>
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick Schedule */}
              <div className="glass-card rounded-2xl border border-border/40 p-5">
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" /> Today's Schedule
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      time: "09:00",
                      patient: "Rahul Verma",
                      type: "Consultation",
                      status: "done",
                    },
                    {
                      time: "10:30",
                      patient: "Priya Singh",
                      type: "Follow-up",
                      status: "done",
                    },
                    {
                      time: "12:00",
                      patient: "Amit Sharma",
                      type: "Check-up",
                      status: "ongoing",
                    },
                    {
                      time: "14:00",
                      patient: "Neha Gupta",
                      type: "New Patient",
                      status: "upcoming",
                    },
                    {
                      time: "15:30",
                      patient: "Vikram Joshi",
                      type: "Lab Review",
                      status: "upcoming",
                    },
                  ].map((appt) => (
                    <div
                      key={appt.time}
                      className="flex items-center gap-4 p-3 rounded-xl bg-muted/20 border border-border/30"
                    >
                      <div className="text-xs font-bold text-muted-foreground w-12">
                        {appt.time}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{appt.patient}</p>
                        <p className="text-xs text-muted-foreground">
                          {appt.type}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          appt.status === "done"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : appt.status === "ongoing"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse"
                              : "bg-muted/30 text-muted-foreground border border-border/30"
                        }`}
                      >
                        {appt.status === "done"
                          ? "Done"
                          : appt.status === "ongoing"
                            ? "In Session"
                            : "Upcoming"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "posts" && (
            <motion.div
              key="posts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Add Post */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowPostForm(!showPostForm)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-bold transition-all"
                >
                  <Plus className="w-4 h-4" /> Publish Health Post
                </button>
              </div>

              <AnimatePresence>
                {showPostForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="glass-card rounded-2xl border border-blue-500/30 p-5 overflow-hidden"
                  >
                    <h3 className="font-bold text-sm mb-4">New Health Post</h3>
                    <input
                      type="text"
                      placeholder="Post title…"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="w-full mb-3 bg-card border border-border/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/60 text-foreground placeholder:text-muted-foreground"
                    />
                    <textarea
                      placeholder="Write health tips, advice, or information…"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      rows={4}
                      className="w-full mb-3 bg-card border border-border/40 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-blue-500/60 text-foreground placeholder:text-muted-foreground"
                    />
                    <input
                      type="text"
                      placeholder="Tags (comma separated): Heart Health, Wellness…"
                      value={postTags}
                      onChange={(e) => setPostTags(e.target.value)}
                      className="w-full mb-4 bg-card border border-border/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/60 text-foreground placeholder:text-muted-foreground"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={addPost}
                        className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-bold transition-colors"
                      >
                        Publish Post
                      </button>
                      <button
                        onClick={() => setShowPostForm(false)}
                        className="px-4 bg-muted/30 rounded-xl text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Post List */}
              <div className="space-y-4">
                {posts.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card rounded-2xl border border-border/40 p-5"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                          {post.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            {post.doctorName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {post.specialty} · {post.time}
                          </p>
                        </div>
                      </div>
                      {doctorUser.name === post.doctorName && (
                        <button
                          onClick={() => deletePost(post.id)}
                          className="p-1.5 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <h4 className="font-bold text-base mb-2">{post.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {post.content}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border/30 pt-3">
                      <button
                        onClick={() => likePost(post.id)}
                        className={`flex items-center gap-1.5 transition-colors ${post.liked ? "text-red-400" : "hover:text-red-400"}`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${post.liked ? "fill-current" : ""}`}
                        />{" "}
                        {post.likes}
                      </button>
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> {post.views} views
                      </span>
                      <span className="flex items-center gap-1.5 ml-auto">
                        <Star className="w-3.5 h-3.5 text-amber-400" /> Featured
                        Post
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

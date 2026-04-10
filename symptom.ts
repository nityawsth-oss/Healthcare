import { useState } from "react";
import { Stethoscope, HeartPulse, ShieldAlert, CheckCircle2, UserPlus, Loader2, Sparkles, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

type Diagnosis = {
  condition: string;
  messageKey: string;
  docKey: string;
  isEmergency: boolean;
  icon: string;
};

const SYMPTOM_MAP: { keywords: string[]; hindiKeywords: string[]; diagnosis: Diagnosis }[] = [
  {
    keywords: ["chest", "chest pain", "heart"],
    hindiKeywords: ["सीने", "सीने में दर्द", "दिल"],
    diagnosis: { condition: "Chest Pain", messageKey: "chestPainResult", docKey: "docCardio", isEmergency: true, icon: "⚠️" }
  },
  {
    keywords: ["fever", "temperature", "hot"],
    hindiKeywords: ["बुखार", "ताप"],
    diagnosis: { condition: "Fever", messageKey: "feverResult", docKey: "docGeneral", isEmergency: false, icon: "🌡️" }
  },
  {
    keywords: ["cough", "coughing", "throat"],
    hindiKeywords: ["खांसी", "गला"],
    diagnosis: { condition: "Cough", messageKey: "coughResult", docKey: "docENT", isEmergency: false, icon: "😷" }
  },
  {
    keywords: ["headache", "head ache", "migraine", "head pain"],
    hindiKeywords: ["सिरदर्द", "सिर दर्द", "माइग्रेन"],
    diagnosis: { condition: "Headache", messageKey: "headacheResult", docKey: "docNeuro", isEmergency: false, icon: "🤕" }
  },
  {
    keywords: ["stomach", "stomach pain", "abdomen", "nausea", "vomit"],
    hindiKeywords: ["पेट", "पेट दर्द", "उल्टी"],
    diagnosis: { condition: "Stomach Pain", messageKey: "stomachResult", docKey: "docGastro", isEmergency: false, icon: "🤢" }
  },
  {
    keywords: ["cold", "runny nose", "sneezing"],
    hindiKeywords: ["सर्दी", "नाक बहना", "छींक"],
    diagnosis: { condition: "Cold", messageKey: "coldResult", docKey: "docGeneral", isEmergency: false, icon: "🤧" }
  },
  {
    keywords: ["fatigue", "tired", "weakness", "exhausted"],
    hindiKeywords: ["थकान", "थका", "कमजोरी"],
    diagnosis: { condition: "Fatigue", messageKey: "fatigueResult", docKey: "docGeneral", isEmergency: false, icon: "😴" }
  }
];

export function SymptomChecker() {
  const { t } = useTranslation();
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Diagnosis | null>(null);

  const analyzeSymptoms = () => {
    if (!symptoms.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const text = symptoms.toLowerCase();
      let found: Diagnosis | null = null;

      for (const entry of SYMPTOM_MAP) {
        if (
          entry.keywords.some(k => text.includes(k)) ||
          entry.hindiKeywords.some(k => text.includes(k))
        ) {
          found = entry.diagnosis;
          break;
        }
      }

      setResult(found ?? { condition: "Unknown", messageKey: "unknownResult", docKey: "docGeneral", isEmergency: false, icon: "❓" });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 mb-16 space-y-6 relative">
      {/* Main checker card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-primary/30 glass-card neon-box p-6 md:p-10"
      >
        {/* Decorative radial glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/40 neon-box">
              <Stethoscope className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:neon-text">
                {t("appTitle")}
              </h2>
              <p className="text-sm text-muted-foreground flex items-center space-x-1 mt-1">
                <Brain className="w-3.5 h-3.5 text-primary" />
                <span>AI-powered healthcare prototype for early assistance</span>
              </p>
            </div>
          </div>

          <div className="relative">
            <textarea
              className="w-full h-40 bg-background/60 border-2 border-primary/30 rounded-2xl p-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all resize-none"
              style={{ boxShadow: "inset 0 2px 8px hsl(0 0% 0% / 0.2)" }}
              placeholder={t("symptomPlaceholder")}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              disabled={isAnalyzing}
            />
            {isAnalyzing && (
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ y: ["0%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-1 bg-primary opacity-80"
                  style={{ boxShadow: "0 0 8px hsl(142 100% 50%)" }}
                />
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={analyzeSymptoms}
              disabled={isAnalyzing || !symptoms.trim()}
              className="group px-8 py-4 rounded-2xl font-bold text-lg text-primary-foreground bg-primary border border-primary/60 neon-box hover:shadow-[0_0_25px_hsl(142_100%_50%/0.7),0_0_50px_hsl(142_100%_50%/0.3)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none flex items-center space-x-3"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t("analyzing")}</span>
                </>
              ) : (
                <>
                  <HeartPulse className="w-5 h-5 group-hover:animate-pulse" />
                  <span>{t("checkButton")}</span>
                  <Sparkles className="w-4 h-4 opacity-70" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            className="space-y-5"
          >
            <div className={`rounded-3xl p-6 md:p-8 border-2 relative overflow-hidden glass-card ${
              result.isEmergency
                ? "border-destructive/60 emergency-glow"
                : "border-primary/40 neon-box"
            }`}>
              <div className="flex items-start space-x-5 relative z-10">
                <div className={`text-5xl`}>{result.icon}</div>
                <div>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
                    result.isEmergency ? "bg-destructive/20 text-destructive" : "bg-primary/15 text-primary"
                  }`}>
                    {result.isEmergency ? <ShieldAlert className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                    <span>{result.isEmergency ? "Emergency Alert" : "AI Analysis"}</span>
                  </div>
                  <p className={`text-lg md:text-xl font-semibold leading-relaxed ${result.isEmergency ? "text-destructive" : "text-foreground"}`}>
                    {t(result.messageKey)}
                  </p>
                </div>
              </div>
            </div>

            {/* Doctor suggestion */}
            <div className="glass-card rounded-3xl p-6 md:p-7 flex items-center justify-between border border-primary/25 card-hover group neon-hover">
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center neon-box group-hover:border-accent/50">
                  <UserPlus className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{t("doctorSuggestion")}</p>
                  <h4 className="text-xl font-bold text-foreground">{t(result.docKey)}</h4>
                </div>
              </div>
              <div className="text-primary text-2xl font-bold opacity-30 group-hover:opacity-60 transition-opacity">→</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

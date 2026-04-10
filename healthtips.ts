import { Droplet, Activity, Moon as Sleep, Apple, Ban, Stethoscope } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const tips = [
  { icon: Droplet, key: "tip1", color: "text-blue-400", bg: "bg-blue-500/10", glow: "hover:border-blue-400/50 hover:shadow-[0_0_20px_hsl(210_100%_60%/0.2)]" },
  { icon: Activity, key: "tip2", color: "text-green-400", bg: "bg-green-500/10", glow: "hover:border-green-400/50 hover:shadow-[0_0_20px_hsl(142_100%_50%/0.2)]" },
  { icon: Sleep, key: "tip3", color: "text-indigo-400", bg: "bg-indigo-500/10", glow: "hover:border-indigo-400/50 hover:shadow-[0_0_20px_hsl(240_100%_65%/0.2)]" },
  { icon: Apple, key: "tip4", color: "text-red-400", bg: "bg-red-500/10", glow: "hover:border-red-400/50 hover:shadow-[0_0_20px_hsl(0_100%_60%/0.2)]" },
  { icon: Ban, key: "tip5", color: "text-orange-400", bg: "bg-orange-500/10", glow: "hover:border-orange-400/50 hover:shadow-[0_0_20px_hsl(30_100%_55%/0.2)]" },
  { icon: Stethoscope, key: "tip6", color: "text-teal-400", bg: "bg-teal-500/10", glow: "hover:border-teal-400/50 hover:shadow-[0_0_20px_hsl(180_100%_40%/0.2)]" },
];

export function HealthTips() {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:neon-text mb-4">{t("healthTips")}</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={{boxShadow: "0 0 12px hsl(142 100% 50%)"}} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, i) => (
          <div key={i} className={`glass-card p-6 rounded-2xl border border-border/50 transition-all duration-300 cursor-default group hover:-translate-y-2 ${tip.glow}`}>
            <div className={`w-14 h-14 rounded-xl ${tip.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
              <tip.icon className={`w-7 h-7 ${tip.color}`} />
            </div>
            <p className="text-base font-medium text-foreground leading-relaxed">{t(tip.key)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

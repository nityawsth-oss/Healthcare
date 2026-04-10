import { AlertTriangle } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export function WarningBanner() {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-amber-500/10 border-b border-amber-500/20 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-amber-400 text-sm font-medium">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>{t("warningBanner")}</span>
      </div>
    </div>
  );
}

import { useState } from "react";
import { MapPin, Navigation, Phone, Star } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

// Mock data
const MOCK_HOSPITALS = [
  { id: 1, name: "City General Hospital", distance: "1.2 km", phone: "123-456-7890", rating: 4.5 },
  { id: 2, name: "Metro Care Center", distance: "2.5 km", phone: "098-765-4321", rating: 4.8 },
  { id: 3, name: "Sunrise Medical", distance: "3.8 km", phone: "555-123-4567", rating: 4.2 },
];

export function HospitalMap() {
  const { t } = useTranslation();
  const [locating, setLocating] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleLocate = () => {
    setLocating(true);
    // Simulate finding location
    setTimeout(() => {
      setLocating(false);
      setShowMap(true);
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-foreground flex items-center space-x-3 dark:neon-text">
            <MapPin className="w-8 h-8 text-primary" />
            <span>{t("nearbyHospitals")}</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Find the closest medical facilities for immediate care.
          </p>
        </div>
        
        <button
          onClick={handleLocate}
          disabled={locating}
          className="px-6 py-3 rounded-xl bg-secondary text-foreground font-semibold hover:bg-primary hover:text-primary-foreground transition-all flex items-center space-x-2"
        >
          <Navigation className={`w-5 h-5 ${locating ? "animate-spin" : ""}`} />
          <span>{locating ? "Locating..." : t("findHospitals")}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-3xl overflow-hidden glass-card h-[400px] relative bg-secondary/20 flex items-center justify-center">
          {showMap ? (
            <iframe 
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.1,28.5,77.3,28.7&layer=mapnik" 
              className="w-full h-full border-none opacity-80 mix-blend-luminosity dark:mix-blend-lighten"
              title="Hospital Map"
            />
          ) : (
            <div className="text-center p-8">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground font-medium">
                Click "Find Hospitals Near Me" to view map
              </p>
            </div>
          )}
          
          {showMap && (
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-primary/20 rounded-3xl" />
          )}
        </div>

        <div className="space-y-4">
          {MOCK_HOSPITALS.map((hospital) => (
            <div 
              key={hospital.id}
              className="glass-card p-5 rounded-2xl hover:-translate-y-1 hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {hospital.name}
                </h3>
                <div className="flex items-center space-x-1 text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md text-sm font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{hospital.rating}</span>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                  <Navigation className="w-4 h-4" />
                  <span>{hospital.distance} away</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4" />
                  <span>{hospital.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// src/components/home/StatsSection.tsx

import { Users, Star, Clock, Shield } from "lucide-react";
import { forwardRef } from "react";

interface StatsSectionProps {
  counts: number[];
}

const stats = [
  { number: "10,000+", label: "Applications Processed", icon: Users, image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=100&h=100&fit=crop&crop=face" },
  { number: "95%", label: "Satisfaction Rate", icon: Star, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { number: "24/7", label: "Support Available", icon: Clock, image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face" },
  { number: "100%", label: "Secure Platform", icon: Shield, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
];

const StatsSection = forwardRef<HTMLDivElement, StatsSectionProps>(({ counts }, ref) => {
  return (
    <section ref={ref} className="bg-white px-6 md:px-12 py-10 border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-200 group-hover:border-amber-400 transition-all duration-300">
                      <img src={stat.image} alt={stat.label} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1 border-2 border-white">
                      <Icon className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 font-mono">
                  {stat.number.includes('+') ? `${counts[index]}+` : 
                   stat.number.includes('%') ? `${counts[index]}%` : 
                   counts[index]}
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

StatsSection.displayName = 'StatsSection';

export default StatsSection;
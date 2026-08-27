import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Package {
  name: string;
  price: number;
  code: string;
  features: string[];
  highlight: boolean;
}

interface PackageCardProps {
  pkg: Package;
  selected: boolean;
  onSelect: (pkg: Package) => void;
}

export default function PackageCard({ pkg, selected, onSelect }: PackageCardProps) {
  return (
    <Card 
      className={`flex-1 cursor-pointer transition-all duration-300 hover:shadow-2xl shadow-md border-0 ${
        pkg.highlight 
          ? 'bg-gradient-to-br from-[#1F3A5F] to-[#14181F] text-white shadow-lg shadow-[#1F3A5F]/30' 
          : 'bg-white shadow-md hover:shadow-xl'
      } ${selected ? 'ring-2 ring-amber-500 shadow-lg shadow-amber-500/20' : ''}`}
      onClick={() => onSelect(pkg)}
    >
      <CardContent className="p-6">
        <div className={`text-xs font-mono tracking-wider mb-2 ${pkg.highlight ? 'text-blue-300' : 'text-gray-400'}`}>
          {pkg.code}
        </div>
        
        <div className={`text-xl font-semibold mb-3 ${pkg.highlight ? 'text-white' : 'text-gray-900'}`}>
          {pkg.name}
        </div>
        
        <div className="flex items-baseline gap-1 mb-5">
          <span className={`text-3xl font-bold ${pkg.highlight ? 'text-white' : 'text-gray-900'}`}>
            GHS {pkg.price}
          </span>
          <span className={`text-xs ${pkg.highlight ? 'text-blue-300' : 'text-gray-400'}`}>
            / cycle
          </span>
        </div>
        
        <div className="space-y-2.5">
          {pkg.features.map((feature, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <Check size={14} className={`mt-0.5 flex-shrink-0 ${pkg.highlight ? 'text-amber-400' : 'text-green-600'}`} />
              <span className={`text-xs leading-relaxed ${pkg.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature}
              </span>
            </div>
          ))}
        </div>
        
        <div className={`mt-6 text-center py-2.5 rounded-lg text-xs font-semibold transition-all ${
          selected 
            ? 'bg-amber-500 text-[#14181F] shadow-sm' 
            : pkg.highlight 
              ? 'border border-white/20 text-white/80 hover:bg-white/5' 
              : 'border border-gray-200 text-gray-500 hover:border-gray-300'
        }`}>
          {selected ? "✓ Selected" : "Select Package"}
        </div>
      </CardContent>
    </Card>
  );
}
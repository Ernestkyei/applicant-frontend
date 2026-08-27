import { useState } from "react";
import { 
  Copy, 
  CheckCircle2, 
  ArrowRight, 
  KeyRound
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Package {
  name: string;
  price: number;
  code: string;
  features: string[];
  highlight: boolean;
}

interface GeneratedCodeProps {
  pkg: Package;
}

export default function GeneratedCode({ pkg }: GeneratedCodeProps) {
  const [copied, setCopied] = useState(false);
  const accessCode = "482910";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Card className="max-w-xl mx-auto border-0 shadow-xl shadow-gray-200/50 overflow-hidden">
      <CardContent className="p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5 shadow-sm shadow-green-500/20">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          You're all set! 🎉
        </h2>
        
        <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
          Your {pkg.name} subscription is active. Use the access code below to unlock your application form.
        </p>

        <div className="text-xs font-mono text-gray-400 tracking-wider mb-2">
          YOUR ACCESS CODE
        </div>
        
        <div className="flex items-center justify-center gap-4 bg-gray-50 border-2 border-dashed border-amber-500 rounded-xl px-6 py-4 mb-6 shadow-inner">
          <span className="font-mono text-3xl font-bold text-gray-900 tracking-widest">
            {accessCode}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-10 w-10 hover:bg-gray-200 rounded-xl"
          >
            {copied ? <CheckCircle2 size={20} className="text-green-600" /> : <Copy size={20} />}
          </Button>
        </div>

        <Button className="w-full bg-[#1F3A5F] hover:bg-[#1F3A5F]/90 text-white rounded-xl shadow-lg shadow-[#1F3A5F]/30 hover:shadow-xl transition-shadow" size="lg">
          <KeyRound size={18} className="mr-2" /> Unlock Application Form <ArrowRight size={18} className="ml-2" />
        </Button>

        <p className="text-xs text-gray-400 mt-4">
          We've also sent your access code to your registered email.
        </p>
      </CardContent>
    </Card>
  );
}
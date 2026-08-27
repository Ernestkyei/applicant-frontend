// src/pages/AccessCode.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ticket, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from 'react-hot-toast';
import { Header } from "@/components/common/Header";

export function AccessCodePage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      setError("Please enter your access code");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo: accept any code that starts with "AES-"
      if (code.toUpperCase().startsWith("AES-")) {
        // Store the access code
        localStorage.setItem('accessToken', code);
        localStorage.setItem('applicationId', 'app_123'); // In real app, get from API

        toast.success('Access granted! Redirecting...');
        navigate('/applicant/dashboard');
      } else {
        setError("Invalid access code. Please check and try again.");
        toast.error('Invalid access code');
      }
    } catch {
      setError("Something went wrong. Please try again.");
      toast.error('Failed to validate access code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header /> {/* Add Header component here */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-[#F4EFE3]">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

          .aes-headline { font-family: 'Fraunces', serif; }
          .aes-mono { font-family: 'IBM Plex Mono', monospace; }
          .aes-body { font-family: 'Inter', sans-serif; }

          .aes-perforation {
            position: relative;
            border-top: 1.5px dashed #C9BFA6;
          }
          .aes-perforation::before,
          .aes-perforation::after {
            content: "";
            position: absolute;
            top: -11px;
            width: 22px;
            height: 22px;
            border-radius: 9999px;
            background: #F4EFE3;
            box-shadow: inset 0 0 0 1.5px #C9BFA6;
          }
          .aes-perforation::before { left: -11px; }
          .aes-perforation::after { right: -11px; }
        `}</style>

        {/* ambient paper texture */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(184,135,63,0.10),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(20,33,61,0.08),transparent_50%)]" />

        <div className="relative w-full max-w-md">
          {/* seal badge */}
          <div className="absolute -top-6 left-8 z-10 flex h-14 w-14 rotate-[-6deg] items-center justify-center rounded-full bg-[#14213D] shadow-[0_8px_20px_rgba(20,33,61,0.35)] ring-4 ring-[#F4EFE3]">
            <Ticket className="h-6 w-6 text-[#E8C079]" strokeWidth={1.75} />
          </div>

          <div className="overflow-hidden rounded-[28px] border border-[#E4DBC5] bg-[#FCFAF3] shadow-[0_24px_60px_rgba(20,33,61,0.16)]">
            {/* header */}
            <div className="px-8 pb-6 pt-12 text-left">
              <p className="aes-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B8873F]">
                Admissions Access
              </p>
              <h1 className="aes-headline mt-2 text-[28px] leading-tight text-[#14213D]">
                Enter your <em className="not-italic text-[#B8873F]">access code</em>
              </h1>
              <p className="aes-body mt-2 text-sm leading-relaxed text-[#5B6472]">
                We sent this code to you by email or SMS. It unlocks your application.
              </p>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className="px-8">
              <div className="space-y-2">
                <Label htmlFor="code" className="aes-body text-xs font-semibold uppercase tracking-wide text-[#5B6472]">
                  Access code
                </Label>
                <Input
                  id="code"
                  placeholder="AES-2026-ABC123"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setError("");
                  }}
                  className={`aes-mono h-14 rounded-xl border-2 bg-[#F4EFE3]/60 text-center text-lg tracking-[0.18em] text-[#14213D] shadow-inner transition placeholder:text-[#B8AF98] focus-visible:ring-2 focus-visible:ring-[#B8873F] focus-visible:ring-offset-0 ${
                    error
                      ? 'border-[#A83232] bg-[#FBEEEE]'
                      : 'border-[#E4DBC5] focus-visible:border-[#B8873F]'
                  }`}
                  autoFocus
                  disabled={loading}
                />
                {error ? (
                  <p className="aes-body flex items-center gap-1.5 text-sm text-[#A83232]">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {error}
                  </p>
                ) : (
                  <p className="aes-body text-xs text-[#8C8570]">Format: AES-YYYY-XXXXXX</p>
                )}
              </div>
            </form>

            {/* perforated tear line */}
            <div className="aes-perforation mx-8 mt-7" />

            {/* footer / ticket stub */}
            <div className="flex flex-col gap-4 px-8 pb-9 pt-6">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="aes-body h-13 w-full rounded-xl bg-[#14213D] py-3.5 text-[15px] font-semibold text-[#F4EFE3] shadow-[0_10px_24px_rgba(20,33,61,0.28)] transition hover:bg-[#0F1A30] disabled:opacity-60"
              >
                {loading ? (
                  "Validating..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Enter application
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <p className="aes-body text-center text-xs text-[#8C8570]">
                No access code yet?{' '}
                <Link to="/contact" className="font-semibold text-[#B8873F] transition hover:text-[#96692C] hover:underline">
                  Contact admissions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccessCodePage;
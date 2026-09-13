import { useEffect, useRef, useState } from "react";
import { ChevronRight, MapPin } from "lucide-react";

import { COUNTRY_OPTIONS, PRIMARY_COLOR, getFlagEmoji } from "./constants";
import type { Country } from "./types";

export interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CountrySelect({
  value,
  onChange,
  placeholder = "Search or select your country...",
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = query
    ? COUNTRY_OPTIONS.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      )
    : COUNTRY_OPTIONS;

  const handleSelect = (country: Country) => {
    onChange(country.name);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      <MapPin
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none"
      />

      <div className="relative">
        <input
          type="text"
          value={open ? query : value}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm outline-none transition"
          style={{
            borderColor: open ? PRIMARY_COLOR : undefined,
            boxShadow: open ? `0 0 0 2px ${PRIMARY_COLOR}20` : undefined,
          }}
        />

        {value && !open && (
          <span className="absolute right-9 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
            {getFlagEmoji(
              COUNTRY_OPTIONS.find((country) => country.name === value)?.code || "UN"
            )}
          </span>
        )}
      </div>

      <ChevronRight
        size={16}
        className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform pointer-events-none ${
          open ? "rotate-90" : ""
        }`}
      />

      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
          {filtered.length === 0 ? (
            <div className="px-3 py-2.5 text-sm text-gray-400">
              No countries found
            </div>
          ) : (
            filtered.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelect(country)}
                className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm transition-colors"
                style={{
                  backgroundColor:
                    country.name === value ? `${PRIMARY_COLOR}12` : undefined,
                  color: country.name === value ? PRIMARY_COLOR : undefined,
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.backgroundColor = `${PRIMARY_COLOR}12`;
                  event.currentTarget.style.color = PRIMARY_COLOR;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.backgroundColor =
                    country.name === value ? `${PRIMARY_COLOR}12` : "";
                  event.currentTarget.style.color =
                    country.name === value ? PRIMARY_COLOR : "";
                }}
              >
                <span
                  className="text-lg"
                  style={{
                    width: "1.3em",
                    flexShrink: 0,
                  }}
                >
                  {getFlagEmoji(country.code)}
                </span>

                <span className="flex-1">{country.name}</span>

                {country.name === "Ghana" && (
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    Local
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

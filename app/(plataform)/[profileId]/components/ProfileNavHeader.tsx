"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const allNavItems = [
  { id: "fotos", label: "Fotos" },
  { id: "sobre", label: "Sobre" },
  { id: "animais", label: "Animais" },
  { id: "casos", label: "Casos" },
  { id: "atualizacoes", label: "Atualizações" },
  { id: "depoimentos", label: "Depoimentos" },
];

export function ProfileNavHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [availableSections] = useState<typeof allNavItems>(() => {
    // Initialize state with available sections on first render (client-side only)
    if (typeof window === "undefined") return allNavItems;
    return allNavItems.filter(
      (item) => document.getElementById(item.id) !== null
    );
  });

  useEffect(() => {
    if (availableSections.length === 0) return;

    const handleScroll = () => {
      // Show header after scrolling 300px
      setIsVisible(window.scrollY > 300);

      // Determine active section from available sections only
      const sections = availableSections.map((item) =>
        document.getElementById(item.id)
      );
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(availableSections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [availableSections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto max-w-7xl px-2 md:px-4">
        <nav className="flex items-center justify-center gap-0.5 md:gap-1 py-2 overflow-x-auto scrollbar-hide">
          {availableSections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "px-2 md:px-3 py-1.5 text-[11px] md:text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0",
                activeSection === item.id
                  ? "text-foreground bg-muted/60"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

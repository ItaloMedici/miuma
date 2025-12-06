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

  const [availableSections, setAvailableSections] = useState<
    typeof allNavItems
  >(() => {
    if (typeof window === "undefined") return allNavItems;
    return allNavItems.filter(
      (item) => document.getElementById(item.id) !== null
    );
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;

    const sections = allNavItems.filter(
      (item) => document.getElementById(item.id) !== null
    );

    // Defer state update to avoid calling setState synchronously within the effect
    raf = requestAnimationFrame(() => setAvailableSections(sections));

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (availableSections.length === 0) return;

    const handleScroll = () => {
      // Show header after scrolling 300px
      setIsVisible(window.scrollY > 300);

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
        "bg-background/95 border-border fixed top-0 right-0 left-0 z-40 border-b backdrop-blur-sm transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto max-w-7xl px-2 md:px-4">
        <nav className="scrollbar-hide flex items-center justify-center gap-0.5 overflow-x-auto py-2 md:gap-1">
          {availableSections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "shrink-0 rounded-md px-2 py-1.5 text-[11px] font-medium whitespace-nowrap transition-colors md:px-3 md:text-xs",
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

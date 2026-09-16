"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const STORAGE_KEY = "artemix-theme";

export function ThemeToggle() {
  // El valor real lo fijó el script inline del layout antes del pintado;
  // aquí solo lo leemos tras montar para no romper la hidratación.
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Modo privado o almacenamiento bloqueado: el cambio vale para esta sesión.
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Activar tema claro" : "Activar tema oscuro"}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent/50 hover:text-accent"
    >
      {mounted &&
        (theme === "dark" ? (
          <Sun className="h-[1.1rem] w-[1.1rem]" />
        ) : (
          <Moon className="h-[1.1rem] w-[1.1rem]" />
        ))}
    </button>
  );
}

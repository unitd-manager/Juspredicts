import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme";

function getSystemPrefersDark(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyThemeClass(theme: Theme) {
	const root = document.documentElement;
	if (theme === "dark") {
		root.classList.add("dark");
	} else {
		root.classList.remove("dark");
	}
}

export function ThemeProvider(props: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof window === "undefined") return "light";
		const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
		if (stored === "dark" || stored === "light") return stored;
		return getSystemPrefersDark() ? "dark" : "light";
	});

	useEffect(() => {
		applyThemeClass(theme);
		try {
			window.localStorage.setItem(STORAGE_KEY, theme);
		} catch {
			// ignore storage errors
		}
	}, [theme]);

	// Respond to system changes if the user hasn't explicitly set a preference
	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = () => {
			const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
			if (stored !== "dark" && stored !== "light") {
				setThemeState(media.matches ? "dark" : "light");
			}
		};
		if (media.addEventListener) {
			media.addEventListener("change", handler);
		} else {
			// Safari
			// @ts-ignore
			media.addListener(handler);
		}
		return () => {
			if (media.removeEventListener) {
				media.removeEventListener("change", handler);
			} else {
				// @ts-ignore
				media.removeListener(handler);
			}
		};
	}, []);

	const setTheme = useCallback((t: Theme) => setThemeState(t), []);
	const toggleTheme = useCallback(() => {
		setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
	}, []);

	const value = useMemo<ThemeContextValue>(
		() => ({ theme, toggleTheme, setTheme }),
		[theme, toggleTheme, setTheme]
	);

	return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
	return ctx;
}



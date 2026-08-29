import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-provider-B6MLIRMm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var THEME_STORAGE_KEY = "theme";
function getSystemTheme() {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function getStoredTheme() {
	if (typeof window === "undefined") return "system";
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		if (stored === "light" || stored === "dark" || stored === "system") return stored;
	} catch (e) {}
	return "system";
}
function setStoredTheme(theme) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	} catch (e) {}
}
function applyTheme(theme) {
	const root = document.documentElement;
	if ((theme === "system" ? getSystemTheme() : theme) === "dark") root.classList.add("dark");
	else root.classList.remove("dark");
}
function useTheme() {
	const [theme, setThemeState] = (0, import_react.useState)(() => getStoredTheme());
	const [resolvedTheme, setResolvedTheme] = (0, import_react.useState)(() => {
		const stored = getStoredTheme();
		return stored === "system" ? getSystemTheme() : stored;
	});
	(0, import_react.useEffect)(() => {
		applyTheme(theme);
	}, [theme]);
	(0, import_react.useEffect)(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			if (theme === "system") {
				const systemTheme = getSystemTheme();
				setResolvedTheme(systemTheme);
				applyTheme("system");
			}
		};
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);
	const setTheme = (newTheme) => {
		setThemeState(newTheme);
		setStoredTheme(newTheme);
		const resolved = newTheme === "system" ? getSystemTheme() : newTheme;
		setResolvedTheme(resolved);
		applyTheme(newTheme);
	};
	return {
		theme,
		resolvedTheme,
		setTheme
	};
}
var themeScript = `
(function() {
  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  
  function getStoredTheme() {
    try {
      const stored = localStorage.getItem("${THEME_STORAGE_KEY}");
      if (stored === "light" || stored === "dark" || stored === "system") {
        return stored;
      }
    } catch (e) {}
    return "system";
  }
  
  const stored = getStoredTheme();
  const resolved = stored === "system" ? getSystemTheme() : stored;
  
  if (resolved === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
})();
`;
//#endregion
export { useTheme as n, themeScript as t };

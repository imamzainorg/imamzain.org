// Applies the saved theme class to <html> before first paint to avoid a
// light→dark flash (FOUC). Mirrors the header toggle, which persists the
// choice under localStorage "theme". Loaded via next/script beforeInteractive.
(function () {
	try {
		var t = localStorage.getItem("theme")
		t = t === "dark" ? "dark" : "light"
		var d = document.documentElement
		d.classList.remove("light", "dark")
		d.classList.add(t)
	} catch {}
})()

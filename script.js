async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log(registration);
    }
} registerServiceWorker();

let installPrompt;
const pwaInstallButton = document.getElementById("installButton");

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    pwaInstallButton.removeAttribute("hidden");
})

pwaInstallButton.addEventListener("click", async () => {
    if (!installPrompt) return;

    const result = await installPrompt.prompt();
    console.log("Install prompt result", result);

    installPrompt = null;
    pwaInstallButton.setAttribute("hidden", "");
});



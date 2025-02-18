document.addEventListener('DOMContentLoaded', async () => {
    const loadingScreen = document.getElementById("loading-screen");

    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add("hidden");
        }, 1000);
    } else {
        console.error('Loading screen element not found.');
    }
});

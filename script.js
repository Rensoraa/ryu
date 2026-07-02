
(function () {
  const DURATION = 5000; // ms
  const percentEl = document.getElementById('percentValue');
  const fillEl = document.getElementById('loaderFill');
  const statusEl = document.getElementById('loaderStatus');
  const loaderEl = document.getElementById('loader');
  const contentEl = document.getElementById('content');

  const statusMessages = [
    'Getting things ready',
    'Mounting SSD array',
    'Loading garage tools',
    'Calibrating sensitivity',
    'Syncing Ryu profile',
    'Almost there'
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function finish() {
    percentEl.textContent = '100';
    fillEl.style.width = '100%';
    loaderEl.classList.add('hidden');
    contentEl.classList.add('visible');
  }

  if (prefersReducedMotion) {
    finish();
    return;
  }

  const startTime = performance.now();
  let lastMessageIndex = -1;

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / DURATION, 1);
    const percent = Math.floor(progress * 100);

    percentEl.textContent = String(percent).padStart(2, '0');
    fillEl.style.width = percent + '%';

    const messageIndex = Math.min(
      Math.floor(progress * statusMessages.length),
      statusMessages.length - 1
    );
    if (messageIndex !== lastMessageIndex) {
      statusEl.textContent = statusMessages[messageIndex];
      lastMessageIndex = messageIndex;
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(finish, 150);
    }
  }

  requestAnimationFrame(tick);
})();


(async () => {
    const DISCORD_ID = "414601458906955776";

    try {
        const response = await fetch(
            `https://premier-pfp-sys.itsnielsje.workers.dev/avatars?ids=${DISCORD_ID}`
        );

        if (!response.ok) throw new Error("Failed to fetch avatar.");

        const data = await response.json();
        const avatarUrl = data[DISCORD_ID];

        if (!avatarUrl) throw new Error("Avatar not found.");

        // Remove existing favicons
        document.querySelectorAll("link[rel*='icon']").forEach(link => link.remove());

        // Create new favicon
        const favicon = document.createElement("link");
        favicon.rel = "shortcut icon";
        favicon.type = "image/png";
        favicon.href = avatarUrl + "&v=" + Date.now(); // Prevent caching

        document.head.appendChild(favicon);

        console.log("Discord favicon applied:", avatarUrl);
    } catch (err) {
        console.error(err);
    }
})();

console.log('hello world');
(function () {
  const buyBtnIds = [
    "heroBuyBtn",
    "buyBtn",
    "navBuyBtn",
    "joinBuyBtn",
    "footerBuyBtn",
  ];
  const pumpSwapUrl = getPumpSwapUrl();
  const dexUrl = getDexScreenerUrl();
  const embedUrl = getDexScreenerEmbedUrl();
  const contract = BOUNTY_CUP_CONFIG.contractAddress;

  buyBtnIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = pumpSwapUrl;
  });

  const chartLink = document.getElementById("chartLink");
  if (chartLink) chartLink.href = dexUrl;

  const embed = document.getElementById("dexscreenerEmbed");
  if (embed) embed.src = embedUrl;

  const contractEl = document.getElementById("contractAddress");
  if (contractEl) contractEl.textContent = contract;

  // Copy contract
  const copyBtn = document.getElementById("copyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(contract);
        copyBtn.classList.add("copied");
        setTimeout(() => copyBtn.classList.remove("copied"), 2000);
      } catch {
        const range = document.createRange();
        range.selectNode(contractEl);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    });
  }

  // Nav scroll
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  // Mobile nav
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  // Particle canvas
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;
  let mouse = { x: -1000, y: -1000 };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      const roll = Math.random();
      const hue = roll > 0.55 ? 48 : roll > 0.3 ? 145 : roll > 0.1 ? 0 : 210;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 3 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: Math.random() * -0.8 - 0.15,
        opacity: Math.random() * 0.55 + 0.25,
        hue,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        p.x -= dx * 0.008;
        p.y -= dy * 0.008;
      }

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < -10) {
        p.y = h + 10;
        p.x = Math.random() * w;
      }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }

  resize();
  createParticles(Math.min(120, Math.floor((w * h) / 12000)));
  drawParticles();

  window.addEventListener("resize", () => {
    resize();
    createParticles(Math.min(120, Math.floor((w * h) / 12000)));
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Confetti burst on buy button click
  document.querySelectorAll(".btn-gold").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      for (let i = 0; i < 30; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = cx + (Math.random() - 0.5) * 60 + "px";
        piece.style.top = cy + "px";
        piece.style.background = [
          "#ffe566",
          "#e8c547",
          "#006b3f",
          "#e31837",
          "#fff",
          "#00a86b",
        ][Math.floor(Math.random() * 6)];
        piece.style.width = Math.random() * 6 + 5 + "px";
        piece.style.height = Math.random() * 4 + 4 + "px";
        piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        piece.style.animationDuration = Math.random() * 2 + 1.5 + "s";
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 4000);
      }
    });
  });

  // Parallax on trophy frame (keeps float animation on the image)
  const trophyFrame = document.querySelector(".trophy-frame");
  if (trophyFrame) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      trophyFrame.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // Smooth active nav highlight
  const sections = document.querySelectorAll(".section, .hero");
  const navAnchors = document.querySelectorAll(".nav-links a:not(.btn)");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.id;
    });
    navAnchors.forEach((a) => {
      a.style.color =
        a.getAttribute("href") === "#" + current ? "var(--gold-light)" : "";
    });
  });
})();

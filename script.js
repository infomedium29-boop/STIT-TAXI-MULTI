// ============================================
// STIT TAXI — shared interactivity
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Sticky nav background
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (window.scrollY > 40) nav?.classList.add("scrolled");
    else nav?.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const burger = document.querySelector(".nav__burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  burger?.addEventListener("click", () => {
    burger.classList.toggle("open");
    mobileMenu?.classList.toggle("open");
    document.body.style.overflow = mobileMenu?.classList.contains("open") ? "hidden" : "";
  });
  mobileMenu?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      burger?.classList.remove("open");
      mobileMenu?.classList.remove("open");
      document.body.style.overflow = "";
    })
  );

  // Scroll reveal
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Animated counters
  const counters = document.querySelectorAll("[data-count]");
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = el.dataset.count.includes(".") ? 1 : 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = target * eased;
      el.textContent = decimals ? val.toFixed(decimals) : Math.round(val);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = decimals ? target.toFixed(decimals) : target;
    };
    requestAnimationFrame(step);
  };
  if (counters.length && "IntersectionObserver" in window) {
    const cIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => cIo.observe(el));
  }

  // Hero parallax (subtle, desktop only)
  const heroBg = document.querySelector(".hero__bg img");
  if (heroBg && window.matchMedia("(min-width: 860px)").matches) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          heroBg.style.transform = `scale(1.08) translateY(${y * 0.12}px)`;
        }
      },
      { passive: true }
    );
  }

  // Contact form -> Web3Forms (basic submit handling, demo placeholder)
  const forms = document.querySelectorAll("[data-contact-form]");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      const original = btn.innerHTML;
      btn.innerHTML = "Šaljem upit...";
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = "Upit poslan ✓";
        form.reset();
        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
        }, 2600);
      }, 900);
    });
  });

  // Active nav link by current page
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a, .mobile-menu a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
});

/* =========================================================
   BVI3124 Personal Portfolio - Main JavaScript File
   Author: Muhammad Adib Afham Bin Mat Zaki (Adib Afham)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Automatic Copyright Year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Responsive Hamburger Menu
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mainNav = document.getElementById("mainNav");
  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // 3. Dark / Light Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("portfolioTheme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    if (themeToggle) themeToggle.textContent = "🌙";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isLight = document.body.classList.contains("light-theme");
      themeToggle.textContent = isLight ? "🌙" : "☀️";
      localStorage.setItem("portfolioTheme", isLight ? "light" : "dark");
    });
  }

  // 4. Time-Based Greeting (Home Page)
  const greetingEl = document.getElementById("timeGreeting");
  if (greetingEl) {
    const hour = new Date().getHours();
    let greetingText = "Good Evening! Welcome to my portfolio";
    if (hour < 12) {
      greetingText = "Good Morning! Welcome to my portfolio";
    } else if (hour < 18) {
      greetingText = "Good Afternoon! Welcome to my portfolio";
    }
    greetingEl.textContent = greetingText;
  }

  // 5. Typing Tagline Effect (Home Page)
  const typingEl = document.getElementById("typingText");
  if (typingEl) {
    const phrases = [
      "Aspiring Industrial Automation Technologist",
      "PLC, HMI & SCADA Systems Developer",
      "IoT Monitoring & Web Dashboard Builder"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 45 : 85;
      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 1600;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
      }
      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  // 6. "Read More" Toggle (About Page)
  const readMoreBtn = document.getElementById("readMoreBtn");
  const moreBio = document.getElementById("moreBio");
  if (readMoreBtn && moreBio) {
    readMoreBtn.addEventListener("click", () => {
      const isVisible = moreBio.classList.toggle("show");
      readMoreBtn.textContent = isVisible ? "Read Less" : "Read More";
    });
  }

  // 7. Skill Tabs & Animated Progress Bars (Skills Page)
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  function animateSkillBars() {
    const activeBars = document.querySelectorAll(".tab-content.active .progress-fill");
    activeBars.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-width");
      bar.style.width = targetWidth;
    });
  }

  if (tabBtns.length > 0) {
    animateSkillBars();
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));

        btn.classList.add("active");
        const targetTab = document.getElementById(btn.getAttribute("data-tab"));
        if (targetTab) {
          targetTab.classList.add("active");
          animateSkillBars();
        }
      });
    });
  }

  // 8. Project Category Filter & Details Modal (Projects Page)
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        card.style.display = (filter === "all" || category === filter) ? "flex" : "none";
      });
    });
  });

  const projectData = {
    plc: {
      title: "PLC Training Kit & Factory I/O OPC UA Integration",
      role: "Automation & Control Developer",
      tools: "Wecon PLC, Ladder Logic, Factory I/O, OPC UA Server",
      problem: "Industrial automation trainees need safe, repeatable environments to test physical PLC ladder programs against realistic factory actuators and sensors without risking mechanical damage.",
      outcome: "Successfully established low-latency OPC UA communication between physical Wecon PLC hardware and Factory I/O simulations, enabling real-time I/O verification and automated sorting control.",
      link: "https://github.com/adeebam"
    },
    pump: {
      title: "Water Pump Station P-101 Monitoring System",
      role: "Full-Stack IoT & Dashboard Developer",
      tools: "HTML5, CSS3, Node-RED, MySQL, PHP, Grafana",
      problem: "Manual logging of pump station metrics delays fault detection and makes historical trend analysis difficult for maintenance engineers.",
      outcome: "Engineered a web-based SCADA monitoring dashboard featuring live status cards, operational parameter tables, historical MySQL storage, and automated threshold alarms.",
      link: "https://github.com/adeebam"
    },
    android: {
      title: "Native Android Calculator Application",
      role: "Mobile Application Developer",
      tools: "Android Studio, Java, XML, SDLC Documentation",
      problem: "Needed a lightweight, responsive arithmetic utility built from scratch following structured Software Development Life Cycle (SDLC) phases.",
      outcome: "Delivered a fully functional Android APK with clean XML layout architecture, division-by-zero exception handling, and complete SDLC verification testing.",
      link: "https://github.com/adeebam"
    }
  };

  const modal = document.getElementById("projectModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const openModalBtns = document.querySelectorAll(".open-modal-btn");

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-project");
      const data = projectData[key];
      if (data && modal) {
        document.getElementById("modalTitle").textContent = data.title;
        document.getElementById("modalRole").textContent = data.role;
        document.getElementById("modalTools").textContent = data.tools;
        document.getElementById("modalProblem").textContent = data.problem;
        document.getElementById("modalOutcome").textContent = data.outcome;
        document.getElementById("modalLink").href = data.link;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
      }
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }

  // 9. Contact Form Validation (Compulsory Requirement)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const subjectError = document.getElementById("subjectError");
      const messageError = document.getElementById("messageError");
      const formSuccess = document.getElementById("formSuccess");

      nameError.textContent = "";
      emailError.textContent = "";
      subjectError.textContent = "";
      messageError.textContent = "";
      formSuccess.textContent = "";

      let isValid = true;

      if (fullName.length < 3) {
        nameError.textContent = "Please enter your full name (at least 3 characters).";
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      if (subject.length < 4) {
        subjectError.textContent = "Please enter a subject (at least 4 characters).";
        isValid = false;
      }

      if (message.length < 15) {
        messageError.textContent = "Please enter a message with at least 15 characters.";
        isValid = false;
      }

      if (isValid) {
        formSuccess.textContent = `Thank you, ${fullName}! Your message has been validated and sent.`;
        contactForm.reset();
      }
    });
  }

  // 10. Scroll-to-Top Button
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
/* ================= Smooth Scroll ================= */
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return; // prevents crash

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});


/* ================= Expand / Collapse Skills ================= */
document.querySelectorAll(".category-header").forEach(header => {
  header.addEventListener("click", () => {
    const list = header.nextElementSibling;

    list.classList.toggle("hidden");
    header.classList.toggle("active");
  });
});

const texts = [
  "Cybersecurity Student",
  "Ethical Hacking Enthusiast",
  "Blue Team Learner",
  "Threat Monitoring Builder",
  "Future Security Engineer"
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector(".typing-text");

function typeEffect() {
  const currentText = texts[index];
  
  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      setTimeout(() => isDeleting = true, 1000);
    }
  } else {
    typingElement.textContent = currentText.substring(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

/* ================= Animate Progress Bars on Scroll ================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const bar = entry.target;
    const level = bar.getAttribute("data-level");

    bar.style.width = level;

    observer.unobserve(bar); // run only once
  });
}, { threshold: 0.4 });

document.querySelectorAll(".progress").forEach(bar => {
  observer.observe(bar);
});

window.addEventListener("load", () => {
  document.querySelectorAll(".progress").forEach(bar => {
    const level = bar.dataset.level;
    if (level) {
      setTimeout(() => {
        bar.style.width = level;
      }, 300);
    }
  });
});

const ctx = document.getElementById("cyberRadar");

if (ctx) {
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "Security Operations",
        "Incident Response",
        "Malware Analysis",
        "Penetration Testing",
        "Exploitation",
        "Red Teaming"
      ],
      datasets: [{
        label: "My Skill Level",
        data: [65, 55, 60, 70, 50, 60],
        backgroundColor: "rgba(0, 255, 156, 0.2)",
        borderColor: "#00ff9c",
        borderWidth: 2,
        pointBackgroundColor: "#00ff9c",
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          angleLines: {
            color: "rgba(255,255,255,0.1)"
          },
          grid: {
            color: "rgba(255,255,255,0.1)"
          },
          pointLabels: {
            color: "#94a3b8",
            font: {
              size: 13
            }
          },
          ticks: {
            backdropColor: "transparent",
            color: "rgba(255,255,255,0.4)",
            stepSize: 20,
            max: 100,
            min: 0
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.overlay');

  // Toggle menu
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    menuToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Fechar menu ao clicar nos links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      // Fecha o menu
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.classList.remove('menu-open');

      // Scroll para a seção
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Fechar menu ao clicar no overlay
  overlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

// Contagem animada das estatísticas
const statsSection = document.querySelector('.stats-section');
const statsItems = statsSection.querySelectorAll('.stat-item .stat-int');
let countingIntervals = [];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Começa a contagem
      statsItems.forEach((item, idx) => {
        const target = parseInt(item.getAttribute('data-number'));
        let count = 0;
        if (countingIntervals[idx]) clearInterval(countingIntervals[idx]);
        countingIntervals[idx] = setInterval(() => {
          if (count < target) {
            count += Math.ceil(target / 100);
            if (count > target) count = target;
            item.textContent = count;
          } else {
            clearInterval(countingIntervals[idx]);
          }
        }, 10);
      });
    } else {
      // Reseta a contagem para zero e limpa intervalos
      statsItems.forEach(item => item.textContent = '0');
      countingIntervals.forEach(interval => clearInterval(interval));
      countingIntervals = [];
    }
  });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Botão de mensagem flutuante
const messageBtn = document.getElementById('messageBtn');
const socialButtons = document.getElementById('socialButtons');

messageBtn.addEventListener('click', () => {
  socialButtons.classList.toggle('active');
});

// Input file (se houver)
const fileInput = document.getElementById('fileInput');
if (fileInput) {
  fileInput.addEventListener('change', () => {
    const fileName = fileInput.files[0] ? fileInput.files[0].name : 'No file chosen';
    document.getElementById('fileName').textContent = fileName;
  });
}

// Botão de orçamento rolar para feedback
const btnEstimate = document.getElementById('btnEstimate');
if (btnEstimate) {
  btnEstimate.addEventListener('click', () => {
    const feedbackSection = document.getElementById('feedback');
    if (feedbackSection) {
      feedbackSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Feedback carousel infinite loop
function setupFeedbackCarousel() {
  const feedbackTrack = document.querySelector('.feedback-track');
  if (!feedbackTrack) return;

  const feedbackCards = feedbackTrack.querySelectorAll('.feedback-card');
  if (feedbackCards.length < 2) return; // Não duplica se só tem 1

  feedbackCards.forEach(card => {
    const clone = card.cloneNode(true);
    feedbackTrack.appendChild(clone);
  });

  let scrollAmount = 0;
  const scrollSpeed = 0.6;

  function animateFeedback() {
    scrollAmount += scrollSpeed;
    if (scrollAmount >= feedbackTrack.scrollWidth / 2) {
      scrollAmount = 0;
    }
    feedbackTrack.style.transform = `translateX(-${scrollAmount}px)`;
    requestAnimationFrame(animateFeedback);
  }

  animateFeedback();
}

// Call this function when the page loads
window.addEventListener('load', setupFeedbackCarousel);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const features = document.querySelectorAll(".feature");
  const section = document.querySelector(".why-choose");

  if (!section) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          features.forEach((feature, i) => {
            setTimeout(() => {
              feature.classList.add("animate");
            }, i * 800); // delay entre 1 e outro (800ms)
          });
          observer.unobserve(section); // só dispara uma vez
        }
      });
    },
    {
      threshold: 0.5, // quando metade da seção estiver visível
    }
  );

  observer.observe(section);
});

// Reveal animation on scroll
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

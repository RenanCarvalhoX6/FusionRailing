// Header muda background quando scroll passa de 100px
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Toggle menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');
});

// Fechar menu ao clicar em link do menu
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
  });
});

// Fechar menu ao clicar na overlay
overlay.addEventListener('click', () => {
  navLinks.classList.remove('active');
  overlay.classList.remove('active');
});



// Contagem animada das estatísticas, reinicia ao entrar e sair da seção
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

  // Clone all feedback cards
  const feedbackCards = feedbackTrack.querySelectorAll('.feedback-card');
  feedbackCards.forEach(card => {
    const clone = card.cloneNode(true);
    feedbackTrack.appendChild(clone);
  });

  // Animation
  let scrollAmount = 0;
  const scrollSpeed = 0.6; // Adjust speed here

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
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-links a').forEach(el => el.classList.remove('active'));
    link.classList.add('active');
  });
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

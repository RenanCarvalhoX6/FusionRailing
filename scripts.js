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

// Slider projetos com navegação centralizada
const sliderTrack = document.querySelector('.slider-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const projectItems = sliderTrack.querySelectorAll('.project-item');
let currentIndex = 0;

function scrollToIndex(index) {
  if (index < 0) index = 0;
  if (index >= projectItems.length) index = projectItems.length - 1;
  currentIndex = index;
  projectItems[index].scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'nearest'
  });
}

prevBtn.addEventListener('click', () => scrollToIndex(currentIndex - 1));
nextBtn.addEventListener('click', () => scrollToIndex(currentIndex + 1));

// Centraliza no primeiro item na inicialização
scrollToIndex(0);

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

// Carrossel de logos automático
const track = document.querySelector('.carousel-track');
let scrollAmount = 0;

function scrollCarousel() {
  scrollAmount += 1; // Velocidade do scroll
  if (scrollAmount >= track.scrollWidth) {
    scrollAmount = 0;
  }
  track.style.transform = `translateX(-${scrollAmount}px)`;
  requestAnimationFrame(scrollCarousel);
}

scrollCarousel();
window.addEventListener('load', () => {
  const feedbackTrack = document.querySelector('.feedback-track');
  if (feedbackTrack) {
    // Duplicar conteúdo para loop infinito
    feedbackTrack.innerHTML += feedbackTrack.innerHTML;
  }
});

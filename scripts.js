// Header muda background quando scroll passa de 100px
window.addEventListener('scroll', function() {
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

// Fechar menu ao clicar em qualquer link do menu
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


// ======= Slider projetos com navegação centralizada =======

const sliderTrack = document.querySelector('.slider-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const sliderContainer = document.querySelector('.projects-slider');
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

prevBtn.addEventListener('click', () => {
  scrollToIndex(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  scrollToIndex(currentIndex + 1);
});

// Inicializa centralizado no primeiro item
scrollToIndex(0);



// Intersection Observer para animar os números das estatísticas
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stats = entry.target.querySelectorAll('.stat-item');
      stats.forEach(item => {
        const numberElement = item.querySelector('.stat-int');
        const number = parseInt(numberElement.getAttribute('data-number'));

        if (!isNaN(number) && number > 0) {
          let count = 0;
          const interval = setInterval(() => {
            if (count < number) {
              count += Math.ceil(number / 100);
              numberElement.textContent = count;
            } else {
              clearInterval(interval);
              numberElement.textContent = number;
            }
          }, 10);
        }
      });

      observer.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
observer.observe(statsSection);

// Botão de mensagem flutuante
const messageBtn = document.getElementById('messageBtn');
const socialButtons = document.getElementById('socialButtons');

messageBtn.addEventListener('click', () => {
  socialButtons.classList.toggle('active');
});

// Input file (se tiver)
document.getElementById('fileInput')?.addEventListener('change', function () {
  var fileName = this.files[0] ? this.files[0].name : 'No file chosen';
  document.getElementById('fileName').textContent = fileName;
});

const btnEstimate = document.getElementById('btnEstimate');
btnEstimate?.addEventListener('click', () => {
  const feedbackSection = document.getElementById('feedback');
  if (feedbackSection) {
    feedbackSection.scrollIntoView({ behavior: 'smooth' });
  }
});

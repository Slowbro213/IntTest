const carouselItems = [
  { image: './images/shot1.png', text: 'Glide' },
  { image: './images/shot2.png', text: 'Magnetic Core Bobbin' },
  { image: './images/shot3.png', text: 'Premium Stabilizer' },
  { image: './images/shot1.png', text: 'Glide' },
  { image: './images/shot2.png', text: 'Magnetic Core Bobbin' },
  { image: './images/shot3.png', text: 'Premium Stabilizer' }
];

const visibleSlides = 3;
const slideWidth = 637;
let currentIndex = visibleSlides;

function createSlide(item) {
  const slide = document.createElement('div');
  slide.className = 'carousel-item';
  slide.innerHTML = `
    <div class="carousel-image" style="background-image: url('${item.image}')"></div>
    <div class="carousel-text"><p>${item.text}</p></div>
  `;
  return slide;
}

function moveCarousel(animate = true) {
  const track = document.getElementById('carousel-track');
  if (!animate) {
    track.style.transition = 'none';
  } else {
    track.style.transition = 'transform 0.5s ease';
  }
  const offset = -(currentIndex * slideWidth);
  track.style.transform = `translateX(${offset}px)`;
}

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');

  const totalItems = carouselItems.length;
  const totalSlides = totalItems + 2 * visibleSlides;

  const clonesBefore = carouselItems.slice(-visibleSlides);
  const clonesAfter = carouselItems.slice(0, visibleSlides);

  clonesBefore.forEach(item => track.appendChild(createSlide(item)));
  carouselItems.forEach(item => track.appendChild(createSlide(item)));
  clonesAfter.forEach(item => track.appendChild(createSlide(item)));

  moveCarousel(false);

  nextButton.addEventListener('click', () => {
    if (currentIndex < totalItems + visibleSlides) {
      currentIndex++;
      moveCarousel();
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      moveCarousel();
    }
  });

  track.addEventListener('transitionend', () => {
    if (currentIndex === totalItems + visibleSlides) {
      currentIndex = visibleSlides;
      moveCarousel(false);
    } else if (currentIndex === 0) {
      currentIndex = totalItems;
      moveCarousel(false);
    }
  });
});

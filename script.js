const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

// Render size - 1920x1080 canvas size mapped to cover 100vw/100vh gracefully via CSS
canvas.width = 1920;
canvas.height = 1080;

const frameCount = 240;
const currentFrame = index => (
  `assets/ezgif-frame-${String(index).padStart(3, '0')}.jpg`
);

const images = [];
const animationState = {
  frame: 1
};

// Preload the first image so there is no initial flash
const firstImage = new Image();
firstImage.src = currentFrame(1);
firstImage.onload = () => {
    // Fill the background
    context.fillStyle = "#050505";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Center and scale image
    const scale = Math.min(canvas.width / firstImage.width, canvas.height / firstImage.height);
    const x = (canvas.width / 2) - (firstImage.width / 2) * scale;
    const y = (canvas.height / 2) - (firstImage.height / 2) * scale;
    
    // Smooth drawing
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(firstImage, x, y, firstImage.width * scale, firstImage.height * scale);
};

// Preload remaining frames
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Navigation visibility logic
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 150) {
    if (window.scrollY < lastScrollY) {
      navbar.classList.remove('hidden'); // Reveal when scrolling up slightly
    } else {
      navbar.classList.add('hidden'); // Hide when scrolling down
    }
  } else {
    navbar.classList.add('hidden'); // Fully hide at the very top
  }
  lastScrollY = window.scrollY;
});

// Canvas rendering logic
function render() {
  const img = images[Math.floor(animationState.frame) - 1];
  if(img && img.complete) {
    context.fillStyle = "#050505";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  }
}

// GSAP Initialization
gsap.registerPlugin(ScrollTrigger);

// 1. Connect Canvas frames to the full page scroll timeline
gsap.to(animationState, {
  frame: frameCount,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: "#scroll-container",
    start: "top top",
    end: "bottom bottom",
    scrub: 1.5 // 1.5 scrub offers substantial hardware-accelerated inertia
  },
  onUpdate: render
});

/* Scrollytelling Text Animations */

// Section 1 (0-15%)
gsap.set('.step-1 .copy-center', { opacity: 1, y: 0 }); // Initial state is visible
gsap.to('.step-1 .copy-center', {
    scrollTrigger: {
        trigger: '.step-1',
        start: 'top 0%',
        end: 'bottom 50%',
        scrub: 1,
    },
    opacity: 0,
    y: -80,
    ease: "power2.inOut"
});

// Section 2 (15-40%)
gsap.fromTo('.step-2 .copy-left', 
  { opacity: 0, y: 60 },
  {
    opacity: 1,
    y: 0,
    scrollTrigger: {
        trigger: '.step-2',
        start: 'top 50%',
        end: 'top 20%',
        scrub: 1,
    }
  }
);
gsap.to('.step-2 .copy-left', {
    opacity: 0,
    y: -60,
    scrollTrigger: {
        trigger: '.step-2',
        start: 'bottom 80%',
        end: 'bottom 50%',
        scrub: 1,
    }
});

// Section 3 (40-65%)
gsap.fromTo('.step-3 .copy-right', 
  { opacity: 0, y: 60 },
  {
    opacity: 1,
    y: 0,
    scrollTrigger: {
        trigger: '.step-3',
        start: 'top 50%',
        end: 'top 20%',
        scrub: 1,
    }
  }
);
gsap.to('.step-3 .copy-right', {
    opacity: 0,
    y: -60,
    scrollTrigger: {
        trigger: '.step-3',
        start: 'bottom 80%',
        end: 'bottom 50%',
        scrub: 1,
    }
});

// Section 4 (65-85%)
gsap.fromTo('.step-4 .copy-center', 
  { opacity: 0, y: 60 },
  {
    opacity: 1,
    y: 0,
    scrollTrigger: {
        trigger: '.step-4',
        start: 'top 50%',
        end: 'top 20%',
        scrub: 1,
    }
  }
);
gsap.to('.step-4 .copy-center', {
    opacity: 0,
    y: -60,
    scrollTrigger: {
        trigger: '.step-4',
        start: 'bottom 80%',
        end: 'bottom 50%',
        scrub: 1,
    }
});

// Section 5 (85-100%) Final reassembly lock-in
gsap.fromTo('.step-5 .copy-center', 
  { opacity: 0, y: 60 },
  {
    opacity: 1,
    y: 0,
    scrollTrigger: {
        trigger: '.step-5',
        start: 'top 50%',
        end: 'top 20%',
        scrub: 1,
    }
  }
);

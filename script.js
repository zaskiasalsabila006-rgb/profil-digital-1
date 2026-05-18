const langToggle = document.getElementById('langToggle');
const langText = document.getElementById('langText');
let currentLang = 'ID';

// ==========================================
// LOGIKA EFEK MENGETIK (TYPEWRITER)
// ==========================================
const typewriterElement = document.getElementById('typewriter-text');
let typeInterval;

function startTypewriter(textToType) {
    clearInterval(typeInterval);
    typewriterElement.innerText = '';
    
    let index = 0;
    
    typeInterval = setInterval(() => {
        if (index < textToType.length) {
            typewriterElement.innerHTML += textToType.charAt(index);
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, 30); 
}

setTimeout(() => {
    startTypewriter(typewriterElement.getAttribute('data-id'));
}, 600);

// ==========================================
// LOGIKA UBAH BAHASA (ID/EN)
// ==========================================
langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ID' ? 'EN' : 'ID';
    langText.innerText = currentLang;

    const elements = document.querySelectorAll('[data-id]');
    
    elements.forEach(el => {
        if (el.id === 'typewriter-text') {
            const newText = currentLang === 'EN' ? el.getAttribute('data-en') : el.getAttribute('data-id');
            startTypewriter(newText);
        } else {
            if(currentLang === 'EN') {
                el.innerText = el.getAttribute('data-en');
            } else {
                el.innerText = el.getAttribute('data-id');
            }
        }
    });
});

// ==========================================
// LOGIKA TRIGGER ANIMASI SCROLL & COUNTER ANGKA
// ==========================================
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

function runCounter(counterElement) {
    const target = parseInt(counterElement.getAttribute('data-target'));
    let current = 0;
    const intervalTime = 1000 / target; 

    if (counterElement.timer) clearInterval(counterElement.timer);

    counterElement.timer = setInterval(() => {
        current += 1;
        counterElement.innerText = current;
        if (current >= target) {
            clearInterval(counterElement.timer);
        }
    }, intervalTime);
}

const observerOptions = {
    root: null, 
    rootMargin: '0px', 
    threshold: 0.1 
};

const observerCallback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => runCounter(counter));
        } else {
            entry.target.classList.remove('is-visible');
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (counter.timer) clearInterval(counter.timer);
                counter.innerText = '0';
            });
        }
    });
};

const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

elementsToAnimate.forEach((el) => {
    scrollObserver.observe(el);
});

// ==========================================
// LOGIKA PERUBAHAN TEMA (GELAP / TERANG)
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// ==========================================
// LOGIKA EFEK PARALLAX 3D (HANYA AKTIF DI DESKTOP)
// ==========================================
document.addEventListener('mousemove', (e) => {
    // Cek apakah lebar layar lebih besar dari 768px (Tablet/Desktop)
    if (window.innerWidth > 768) {
        const aboutImg = document.getElementById('about-tilt-img');
        if (aboutImg) {
            const xAxis = (window.innerWidth / 2 - e.clientX) / 25;
            const yAxis = (window.innerHeight / 2 - e.clientY) / 25;
            aboutImg.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    }
});

// Kembalikan rotasi ke posisi normal jika pengguna mengecilkan layar (resize) ke mobile
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        const aboutImg = document.getElementById('about-tilt-img');
        if (aboutImg) {
            aboutImg.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
        }
    }
});

// ==========================================
// LOGIKA NAVBAR SCROLL & SCROLLSPY (MENU AKTIF)
// ==========================================
window.addEventListener('scroll', function() {
    // 1. Transparansi Navbar
    const navbar = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 2. Deteksi ScrollSpy (Warna putih berpindah sesuai bagian yang dilihat)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Mengecek apakah area yang di-scroll sudah mencapai section tertentu
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    // Menghapus class active-nav dari semua link, lalu memberikannya ke link yang sesuai
    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-nav');
        }
    });
});

// ==========================================
// LOGIKA MENU MOBILE (HAMBURGER)
// ==========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('translate-x-full');
    // Mencegah body scroll saat menu terbuka
    document.body.style.overflow = mobileMenu.classList.contains('translate-x-full') ? 'auto' : 'hidden';
}

if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    closeMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Tutup menu otomatis saat link diklik
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
}
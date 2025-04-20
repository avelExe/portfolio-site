// Мобильное меню
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Учитываем высоту навигации
                behavior: 'smooth'
            });
        }
    });
});

// Подсветка активного пункта меню при скролле
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const options = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Добавляем класс visible для анимации
            entry.target.classList.add('visible');
            
            // Подсвечиваем активный пункт меню
            const activeId = entry.target.id;
            navItems.forEach(item => {
                if (item.getAttribute('href') === `#${activeId}`) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Анимация счетчиков статистики
const stats = document.querySelectorAll('.stat-number');

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        let startTime = null;
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;
            
            if (progress < 1) {
                const current = Math.floor(target * progress);
                stat.textContent = current;
                requestAnimationFrame(animate);
            } else {
                stat.textContent = target;
            }
        }
        
        requestAnimationFrame(animate);
    });
}

// Анимация заголовков при загрузке
const animateTitles = () => {
    const titles = document.querySelectorAll('.animate-title');
    titles.forEach((title, index) => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        setTimeout(() => {
            title.style.transition = 'all 0.5s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 200 * index);
    });
};

// Анимация навыков при наведении
const skillItems = document.querySelectorAll('#skills li');
skillItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Добавляем свечение
        item.style.boxShadow = '0 0 20px rgba(100, 255, 218, 0.3)';
    });

    item.addEventListener('mouseout', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0)';
        item.style.boxShadow = 'none';
    });
});

// Анимация карточек портфолио
const portfolioCards = document.querySelectorAll('.portfolio-card');
portfolioCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 30;
        const angleY = -(x - centerX) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Специальная анимация для карточки погодного бота
const weatherBot = document.querySelector('.weather-bot');
if (weatherBot) {
    weatherBot.addEventListener('mousemove', (e) => {
        const rect = weatherBot.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = -(x - centerX) / 20;
        
        weatherBot.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    });
    
    weatherBot.addEventListener('mouseleave', () => {
        weatherBot.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// Анимация текста
const typedTextSpan = document.getElementById("typed-text");
const phrases = [
    'Я создаю Telegram ботов',
    'Я разрабатываю лендинги',
    'Я изучаю веб-разработку',
    'Я автоматизирую процессы'
];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function type() {
    if (!typedTextSpan) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        typedTextSpan.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && letterIndex === currentPhrase.length) {
        // Пауза в конце фразы
        typingSpeed = 1000;
        isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 200;
    }

    setTimeout(type, typingSpeed);
}

// Запускаем анимации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 500);
    animateTitles();
    setTimeout(animateStats, 1000);
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInElements = document.querySelectorAll('.portfolio-card, .stat-item, #skills li');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    fadeInObserver.observe(element);
}); 
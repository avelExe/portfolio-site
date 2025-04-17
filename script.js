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
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateStat = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target;
            }
        };

        updateStat();
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
        icon.style.transition = 'transform 0.5s ease';
    });

    item.addEventListener('mouseout', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Анимация карточек портфолио
const portfolioCards = document.querySelectorAll('.portfolio-card');
portfolioCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        const techStack = card.querySelector('.tech-stack');
        techStack.style.opacity = '1';
        techStack.style.transform = 'translateY(0)';
    });

    card.addEventListener('mouseout', () => {
        const techStack = card.querySelector('.tech-stack');
        techStack.style.opacity = '0';
        techStack.style.transform = 'translateY(10px)';
    });
});

// Запуск анимаций при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    animateTitles();
    setTimeout(animateStats, 1000);
}); 
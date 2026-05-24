// Анимация загрузки: показываем прелоадер, затем плавно открываем сайт
const preloader = document.getElementById('preloader');
const mainContent = document.getElementById('mainContent');

// Ждём завершения всех анимаций прелоадера (2 секунды для полной анимации)
setTimeout(() => {
    // Плавно скрываем прелоадер
    preloader.classList.add('fade-out');
    // Показываем основной контент
    mainContent.classList.add('visible');
    
    // Удаляем прелоадер из DOM после завершения анимации
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1000);
}, 2000); // 1600ms - достаточно для завершения анимаций Zero → _ → Trace

// Принудительная прокрутка в начало
(function() {
    window.scrollTo(0, 0);
    window.addEventListener('load', function() {
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (window.history && window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
    });
    requestAnimationFrame(function() {
        window.scrollTo(0, 0);
    });
})();

function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = 15 + Math.random() * 15 + 's';
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        container.appendChild(particle);
    }
}
createParticles();

const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
fadeElements.forEach(el => observer.observe(el));

const track = document.getElementById('clientTrack');
if(track) track.innerHTML = track.innerHTML + track.innerHTML;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if(targetId && targetId !== '#' && document.querySelector(targetId)) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const ctaBtns = [document.getElementById('heroCtaBtn'), document.getElementById('navCtaBtn')];
ctaBtns.forEach(btn => {
    if(btn) btn.addEventListener('click', () => {
        document.getElementById('contact-modern').scrollIntoView({ behavior: 'smooth' });
        const formCard = document.getElementById('contactFormCard');
        if(formCard) {
            formCard.style.transition = '0.2s';
            formCard.style.boxShadow = '0 0 0 3px rgba(198,40,40,0.6)';
            setTimeout(() => { formCard.style.boxShadow = ''; }, 800);
        }
    });
});

const learnMoreBtn = document.getElementById('learnMoreBtn');
if(learnMoreBtn) learnMoreBtn.addEventListener('click', () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
});

const form = document.getElementById('beautyContactForm');
const toast = document.getElementById('toast');
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const company = document.getElementById('companyInput').value;
    const message = document.getElementById('messageInput').value;
    if(!name || !email) {
        showToast('❌ Пожалуйста, заполните имя и email');
        return;
    }
    if(!email.includes('@') || !email.includes('.')) {
        showToast('⚠️ Введите корректный email');
        return;
    }
    const submitBtn = document.getElementById('submitFormBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '⏳ Отправка...';
    submitBtn.disabled = true;
    await new Promise(resolve => setTimeout(resolve, 600));
    console.log({ name, email, company, message });
    submitBtn.innerHTML = '✅ Отправлено!';
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1800);
    showToast('🎉 Спасибо! Консультант напишет в течение 2 часов.');
    form.reset();
    const formCard = document.getElementById('contactFormCard');
    formCard.style.transform = 'scale(1.01)';
    setTimeout(() => formCard.style.transform = '', 300);
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    document.body.style.opacity = '1';
    const logoIcon = document.querySelector('.logo-icon');
    if(logoIcon) {
        logoIcon.style.animation = 'pulse 0.6s ease';
        setTimeout(() => logoIcon.style.animation = '', 600);
    }
});

const styleSheet = document.createElement("style");
styleSheet.textContent = `@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }`;
document.head.appendChild(styleSheet);

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('mobile-menu-active');
        });
    }

    // Плавная прокрутка для якорных ссылок
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', smoothScroll);
    }
    
    function smoothScroll(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const yOffset = -80; // смещение для учета фиксированного заголовка
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
        
        // Закрыть мобильное меню после клика
        if (nav.classList.contains('mobile-menu-active')) {
            nav.classList.remove('mobile-menu-active');
        }
    }

    // Анимация при прокрутке
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-header, .about-content, .news-item, .timeline-item, .gallery-item, .volunteer-content, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-in');
            }
        });
    };
    
    // Добавление класса для анимации
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-section');
    });
    
    // Вызов анимации при загрузке и скроллинге
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Вызвать при загрузке страницы

    // Обработка отправки формы
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // В реальном приложении здесь был бы код для отправки данных на сервер
            // Но для демонстрации просто покажем сообщение об успешной отправке
            
            const formInputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Спасибо! Ваше сообщение отправлено.';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }

    // Форма подписки в футере
    const subscribeForm = document.querySelector('.footer-subscribe form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = subscribeForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                const subscribeButton = subscribeForm.querySelector('button');
                subscribeButton.textContent = 'Спасибо!';
                emailInput.value = '';
                
                setTimeout(() => {
                    subscribeButton.textContent = 'Подписаться';
                }, 3000);
            }
        });
    }

    // Создание декоративных шахматных плиток вместо галереи
    const galleryItems = document.querySelectorAll('.gallery-item');
    const chessPieces = ['♟', '♞', '♜', '♛', '♚', '♝'];
    
    galleryItems.forEach((item, index) => {
        // Удаляем старый обработчик клика для галереи без изображений
        item.replaceWith(item.cloneNode(true));
        
        // Создаем эффект наведения без класса
        const newItem = document.querySelectorAll('.gallery-item')[index];
        newItem.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        newItem.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });

    // Добавление шахматного фона к разделам
    const sectionsWithBg = document.querySelectorAll('.about, .events, .volunteer, .contact');
    
    sectionsWithBg.forEach(section => {
        const chessBg = document.createElement('div');
        chessBg.className = 'chess-bg';
        section.appendChild(chessBg);
    });

    // Анимация шахматных фигур
    const chessPieces = document.querySelectorAll('.chess-piece');
    
    chessPieces.forEach((piece, index) => {
        piece.style.animationDelay = `${index * 0.2}s`;
        piece.classList.add('animated-piece');
    });

    // Добавляем дополнительные стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        .animate-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animated-piece {
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #ff5252;
        }
        
        .success-message {
            padding: 20px;
            background-color: #4ecdc4;
            color: white;
            border-radius: 10px;
            text-align: center;
            font-weight: 700;
        }
    `;
    
    document.head.appendChild(style);
}); 
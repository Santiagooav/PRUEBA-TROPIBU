// ===== CONFIGURACIÓN DE REDES SOCIALES =====
// Actualiza estos enlaces con tus redes sociales
const socialLinks = {
    whatsapp: 'https://wa.me/593979487721', // Reemplaza con tu número
    instagram: 'https://www.instagram.com/tropicalburger__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', // Reemplaza con tu usuario
    facebook: 'https://www.facebook.com/profile.php?id=61581626505007&locale=es_LA', // Reemplaza con tu página
    tiktok: 'https://www.tiktok.com/@tropicalburger?is_from_webapp=1&sender_device=pc' // Reemplaza con tu usuario
};

// ===== NAVEGACIÓN MÓVIL =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Ajuste para navbar fija
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR AL HACER SCROLL =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== ANIMACIONES AL HACER SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .social-card, .about-content'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// ===== MODAL DE GALERÍA =====
const modal = document.getElementById('portfolioModal');
const modalClose = document.getElementById('modalClose');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');

// Datos de los productos (puedes personalizarlos)
const portfolioData = {
    'hamburguesas': [
        {
            title: 'Tropical Chiqui Burger',
            description: '---------------------------------------',
            category: 'Hamburguesas'
        },
        {
            title: 'Tropical Bacon Cheezy',
            description: '---------------------------------------',
            category: 'Hamburguesas'
        },
        {
            title: 'Tropical Bacon Rigs',
            description: '---------------------------------------',
            category: 'Hamburguesas'
        },
        {
            title: 'Tropical Monster Burger',
            description: '---------------------------------------',
            category: 'Hamburguesas'
        }
    ],
    'hotdogs': [
        {
            title: 'Crispy Classic Dog',
            description: '---------------------------------------',
            category: 'Hotdogs'
        },
        {
            title: 'Mozar Sweet Dog',
            description: '---------------------------------------',
            category: 'Hotdogs'
        },
        {
            title: 'Chili Cheezy Dog',
            description: '---------------------------------------',
            category: 'Hotdogs'
        }
    ],
    'combos': [
        {
            title: 'Combo *******',
            description: '--------------------------------',
            category: 'Combos'
        },
        {
            title: 'Combo ******* ',
            description: '-----------------------------------',
            category: 'Combos'
        },
        {
            title: 'Combo *******',
            description: '----------------------------------- ',
            category: 'Combos'
        }
    ]
};

// Abrir modal al hacer click en item del portfolio
portfolioItems.forEach((item, globalIndex) => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        const itemIndex = item.getAttribute('data-index');
        
        // Calcular el índice correcto dentro de la categoría
        let categoryIndex = 0;
        if (itemIndex) {
            categoryIndex = parseInt(itemIndex);
        } else {
            // Contar cuántos items de esta categoría hay antes de este
            const itemsBeforeThis = Array.from(portfolioItems).slice(0, globalIndex);
            categoryIndex = itemsBeforeThis.filter(i => 
                i.getAttribute('data-category') === category
            ).length;
        }
        
        // Obtener los datos según categoría e índice
        let data;
        if (portfolioData[category] && Array.isArray(portfolioData[category])) {
            // Si la categoría existe y es un array
            data = portfolioData[category][categoryIndex];
            
            // Si el índice está fuera de rango, usar el primero
            if (!data) {
                data = portfolioData[category][0];
            }
        }
        
        // Mostrar los datos en el modal
        if (data) {
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modalCategory.textContent = data.category;
        } else {
            // Datos por defecto si no se encuentra información
            modalTitle.textContent = 'Producto Tropical Burger';
            modalDescription.textContent = 'Delicioso producto preparado con ingredientes frescos y nuestro sabor característico.';
            modalCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Cerrar modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===== APLICAR ENLACES DE REDES SOCIALES =====
document.querySelectorAll('.social-card').forEach(card => {
    const network = card.getAttribute('data-network');
    if (socialLinks[network]) {
        card.href = socialLinks[network];
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        
        // Asegurar que el click funcione correctamente
        card.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank', 'noopener,noreferrer');
        });
    }
});

// ===== OCULTAR SCROLL INDICATOR AL HACER SCROLL =====
window.addEventListener('scroll', () => {
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        if (window.pageYOffset > 100) {
            scrollDown.style.opacity = '0';
            scrollDown.style.pointerEvents = 'none';
        } else {
            scrollDown.style.opacity = '1';
            scrollDown.style.pointerEvents = 'auto';
        }
    }
});

// ===== ACTIVAR LINK ACTUAL EN LA NAVEGACIÓN =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== PREVENIR SCROLL HORIZONTAL =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflowX = 'hidden';
});

console.log('🍔 Tropical Burger - Landing Page cargada exitosamente');
console.log('📝 Productos cargados:');
console.log(`  - ${portfolioData.hamburguesas.length} Hamburguesas`);
console.log(`  - ${portfolioData.hotdogs.length} Hotdogs`);
console.log(`  - ${portfolioData.combos.length} Combos`);
console.log('💡 Recuerda actualizar los enlaces de redes sociales en script.js');



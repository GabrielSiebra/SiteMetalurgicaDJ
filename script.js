/**
 * METALLIC | TASTE SKILL JAVASCRIPT
 * ----------------------------------
 * Handles interactions, magnetic effects, and scroll observer.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MAGNETIC BUTTONS (Taste Skill Signature) ---
    // Cria o efeito de botão que segue o cursor suavemente (física magnética)
    const magneticElements = document.querySelectorAll('.magnetic-btn');

    magneticElements.forEach((el) => {
        // Criar um envelope invisível para captar a área magnética maior que o botão
        const wrapper = document.createElement('div');
        wrapper.style.display = 'inline-block';
        wrapper.style.position = 'relative';
        
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);

        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            // Calcula a posição do mouse em relação ao centro do elemento
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Intensidade da força magnética (reduzida para ser sutil)
            const force = 0.3;
            
            // Aplica a transformação usando requestAnimationFrame no CSS
            el.style.transform = `translate(${x * force}px, ${y * force}px) scale(1.02)`;
        });

        wrapper.addEventListener('mouseleave', () => {
            // physics snap-back
            el.style.transform = `translate(0px, 0px) scale(1)`;
            el.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        });
        
        wrapper.addEventListener('mouseenter', () => {
            el.style.transition = 'none'; // Desliga a transição CSS pra ser imediato via JS no movimento
        });
    });

    // --- 2. SCROLL REVEAL (Intersection Observer) ---
    // Anima a entrada de elementos baseada na rolagem da página
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => revealObserver.observe(el));

    // --- 3. GLASS TOPBAR SCROLL EFFECT ---
    // Adiciona sombra e diminui altura no scroll
    const topbar = document.querySelector('.topbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            topbar.style.top = '1rem';
            topbar.style.padding = '0 1rem';
            topbar.style.backgroundColor = 'rgba(10, 17, 32, 0.85)';
            topbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
        } else {
            topbar.style.top = '1.5rem';
            topbar.style.padding = '0 1.5rem';
            topbar.style.backgroundColor = 'rgba(10, 17, 32, 0.7)';
            topbar.style.boxShadow = 'none';
        }
    });

    // --- 4. SMOOTH INTERNAL NAVIGATION ---
    const navLinks = document.querySelectorAll('.nav-links a, .hero-actions a, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    const topPos = targetEl.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({
                        top: topPos,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 5. WHATSAPP DYNAMIC MESSAGE ---
    // Atualiza o link do WhatsApp com base no produto selecionado no dropdown
    const productSelect = document.getElementById('product-select');
    const whatsappLink = document.getElementById('whatsapp-link');
    
    if (productSelect && whatsappLink) {
        productSelect.addEventListener('change', (e) => {
            const selectedItem = e.target.value;
            const baseUrl = "https://wa.me/5585987399988?text=";
            let message = "Olá, gostaria de solicitar um orçamento com a DJ Vendas.";
            
            if (selectedItem !== "geral" && selectedItem !== "Outros") {
                message = `Olá, gostaria de solicitar um orçamento para: *${selectedItem}*.`;
            } else if (selectedItem === "Outros") {
                message = `Olá, gostaria de tirar dúvidas e solicitar um orçamento de outras soluções da DJ Vendas.`;
            }

            whatsappLink.href = baseUrl + encodeURIComponent(message);
        });
    }
});

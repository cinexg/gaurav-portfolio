// --- DATA ---
const myProjects = [
    { 
        id: "skyline", 
        title: "Skyline", 
        tag: "Generative", 
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", 
        url: "works/skyline.html" // <-- Removed the leading slash
    }
];

const myStack = [
    { name: "Midjourney", desc: "AI Generation", icon: "🎨", bg: "#e8f0fe", color: "#1a73e8", url: "https://midjourney.com" },
    { name: "Framer", desc: "Website Builder", icon: "⚡", bg: "#f3f3f3", color: "#000000", url: "https://framer.com" },
    { name: "Lemon Squeezy", desc: "Payment Platform", icon: "🍋", bg: "#fff0f5", color: "#d81b60", url: "https://lemonsqueezy.com" },
    { name: "Figma", desc: "Design Tool", icon: "F", bg: "#fce8e6", color: "#ea4335", url: "https://figma.com" },
    { name: "Typefully", desc: "Writer for Twitter", icon: "✍️", bg: "#e3f2fd", color: "#1976d2", url: "https://typefully.com" },
    { name: "Linear", desc: "Project Management", icon: "L", bg: "#e8eaf6", color: "#3f51b5", url: "https://linear.app" },
    { name: "Python", desc: "Logic & Backend", icon: "🐍", bg: "#e8f5e9", color: "#388e3c", url: "https://python.org" },
    { name: "Webflow", desc: "Visual Development", icon: "W", bg: "#e1f5fe", color: "#03a9f4", url: "https://webflow.com" }
];

const myBlogs = [
    { 
        id: "my-creative-process", 
        title: "My Creative Process", 
        date: "Mar 14, 2026", 
        category: "Process", 
        readTime: "3min read", 
        url: "blog/my-creative-process.html" // <-- Removed the leading slash
    }
];

// --- CONFIGURATION ---
const ITEMS_PER_PAGE = 6; // Change this number to show more/less items per page
let currentWorksPage = 1;
let currentBlogsPage = 1;

// --- PAGINATION LOGIC ---
// --- PAGINATION LOGIC ---
function renderPagination(containerId, totalItems, currentPage, onPageChange) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    if (totalPages <= 1) return; // Hide pagination if everything fits on one page

    // 1. Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerText = '← Prev';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => onPageChange(currentPage - 1);
    container.appendChild(prevBtn);

    // 2. Determine which numbers to show (The Truncation Logic)
    function getPaginationRange(current, total) {
        // If 5 or fewer pages, just show them all
        if (total <= 5) return Array.from({length: total}, (_, i) => i + 1);
        
        // If we are near the start
        if (current <= 3) return [1, 2, 3, 4, '...', total];
        
        // If we are near the end
        if (current >= total - 2) return [1, '...', total - 3, total - 2, total - 1, total];
        
        // If we are somewhere in the middle
        return [1, '...', current - 1, current, current + 1, '...', total];
    }

    const pagesToShow = getPaginationRange(currentPage, totalPages);

    // 3. Render the numbers and ellipses
    pagesToShow.forEach(item => {
        if (item === '...') {
            const ellipsis = document.createElement('span');
            ellipsis.style.padding = '0.6rem';
            ellipsis.style.color = 'var(--text-muted)';
            ellipsis.style.fontWeight = '600';
            ellipsis.innerText = '...';
            container.appendChild(ellipsis);
        } else {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${item === currentPage ? 'active' : ''}`;
            pageBtn.innerText = item;
            pageBtn.onclick = () => onPageChange(item);
            container.appendChild(pageBtn);
        }
    });

    // 4. Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerText = 'Next →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => onPageChange(currentPage + 1);
    container.appendChild(nextBtn);
}

// --- RENDER FUNCTIONS ---
// Updated to handle both the Home Page (limited) and Works Page (paginated)
function renderProjects(containerId, limit = null, page = 1, isPaginated = false) {
    const grid = document.getElementById(containerId);
    if (!grid) return; 
    
    grid.innerHTML = ''; 
    
    let projectsToShow = myProjects;
    
    // If we are on the Works page, slice the array for the current page
    if (isPaginated) {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        projectsToShow = myProjects.slice(startIndex, endIndex);
    } else if (limit) {
        // If we are on the Home page, just show the latest 'limit'
        projectsToShow = myProjects.slice(0, limit);
    }
    
    projectsToShow.forEach((project, index) => {
        const card = document.createElement('a');
        card.href = project.url;
        card.className = 'glass-card interactive-card work-card animate-on-scroll visible'; // Auto-visible on pagination
        card.style.transitionDelay = `${index * 0.05}s`;
        card.style.display = 'block'; 
        
        card.innerHTML = `
            <div class="work-image-container"><img src="${project.thumbnail}" alt="${project.title}" class="work-image" loading="lazy"></div>
            <div class="work-info">
                <span class="work-title">
                    <span class="work-title-dots animated-dots"><span class="dot-1"></span><span class="dot-2"></span></span> 
                    ${project.title}
                </span>
                <span class="work-tag">${project.tag}</span>
            </div>`;
        grid.appendChild(card);
    });

    if (isPaginated) {
        renderPagination('works-pagination', myProjects.length, page, (newPage) => {
            currentWorksPage = newPage;
            renderProjects(containerId, null, currentWorksPage, true);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls user back to top of grid
        });
    }
}

// Updated to handle Blog Page pagination
function renderBlogs(containerId, page = 1) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const blogsToShow = myBlogs.slice(startIndex, endIndex);
    
    blogsToShow.forEach((blog, index) => {
        const card = document.createElement('a');
        card.href = blog.url;
        card.className = 'glass-card interactive-card work-card animate-on-scroll visible';
        card.style.padding = '1.8rem';
        card.style.transitionDelay = `${index * 0.05}s`;
        card.style.display = 'block';
        
        card.innerHTML = `
            <div style="margin-bottom: 1.2rem; display: flex; align-items: center;">
                <span class="work-tag" style="background: var(--hover-bg);">${blog.category}</span>
                <span style="color: var(--text-muted); font-size: 0.9rem; margin-left: 0.8rem;">${blog.date}</span>
            </div>
            <h3 style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.8rem; color: var(--text-main); letter-spacing: -0.01em;">${blog.title}</h3>
            <p style="color: var(--text-muted); font-size: 1rem;">${blog.readTime}</p>`;
        grid.appendChild(card);
    });

    renderPagination('blog-pagination', myBlogs.length, page, (newPage) => {
        currentBlogsPage = newPage;
        renderBlogs(containerId, currentBlogsPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function renderStack() {
    const grid = document.getElementById('dynamic-stack-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    myStack.forEach((item, index) => {
        grid.innerHTML += `
            <a href="${item.url}" target="_blank" class="stack-item animate-on-scroll" style="transition-delay: ${index * 0.05}s">
                <div class="stack-content-left">
                    <div class="stack-icon" style="background: ${item.bg}; color: ${item.color};">${item.icon}</div>
                    <div class="stack-info"><span class="stack-name">${item.name}</span><span class="stack-desc">${item.desc}</span></div>
                </div>
                <div class="stack-link-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </div>
            </a>`;
    });
}

// --- ANIMATIONS & UI LOGIC ---
let scrollObserver;

function initScrollAnimations() {
    if(scrollObserver) scrollObserver.disconnect();
    const elements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });
    elements.forEach(el => scrollObserver.observe(el));
}

const sunSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const moonSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

function toggleTheme() {
    const icons = [document.getElementById('theme-icon'), document.getElementById('mobile-theme-icon')];
    icons.forEach(icon => { if(icon) { icon.style.transform = 'rotate(180deg) scale(0.5)'; icon.style.opacity = '0'; }});

    setTimeout(() => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        icons.forEach(icon => {
            if(icon) {
                icon.innerHTML = isDark ? sunSVG : moonSVG;
                icon.style.transform = 'rotate(360deg) scale(1)';
                icon.style.opacity = '1';
                setTimeout(() => {
                    icon.style.transition = 'none'; icon.style.transform = 'none'; void icon.offsetWidth;
                    icon.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
                }, 500);
            }
        });
    }, 250);
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if(mobileMenu && mobileBtn) {
        mobileMenu.classList.toggle('active');
        mobileBtn.classList.toggle('active');
    }
}

// --- MAGNETIC BUTTONS ---
function initMagneticButtons() {
    // Select the buttons we want to make magnetic. 
    // We are targeting the theme button, submit buttons, and social pills.
    const magneticElements = document.querySelectorAll('.nav-btn, .submit-btn, .social-pill, .social-icon');

    // Only apply this on desktop (touchscreens don't have mouse movement)
    if (window.innerWidth > 768) {
        magneticElements.forEach(elem => {
            elem.addEventListener('mousemove', function(e) {
                const rect = elem.getBoundingClientRect();
                
                // Calculate the mouse position relative to the center of the button
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // The pull strength (0.3 = button moves 30% of the distance to the cursor)
                const pullStrength = 0.3;
                
                // Fast transition while tracking the mouse to prevent lag
                elem.style.transition = 'transform 0.1s linear';
                elem.style.transform = `translate(${x * pullStrength}px, ${y * pullStrength}px)`;
            });

            elem.addEventListener('mouseleave', function() {
                // When the mouse leaves, snap back to the center
                // Using a cubic-bezier timing function gives it a satisfying "springy" bounce
                elem.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                elem.style.transform = 'translate(0px, 0px)';
            });
        });
    }
}

// --- SLIDESHOW ---
const slideshowImages = [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" 
];
let currentSlide = 0; let slideInterval;

function initSlideshow() {
    const track = document.getElementById('slideshow-track');
    const dotsContainer = document.getElementById('slideshow-dots');
    if (!track || !dotsContainer || slideshowImages.length === 0) return;
    
    track.innerHTML = ''; dotsContainer.innerHTML = '';
    slideshowImages.forEach((src, index) => {
        const img = document.createElement('img'); img.src = src; img.className = 'slide'; track.appendChild(img);
        const dot = document.createElement('div'); dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index); dotsContainer.appendChild(dot);
    });
    if (slideshowImages.length > 1) slideInterval = setInterval(nextSlide, 4000);
}

function goToSlide(index) {
    currentSlide = index;
    const track = document.getElementById('slideshow-track');
    if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    clearInterval(slideInterval); slideInterval = setInterval(nextSlide, 4000);
}

function nextSlide() { goToSlide((currentSlide + 1) % slideshowImages.length); }


// --- IN-PAGE LIVE SEARCH ---
function initInPageSearch() {
    const worksSearch = document.getElementById('works-search');
    const blogSearch = document.getElementById('blog-search');

    // 1. Works Page Filtering
    if (worksSearch) {
        worksSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const grid = document.getElementById('full-works-grid');
            const pagination = document.getElementById('works-pagination');
            
            // If search is empty, bring back the normal paginated view
            if (query === '') {
                pagination.style.display = 'flex';
                renderProjects('full-works-grid', null, 1, true); 
                return;
            }

            // Hide pagination while searching
            pagination.style.display = 'none'; 
            const matched = myProjects.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.tag.toLowerCase().includes(query)
            );

            grid.innerHTML = '';
            if (matched.length === 0) {
                grid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1 / -1; padding: 2rem 0;">No projects found matching that keyword.</p>';
                return;
            }

            // Render matched projects instantly
            matched.forEach(project => {
                const card = document.createElement('a');
                card.href = project.url;
                card.className = 'glass-card interactive-card work-card visible';
                card.style.display = 'block';
                card.innerHTML = `
                    <div class="work-image-container"><img src="${project.thumbnail}" alt="${project.title}" class="work-image" loading="lazy"></div>
                    <div class="work-info">
                        <span class="work-title">
                            <span class="work-title-dots animated-dots"><span class="dot-1"></span><span class="dot-2"></span></span> 
                            ${project.title}
                        </span>
                        <span class="work-tag">${project.tag}</span>
                    </div>`;
                grid.appendChild(card);
            });
        });
    }

    // 2. Blog Page Filtering
    if (blogSearch) {
        blogSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const grid = document.getElementById('full-blog-grid');
            const pagination = document.getElementById('blog-pagination');
            
            // If search is empty, bring back the normal paginated view
            if (query === '') {
                pagination.style.display = 'flex';
                renderBlogs('full-blog-grid', 1); 
                return;
            }

            // Hide pagination while searching
            pagination.style.display = 'none';
            const matched = myBlogs.filter(b => 
                b.title.toLowerCase().includes(query) || 
                b.category.toLowerCase().includes(query)
            );

            grid.innerHTML = '';
            if (matched.length === 0) {
                grid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1 / -1; padding: 2rem 0;">No journal entries found matching that keyword.</p>';
                return;
            }

            // Render matched blogs instantly
            matched.forEach(blog => {
                const card = document.createElement('a');
                card.href = blog.url;
                card.className = 'glass-card interactive-card work-card visible';
                card.style.padding = '1.8rem';
                card.style.display = 'block';
                card.innerHTML = `
                    <div style="margin-bottom: 1.2rem; display: flex; align-items: center;">
                        <span class="work-tag" style="background: var(--hover-bg);">${blog.category}</span>
                        <span style="color: var(--text-muted); font-size: 0.9rem; margin-left: 0.8rem;">${blog.date}</span>
                    </div>
                    <h3 style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.8rem; color: var(--text-main); letter-spacing: -0.01em;">${blog.title}</h3>
                    <p style="color: var(--text-muted); font-size: 1rem;">${blog.readTime}</p>`;
                grid.appendChild(card);
            });
        });
    }
}


// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        [document.getElementById('theme-icon'), document.getElementById('mobile-theme-icon')].forEach(icon => { if(icon) icon.innerHTML = sunSVG; });
    }

    // Initialize Home Page
    renderProjects('home-works-grid', 2, 1, false); // limit to 2, no pagination
    
    // Initialize Works Page
    renderProjects('full-works-grid', null, 1, true); // no limit, yes pagination
    
    // Initialize Blog Page
    renderBlogs('full-blog-grid', 1); // Blog pages automatically use pagination now
    
    renderStack();
    initSlideshow();
    
    setTimeout(initScrollAnimations, 100);

    initInPageSearch();

    initMagneticButtons();

    // --- SPOTLIGHT HOVER EFFECT ---
    function initSpotlightEffect() {
        const cards = document.querySelectorAll('.glass-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }


});


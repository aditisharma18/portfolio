/* ==========================================================================
   ADITI SHARMA - PORTFOLIO INTERACTIVITY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. THEME SWITCHER (DARK / LIGHT MODE) WITH STORAGE PERSISTENCE
       ---------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElem = document.documentElement;

    const savedTheme = localStorage.getItem('aditi_portfolio_theme') || 'dark';
    htmlElem.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElem.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElem.setAttribute('data-theme', newTheme);
            localStorage.setItem('aditi_portfolio_theme', newTheme);
        });
    }

    /* ----------------------------------------------------------------------
       2. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTING
       ---------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ----------------------------------------------------------------------
       3. MOBILE HAMBURGER MENU DRAWER
       ---------------------------------------------------------------------- */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        });
    });

    /* ----------------------------------------------------------------------
       4. HERO TYPING ANIMATION EFFECT
       ---------------------------------------------------------------------- */
    const typedTextElem = document.getElementById('typed-text');
    const roles = [
        "Full Stack Web Apps",
        "C++ & ASP.NET Backend Systems",
        "Patent-Backed IoT Solutions",
        "SQL Query Optimization (30% Speedup)"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typedTextElem) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedTextElem.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElem.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 35 : 75;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 350;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    /* ----------------------------------------------------------------------
       5. PROJECT CATEGORY FILTERING
       ---------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ----------------------------------------------------------------------
       6. RESUME PREVIEW & DOWNLOAD MODAL
       ---------------------------------------------------------------------- */
    const openResumeBtn = document.getElementById('open-resume-btn');
    const downloadCvBtn = document.getElementById('download-cv-btn');
    const resumeModal = document.getElementById('resume-modal');
    const closeResumeModalBtn = document.getElementById('close-resume-modal');
    const printResumeBtn = document.getElementById('print-resume-btn');
    const downloadTxtResumeBtn = document.getElementById('download-txt-resume-btn');

    function openResume() {
        if (resumeModal) {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeResume() {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
    if (downloadCvBtn) downloadCvBtn.addEventListener('click', openResume);
    if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResume);

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) closeResume();
        });
    }

    if (printResumeBtn) {
        printResumeBtn.addEventListener('click', () => {
            window.print();
        });
    }

    function downloadResumeFile() {
        const resumeText = `====================================================================
ADITI SHARMA - FULL STACK DEVELOPER
Email: aditisharma1812004@gmail.com | Phone: +917477083125
Location: India
====================================================================

SUMMARY
Results-driven Computer Science graduate and aspiring Full Stack Developer skilled in C++, Java, Python, C#, ASP.NET Core MVC, SQL, and JavaScript. Passionate about building efficient software solutions, backend development, problem-solving, and continuous learning.

WORK EXPERIENCE
--------------------------------------------------------------------
Full Stack Developer Apprentice | GAIL (India) Limited (Sept 2025 - Present)
- Optimized SQL queries and automated report generation for the Employee Management System, accelerating data retrieval by 30% across 10+ departments.
- Delivered a unified platform for managing 500+ employee and contract staff records, reducing manual data handling by 40% and improving HR efficiency.
- Collaborated with cross-functional teams to streamline reporting workflows, enabling faster, data-driven decision-making for management.
- Enhanced application performance by debugging and refactoring backend logic, resulting in more reliable and scalable solutions.

Web Development Internship | CodersCave (May 2023 - April 2023)
- Developed and deployed a responsive portfolio website using HTML, CSS, JavaScript, and Git/GitHub for version control.
- Implemented modern UI/UX principles to create an interactive and mobile-friendly web application.
- Optimized website performance and maintained clean, reusable code following industry-standard web development practices.

PROJECTS
--------------------------------------------------------------------
1. IoT-enabled Women Safety Jacket (Patent Published)
   - Developed an IoT-enabled Women Safety Jacket with 40% improved emergency response capability using ESP8266.
   - Implemented an electric shock self-defense mechanism for enhanced user safety.
   - Successfully tested a real-time location and emergency alert system for registered contacts.

2. Multiple Disease Prediction
   - Developed a machine learning-based disease prediction application using Python and Streamlit.
   - Integrated predictive ML models for symptom-based disease analysis.
   - Designed an interactive UI for real-time predictions.

3. EV Charging Slot Booking
   - Developed a web-based EV charging slot booking platform using ASP.NET Core MVC and SQL Server.
   - Implemented user authentication, slot scheduling, and booking management features.
   - Reduced waiting time through optimized slot allocation logic.

EDUCATION
--------------------------------------------------------------------
B.Tech (CSE) | Gyan Ganga Institute of Technology and Sciences (2020 - 2024)
GPA: 8.63 / 10.0

SKILLS
--------------------------------------------------------------------
Programming Languages: C, C++, Python, C#, SQL, JavaScript, Java
Frameworks: ASP.NET Core MVC, Streamlit
Databases: SQL Server
Tools: Version Control (Git), GitHub, Jupyter Notebook, Visual Studio
Software Engineering: OOP, DSA, SDLC, REST APIs, MVC Architecture

ACHIEVEMENTS
--------------------------------------------------------------------
- Granted a patent for an IoT-enabled women safety jacket featuring real-time alert and defense mechanisms.
- Participated in Smart India Hackathon (SIH).
- Solved 300+ DSA problems on LeetCode.
====================================================================`;

        const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Aditi_Sharma_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    if (downloadTxtResumeBtn) downloadTxtResumeBtn.addEventListener('click', downloadResumeFile);

    /* ----------------------------------------------------------------------
       7. PROJECT DETAIL MODAL POPUP
       ---------------------------------------------------------------------- */
    const projectModal = document.getElementById('project-modal');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectBody = document.getElementById('modal-project-body');
    const closeProjectModalBtn = document.getElementById('close-project-modal');
    const closeProjectFooterBtn = document.getElementById('close-project-footer-btn');

    const projectData = {
        "1": {
            title: "IoT-enabled Women Safety Jacket (Patent Published)",
            category: "Hardware IoT & Embedded Security",
            badgeText: "ESP8266 + Real-Time Location Alert",
            summary: "An innovative wearable security solution designed to mitigate emergency response delay during critical situations.",
            tech: ["ESP8266 Wi-Fi Module", "GPS Tracking Sensor", "Pulse & Panic Sensors", "Electric Shock Defense Circuit", "C++ Firmware"],
            details: [
                "Granted official patent recognition for real-time threat response and automated alert dispatch.",
                "Accelerated emergency contact notification latency by 40% using optimized ESP8266 HTTP payload packets.",
                "Designed low-voltage non-lethal electric shock defense trigger for physical protection.",
                "Tested under real-world connectivity scenarios to guarantee high accuracy GPS transmission."
            ]
        },
        "2": {
            title: "Multiple Disease Prediction System",
            category: "Artificial Intelligence & Machine Learning",
            badgeText: "Streamlit UI + Scikit-Learn ML Models",
            summary: "A healthcare predictive modeling web tool built using Python and Streamlit to analyze symptom inputs and provide early risk scores.",
            tech: ["Python 3.x", "Streamlit UI", "Scikit-Learn", "Pandas & NumPy", "Random Forest Classifiers"],
            details: [
                "Trained machine learning classification models on verified medical datasets for multi-disease diagnosis.",
                "Designed a user-friendly, responsive Streamlit dashboard with real-time risk assessment indicators.",
                "Enabled doctors and patients to input clinical metrics (blood pressure, glucose, BMI) and receive immediate predictions."
            ]
        },
        "3": {
            title: "EV Charging Slot Booking Platform",
            category: "Full-Stack Enterprise Web Application",
            badgeText: "ASP.NET Core MVC + SQL Server",
            summary: "A web platform engineered for electric vehicle drivers to reserve charging slots at nearby stations without queuing delays.",
            tech: ["ASP.NET Core MVC", "C#", "SQL Server", "Entity Framework Core", "Bootstrap"],
            details: [
                "Implemented secure authentication and role-based access control for EV owners and station operators.",
                "Developed optimized slot allocation algorithm to minimize queue waiting times across charging hubs.",
                "Created relational SQL schema handling real-time reservation logs, station availability, and payment statuses."
            ]
        }
    };

    const openDetailsBtns = document.querySelectorAll('.open-details-btn');
    openDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pId = btn.getAttribute('data-project');
            const data = projectData[pId];
            if (!data || !projectModal) return;

            modalProjectTitle.textContent = data.title;
            modalProjectBody.innerHTML = `
                <div style="background: rgba(0, 242, 254, 0.08); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between;">
                    <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary-color);"><i class="fa-solid fa-code-branch"></i> ${data.category}</span>
                    <span style="font-size: 0.75rem; font-family: 'Fira Code', monospace; color: var(--text-muted);">${data.badgeText}</span>
                </div>
                <div style="margin-bottom: 1rem;">
                    <p style="font-size: 1.05rem; color: var(--text-main);">${data.summary}</p>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom: 0.5rem; color: var(--text-main); font-size: 1rem;">Key Highlights & Architecture:</h4>
                    <ul style="list-style-type: disc; padding-left: 1.25rem;">
                        ${data.details.map(d => `<li style="margin-bottom: 0.4rem; font-size: 0.95rem; color: var(--text-muted);">${d}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4 style="margin-bottom: 0.5rem; color: var(--text-main); font-size: 1rem;">Technologies Used:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${data.tech.map(t => `<span style="font-size: 0.8rem; font-family: 'Fira Code', monospace; padding: 0.3rem 0.6rem; background: rgba(0,242,254,0.1); border: 1px solid rgba(0,242,254,0.25); color: var(--primary-color); border-radius: 4px;">${t}</span>`).join('')}
                    </div>
                </div>
            `;

            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeProjectModal() {
        if (projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectModal);
    if (closeProjectFooterBtn) closeProjectFooterBtn.addEventListener('click', closeProjectModal);

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeProjectModal();
        });
    }

    /* ----------------------------------------------------------------------
       8. CONTACT FORM HANDLING
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent successfully! Aditi will contact you soon.';
                
                contactForm.reset();

                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 6000);
            }, 1200);
        });
    }

});

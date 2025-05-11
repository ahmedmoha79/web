/**
 * Wazambi Fleet Tracker PRO - Enterprise Fleet Intelligence Platform
 * Main JavaScript File with Immersive 3D Effects and Interactive Components
 */

document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // PRELOADER ANIMATION
    // =========================================================================
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => preloader.style.display = 'none'
            });
        });
    }

    // =========================================================================
    // 3D CORRIDOR SCENE WITH THREE.JS
    // =========================================================================
    function initCorridorScene() {
        const corridorContainer = document.getElementById('corridorScene');
        if (!corridorContainer) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        corridorContainer.appendChild(renderer.domElement);

        // Create corridor geometry
        const corridorWidth = 20;
        const corridorHeight = 10;
        const corridorDepth = 100;
        
        // Corridor walls
        const wallGeometry = new THREE.BoxGeometry(corridorWidth, corridorHeight, corridorDepth);
        const wallMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x0a0a1a,
            side: THREE.BackSide,
            transparent: true,
            opacity: 0.8
        });

        // Left wall
        const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
        leftWall.position.x = -corridorWidth / 2;
        leftWall.position.z = -corridorDepth / 2;
        scene.add(leftWall);

        // Right wall
        const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
        rightWall.position.x = corridorWidth / 2;
        rightWall.position.z = -corridorDepth / 2;
        scene.add(rightWall);

        // Floor
        const floorGeometry = new THREE.BoxGeometry(corridorWidth * 2, 0.5, corridorDepth);
        const floorMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x1a1a2e,
            transparent: true,
            opacity: 0.7
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -corridorHeight / 2;
        floor.position.z = -corridorDepth / 2;
        scene.add(floor);

        // Ceiling
        const ceiling = new THREE.Mesh(floorGeometry, floorMaterial);
        ceiling.position.y = corridorHeight / 2;
        ceiling.position.z = -corridorDepth / 2;
        scene.add(ceiling);

        // Add corridor lines for depth perception
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2a5bd7, opacity: 0.3, transparent: true });
        
        for (let i = 0; i < corridorDepth; i += 5) {
            const points = [];
            points.push(new THREE.Vector3(-corridorWidth/2, 0, -i));
            points.push(new THREE.Vector3(corridorWidth/2, 0, -i));
            
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
        }

        // Add floating particles
        const particleCount = 100;
        const particles = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleSizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            particlePositions[i * 3] = (Math.random() - 0.5) * corridorWidth * 0.8;
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * corridorHeight * 0.8;
            particlePositions[i * 3 + 2] = -Math.random() * corridorDepth;
            particleSizes[i] = Math.random() * 0.5 + 0.1;
        }

        particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0x2a5bd7,
            size: 0.2,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x2a5bd7, 0.5);
        directionalLight.position.set(0, 1, 0);
        scene.add(directionalLight);

        // Camera position
        camera.position.z = 5;
        camera.position.y = 2;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Rotate corridor slightly
            leftWall.rotation.y += 0.001;
            rightWall.rotation.y -= 0.001;
            
            // Move particles
            const positions = particles.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3 + 2] += 0.1;
                if (positions[i * 3 + 2] > 0) {
                    positions[i * 3 + 2] = -corridorDepth;
                }
            }
            particles.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Parallax effect on mouse move
        document.addEventListener('mousemove', function(e) {
            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            const mouseY = (e.clientY / window.innerHeight) * 2 - 1;
            
            camera.position.x = mouseX * 0.5;
            camera.position.y = -mouseY * 0.5 + 2;
        });
    }

    // Initialize corridor scene
    initCorridorScene();

    // =========================================================================
    // MOBILE NAVIGATION TOGGLE
    // =========================================================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // =========================================================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
                
                // Scroll to target
                gsap.to(window, {
                    duration: 1,
                    ease: 'power2.inOut',
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    }
                });
            }
        });
    });

    // =========================================================================
    // FEATURE TABS
    // =========================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // =========================================================================
    // VIDEO PLAYER CONTROLS
    // =========================================================================
    const videoWrapper = document.querySelector('.video-wrapper');
    const video = document.querySelector('.demo-video');
    const playBtn = document.querySelector('.play-btn');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeDisplay = document.querySelector('.current-time');
    const durationDisplay = document.querySelector('.duration');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    
    if (video && playBtn) {
        // Play/Pause toggle
        playBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                videoWrapper.classList.add('playing');
                this.innerHTML = '<i class="bi bi-pause-fill"></i>';
            } else {
                video.pause();
                videoWrapper.classList.remove('playing');
                this.innerHTML = '<i class="bi bi-play-fill"></i>';
            }
        });
        
        // Update progress bar
        video.addEventListener('timeupdate', function() {
            const percent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${percent}%`;
            
            // Update time displays
            currentTimeDisplay.textContent = formatTime(video.currentTime);
            
            // Only set duration once
            if (durationDisplay.textContent === '0:00' && !isNaN(video.duration)) {
                durationDisplay.textContent = formatTime(video.duration);
            }
        });
        
        // Click on progress bar to seek
        const videoProgress = document.querySelector('.video-progress');
        if (videoProgress) {
            videoProgress.addEventListener('click', function(e) {
                const pos = (e.pageX - this.offsetLeft) / this.offsetWidth;
                video.currentTime = pos * video.duration;
            });
        }
        
        // Fullscreen toggle
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', function() {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            });
        }
        
        // Format time as MM:SS
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }
    }

    // =========================================================================
    // TESTIMONIAL SLIDER
    // =========================================================================
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (testimonials.length > 1) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentTestimonial = index;
        }
        
        // Next testimonial
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                let nextIndex = currentTestimonial + 1;
                if (nextIndex >= testimonials.length) nextIndex = 0;
                showTestimonial(nextIndex);
            });
        }
        
        // Previous testimonial
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                let prevIndex = currentTestimonial - 1;
                if (prevIndex < 0) prevIndex = testimonials.length - 1;
                showTestimonial(prevIndex);
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showTestimonial(index));
        });
        
        // Auto-advance
        setInterval(() => {
            let nextIndex = currentTestimonial + 1;
            if (nextIndex >= testimonials.length) nextIndex = 0;
            showTestimonial(nextIndex);
        }, 5000);
    }

    // =========================================================================
    // ANIMATE STATS COUNTERS
    // =========================================================================
    const statCounters = document.querySelectorAll('.stat .count[data-count]:not([data-dynamic="true"])');
    
    function animateCounters() {
        statCounters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // Animation duration in ms
            const startTime = Date.now();
            
            function updateCounter() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(progress * target);
                
                counter.textContent = value.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            updateCounter();
        });
    }
    
    // Initialize counters when section is in view
    const statsSection = document.querySelector('.hero-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // =========================================================================
    // FORM VALIDATION AND SUBMISSION
    // =========================================================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--accent-red)';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.querySelector('.btn-text').textContent;
                
                // Show loading state
                submitBtn.querySelector('.btn-text').textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual AJAX call)
                setTimeout(() => {
                    submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
                    submitBtn.style.backgroundColor = 'var(--accent-green)';
                    
                    // Reset form after 2 seconds
                    setTimeout(() => {
                        this.reset();
                        submitBtn.querySelector('.btn-text').textContent = originalText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    }

    // =========================================================================
    // SCROLL REVEAL ANIMATIONS
    // =========================================================================
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // =========================================================================
    // WHATSAPP FLOAT BUTTON HOVER EFFECT
    // =========================================================================
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        whatsappFloat.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        whatsappFloat.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    // =========================================================================
    // DYNAMIC VEHICLE MAP (SIMULATED)
    // =========================================================================
    function initVehicleMap() {
        const mapContainer = document.getElementById('heroMap');
        if (!mapContainer) return;
        
        // Create a simple simulated map (in a real app, use Leaflet/Google Maps)
        mapContainer.innerHTML = `
            <div class="map-overlay" style="
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1a1a2e, #0a0a1a);
                position: relative;
                overflow: hidden;
            ">
                <div class="vehicle-marker" style="
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    border: 2px solid white;
                    transform: translate(-50%, -50%);
                    animation: vehicleMove 10s linear infinite;
                "></div>
                <div class="vehicle-marker" style="
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    border: 2px solid white;
                    transform: translate(-50%, -50%);
                    animation: vehicleMove 8s linear infinite;
                    animation-delay: 2s;
                    left: 30%;
                    top: 40%;
                "></div>
                <div class="vehicle-marker" style="
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    border: 2px solid white;
                    transform: translate(-50%, -50%);
                    animation: vehicleMove 12s linear infinite;
                    animation-delay: 4s;
                    left: 70%;
                    top: 60%;
                "></div>
                <style>
                    @keyframes vehicleMove {
                        0% { transform: translate(-50%, -50%); }
                        25% { transform: translate(-30%, -60%); }
                        50% { transform: translate(-70%, -40%); }
                        75% { transform: translate(-40%, -30%); }
                        100% { transform: translate(-50%, -50%); }
                    }
                </style>
            </div>
        `;
    }
    
    initVehicleMap();

    // =========================================================================
    // DYNAMIC DASHBOARD STATS UPDATE (SIMULATED)
    // =========================================================================
    function simulateLiveStats() {
        const statElements = document.querySelectorAll('.stat .count[data-dynamic="true"]');
        if (!statElements.length) return;
        
        // Update stats every 3 seconds
        setInterval(() => {
            statElements.forEach(stat => {
                const currentValue = parseInt(stat.textContent);
                const maxValue = parseInt(stat.getAttribute('data-count'));
                const newValue = Math.floor(Math.random() * (maxValue + 10)) + (maxValue - 10);
                stat.textContent = Math.max(0, newValue);
            });
        }, 3000);
    }
    
    // Initialize live stats simulation
    simulateLiveStats();
});
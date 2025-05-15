/**
 * Wazambi Website - Optimized Visual Experience
 * Focused on smooth animations and visual effects
 * Version 2.0
 */

class OptimizedVisualEngine {
  constructor() {
    // Initialize GSAP
    if (typeof gsap === 'undefined') {
      console.error('GSAP is not loaded. Please ensure GSAP is included before this script.');
      return;
    }
    
    // Initialize core modules
    this.modules = {
      gsap: gsap
    };
    
    // Register ScrollTrigger and ScrollToPlugin if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      this.modules.scrollTrigger = ScrollTrigger;
    }
    if (typeof ScrollToPlugin !== 'undefined') {
      gsap.registerPlugin(ScrollToPlugin);
    }
    
    this.initialize();
  }

  async initialize() {
    try {
      await this.loadCoreModules();
      this.setupEventListeners();
      this.initCorridorScene();
      this.setupScrollReveal();
      this.setupSmoothScrolling();
      this.initTestimonialSlider();
      this.initFeatureTabs();
      this.initVideoPlayer();
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  async loadCoreModules() {
    try {
      // Load only necessary Three.js
      const threejs = await import('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
      this.modules.threejs = threejs;
    } catch (error) {
      console.error('Failed to load Three.js:', error);
    }
  }

  // =========================================================================
  // OPTIMIZED 3D CORRIDOR SCENE
  // =========================================================================
  initCorridorScene() {
    const corridorContainer = document.getElementById('corridorScene');
    if (!corridorContainer) return;

    // Scene setup with optimized settings
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Disable antialiasing for better performance
      powerPreference: "high-performance"
    });
    
    // Optimize renderer settings
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    corridorContainer.appendChild(renderer.domElement);

    // Simplified corridor parameters
    const corridorParams = {
      width: 30,
      height: 15,
      depth: 300,
      segmentCount: 50, // Reduced segment count
      particleCount: 500 // Reduced particle count
    };

    // Create optimized tunnel effect
    this.createOptimizedTunnel(scene, corridorParams);

    // Add minimal particles
    this.createOptimizedParticles(scene, corridorParams);

    // Basic lighting setup
    this.setupBasicLighting(scene);

    // Camera positioning
    camera.position.set(0, 3, 15);
    const cameraTarget = new THREE.Vector3(0, 0, -100);
    
    // Optimized animation loop
    const clock = new THREE.Clock();
    let lastTime = 0;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Simple camera movement
      camera.position.z -= deltaTime * 10;
      camera.lookAt(cameraTarget);
      
      // Reset camera position
      if (camera.position.z < -corridorParams.depth * 0.5) {
        camera.position.z = 15;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Optimized window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 250);
    });
  }

  createOptimizedTunnel(scene, params) {
    // Simplified tunnel geometry
    const tunnelGeometry = new THREE.CylinderGeometry(
      params.width * 0.8, 
      params.width, 
      params.depth, 
      32, // Reduced segments
      32, 
      true
    );
    
    const tunnelMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a1a,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.95,
      roughness: 0.9,
      metalness: 0.1
    });
    
    const tunnel = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
    tunnel.rotation.x = Math.PI / 2;
    tunnel.position.z = -params.depth / 2;
    scene.add(tunnel);
    
    // Add minimal energy rings
    for (let i = 0; i < params.segmentCount; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(params.width * 0.9, 0.2, 8, 32), // Reduced segments
        new THREE.MeshBasicMaterial({
          color: 0x1a1a2a,
          transparent: true,
          opacity: 0.2
        })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.z = -i * (params.depth / params.segmentCount);
      scene.add(ring);
    }
  }

  createOptimizedParticles(scene, params) {
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(params.particleCount * 3);
    
    for (let i = 0; i < params.particleCount; i++) {
      const i3 = i * 3;
      const radius = params.width * (0.2 + Math.random() * 0.6);
      const angle = Math.random() * Math.PI * 2;
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * params.height * 0.8;
      positions[i3 + 2] = -Math.random() * params.depth;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x2a5bd7,
      size: 0.2,
      transparent: true,
      opacity: 0.4
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
  }

  setupBasicLighting(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
  }

  // =========================================================================
  // SMOOTH SCROLLING AND ANIMATIONS
  // =========================================================================
  setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    revealElements.forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
    });
  }

  setupSmoothScrolling() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          // Close mobile menu if it's open
          if (menuToggle && navLinks) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
          }
          
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
    let autoplayInterval;

    const showTestimonial = (index) => {
      // Hide all testimonials
      testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
        testimonial.classList.remove('active');
      });
      
      // Remove active class from all dots
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show current testimonial and activate dot
      testimonials[index].style.display = 'block';
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      
      // Animate the testimonial
      gsap.fromTo(testimonials[index], 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    };

    const nextTestimonial = () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    };

    const prevTestimonial = () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    };

    // Event listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextTestimonial();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevTestimonial();
        resetAutoplay();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        showTestimonial(currentIndex);
        resetAutoplay();
      });
    });

    // Autoplay functionality
    const startAutoplay = () => {
      autoplayInterval = setInterval(nextTestimonial, 5000); // Change slide every 5 seconds
    };

    const resetAutoplay = () => {
      clearInterval(autoplayInterval);
      startAutoplay();
    };

    // Initialize the slider
    showTestimonial(currentIndex);
    startAutoplay();
  }

  initFeatureTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    const showTab = (tabId) => {
      // Hide all tab contents
      tabContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
      });

      // Remove active class from all buttons
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
      });

      // Show selected tab content and activate button
      const selectedTab = document.getElementById(tabId);
      const selectedBtn = document.querySelector(`[data-tab="${tabId}"]`);
      
      if (selectedTab && selectedBtn) {
        selectedTab.style.display = 'block';
        selectedTab.classList.add('active');
        selectedBtn.classList.add('active');

        // Animate the content
        gsap.fromTo(selectedTab,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    };

    // Add click handlers to tab buttons
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        showTab(tabId);
      });
    });

    // Show first tab by default
    const firstTabId = tabButtons[0]?.getAttribute('data-tab');
    if (firstTabId) {
      showTab(firstTabId);
    }
  }

  initVideoPlayer() {
    const video = document.querySelector('.demo-video');
    const playBtn = document.querySelector('.play-btn');
    const progressBar = document.querySelector('.progress-bar');
    const videoProgress = document.querySelector('.video-progress');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const videoWrapper = document.querySelector('.video-wrapper');

    if (!video || !playBtn || !progressBar || !videoProgress) return;

    // Format time in MM:SS format
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Update progress bar and time displays
    const updateProgress = () => {
      if (!video.duration) return;
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${progress}%`;
      currentTimeEl.textContent = formatTime(video.currentTime);
      durationEl.textContent = formatTime(video.duration);
    };

    // Seek functionality
    const seek = (e) => {
      const rect = videoProgress.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / videoProgress.offsetWidth;
      video.currentTime = pos * video.duration;
      updateProgress();
    };

    // Handle seeking while dragging
    let isDragging = false;
    
    videoProgress.addEventListener('mousedown', (e) => {
      isDragging = true;
      seek(e);
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        seek(e);
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile seeking
    videoProgress.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      seek({ clientX: touch.clientX });
    });

    videoProgress.addEventListener('touchmove', (e) => {
      e.preventDefault(); // Prevent scrolling while seeking
      const touch = e.touches[0];
      seek({ clientX: touch.clientX });
    });

    // Toggle play/pause with better state management
    const togglePlay = () => {
      if (video.paused) {
        video.play().catch(err => {
          console.error('Error playing video:', err);
        });
        playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        videoWrapper.classList.add('playing');
      } else {
        video.pause();
        playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        videoWrapper.classList.remove('playing');
      }
    };

    // Double click to toggle fullscreen
    videoWrapper.addEventListener('dblclick', () => {
      toggleFullscreen();
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (!video) return;

      // Only handle keyboard events if the video is in viewport
      const rect = video.getBoundingClientRect();
      const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (!isInViewport) return;

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'arrowleft':
          e.preventDefault();
          video.currentTime = Math.max(video.currentTime - 5, 0);
          break;
        case 'arrowright':
          e.preventDefault();
          video.currentTime = Math.min(video.currentTime + 5, video.duration);
          break;
        case 'm':
          e.preventDefault();
          video.muted = !video.muted;
          break;
        case '0':
        case 'home':
          e.preventDefault();
          video.currentTime = 0;
          break;
        case 'end':
          e.preventDefault();
          video.currentTime = video.duration;
          break;
      }
    });

    // Preview thumbnail on hover (if available)
    let previewThrottle;
    videoProgress.addEventListener('mousemove', (e) => {
      clearTimeout(previewThrottle);
      previewThrottle = setTimeout(() => {
        const rect = videoProgress.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / videoProgress.offsetWidth;
        const previewTime = pos * video.duration;
        // Update preview time display
        currentTimeEl.textContent = formatTime(previewTime);
      }, 50);
    });

    videoProgress.addEventListener('mouseleave', () => {
      clearTimeout(previewThrottle);
      updateProgress(); // Reset to current time
    });

    // Fullscreen functionality with better cross-browser support
    const toggleFullscreen = () => {
      if (!document.fullscreenElement && 
          !document.webkitFullscreenElement && 
          !document.mozFullScreenElement) {
        if (videoWrapper.requestFullscreen) {
          videoWrapper.requestFullscreen();
        } else if (videoWrapper.webkitRequestFullscreen) {
          videoWrapper.webkitRequestFullscreen();
        } else if (videoWrapper.mozRequestFullScreen) {
          videoWrapper.mozRequestFullScreen();
        }
        fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen-exit"></i>';
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        }
        fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen"></i>';
      }
    };

    // Event Listeners
    playBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    video.addEventListener('loadedmetadata', () => {
      durationEl.textContent = formatTime(video.duration);
      updateProgress();
    });

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', () => {
      playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      videoWrapper.classList.remove('playing');
    });

    // Handle fullscreen change events
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
    document.addEventListener('mozfullscreenchange', updateFullscreenButton);

    function updateFullscreenButton() {
      const isFullscreen = document.fullscreenElement || 
                          document.webkitFullscreenElement || 
                          document.mozFullScreenElement;
      fullscreenBtn.innerHTML = isFullscreen ? 
        '<i class="bi bi-fullscreen-exit"></i>' : 
        '<i class="bi bi-fullscreen"></i>';
    }

    // Add loading indicator
    video.addEventListener('waiting', () => {
      videoWrapper.classList.add('loading');
    });

    video.addEventListener('canplay', () => {
      videoWrapper.classList.remove('loading');
    });

    // Initialize with play button
    playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
  }

  setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
        }
      });

      // Close menu when pressing escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
        }
      });
    }
  }
}

// Initialize the optimized visual engine
document.addEventListener('DOMContentLoaded', () => {
  new OptimizedVisualEngine();
});
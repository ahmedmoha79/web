/**
 * Wazambi Website - Optimized Visual Experience
 * Focused on smooth animations and visual effects
 * Version 2.1 - Optimized for Render Free Tier
 */

class OptimizedVisualEngine {
  constructor() {
    // Initialize core state
    this.initialized = false;
    this.modules = {};
    this.animationFrameId = null;
    
    // Debounced resize handler
    this.resizeHandler = this.debounce(this.handleResize.bind(this), 250);
    
    // Initialize only when needed
    if (document.readyState === 'complete') {
      this.lazyInitialize();
    } else {
      window.addEventListener('load', () => this.lazyInitialize());
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  async lazyInitialize() {
    if (this.initialized) return;
    
    // Load GSAP only if needed
    if (document.querySelector('.reveal-on-scroll, .testimonial-slider')) {
      await this.loadGSAP();
    }
    
    this.setupEventListeners();
    
    // Initialize features only if their elements exist
    if (document.getElementById('corridorScene')) {
      this.initCorridorScene();
    }
    
    if (document.querySelector('.reveal-on-scroll')) {
      this.setupScrollReveal();
    }
    
    if (document.querySelector('a[href^="#"]')) {
      this.setupSmoothScrolling();
    }
    
    // Lazy load other features
    this.lazyLoadFeatures();
    
    this.initialized = true;
  }

  async loadGSAP() {
    try {
      // Load GSAP core
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      await new Promise((resolve) => {
        gsapScript.onload = resolve;
        document.head.appendChild(gsapScript);
      });
      
      this.modules.gsap = window.gsap;
      
      // Load ScrollTrigger only if needed
      if (document.querySelector('.reveal-on-scroll')) {
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        await new Promise((resolve) => {
          scrollTriggerScript.onload = resolve;
          document.head.appendChild(scrollTriggerScript);
        });
        this.modules.gsap.registerPlugin(ScrollTrigger);
      }
    } catch (error) {
      console.error('Failed to load GSAP:', error);
    }
  }

  async lazyLoadFeatures() {
    // Load features only when they scroll into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const feature = entry.target.dataset.feature;
          switch (feature) {
            case 'testimonials':
              this.initTestimonialSlider();
              break;
            case 'features':
              this.initFeatureTabs();
              break;
            case 'video':
              this.initVideoPlayer();
              break;
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Observe feature containers
    document.querySelectorAll('[data-feature]').forEach(el => observer.observe(el));
  }

  // =========================================================================
  // OPTIMIZED 3D CORRIDOR SCENE
  // =========================================================================
  async initCorridorScene() {
    const corridorContainer = document.getElementById('corridorScene');
    if (!corridorContainer) return;

    try {
      // Dynamically import Three.js only when needed
      const THREE = await import('https://cdn.skypack.dev/three@0.132.2');
      
      // Optimized scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: false,
        powerPreference: "high-performance",
        precision: "mediump" // Use medium precision for better performance
      });
      
      // Optimize renderer
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      corridorContainer.appendChild(renderer.domElement);

      // Reduced complexity parameters
      const corridorParams = {
        width: 30,
        height: 15,
        depth: 200, // Reduced depth
        segmentCount: 30, // Reduced segments
        particleCount: 300 // Reduced particles
      };

      // Create optimized scene elements
      this.createOptimizedTunnel(scene, corridorParams, THREE);
      this.createOptimizedParticles(scene, corridorParams, THREE);
      this.setupBasicLighting(scene, THREE);

      camera.position.set(0, 3, 15);
      const cameraTarget = new THREE.Vector3(0, 0, -100);
      
      // Optimized animation loop with RAF throttling
      const clock = new THREE.Clock();
      let lastTime = 0;
      let frameCount = 0;
      
      const animate = () => {
        frameCount++;
        // Render every other frame for performance
        if (frameCount % 2 === 0) {
          const time = clock.getElapsedTime();
          const deltaTime = time - lastTime;
          lastTime = time;
          
          camera.position.z -= deltaTime * 8; // Reduced speed
          camera.lookAt(cameraTarget);
          
          if (camera.position.z < -corridorParams.depth * 0.5) {
            camera.position.z = 15;
          }
          
          renderer.render(scene, camera);
        }
        
        this.animationFrameId = requestAnimationFrame(animate);
      };
      
      animate();

      // Optimized resize handler
      window.addEventListener('resize', () => this.resizeHandler(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }));

    } catch (error) {
      console.error('Failed to initialize 3D scene:', error);
      corridorContainer.style.display = 'none';
    }
  }

  createOptimizedTunnel(scene, params, THREE) {
    // Use lower polygon count for tunnel
    const tunnelGeometry = new THREE.CylinderGeometry(
      params.width * 0.8,
      params.width,
      params.depth,
      24, // Reduced segments
      24,
      true
    );
    
    // Use basic material instead of standard for better performance
    const tunnelMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a0a1a,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.95
    });
    
    const tunnel = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
    tunnel.rotation.x = Math.PI / 2;
    tunnel.position.z = -params.depth / 2;
    scene.add(tunnel);
    
    // Reduced number of rings
    const ringGeometry = new THREE.TorusGeometry(params.width * 0.9, 0.2, 6, 24);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x1a1a2a,
      transparent: true,
      opacity: 0.2
    });
    
    for (let i = 0; i < params.segmentCount; i += 2) { // Skip every other ring
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.z = -i * (params.depth / params.segmentCount);
      scene.add(ring);
    }
  }

  createOptimizedParticles(scene, params, THREE) {
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

  setupBasicLighting(scene, THREE) {
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
      autoplayInterval = setInterval(nextTestimonial, 3500); // Change slide every 3.5 seconds
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

    if (!tabButtons.length || !tabContents.length) return;

    const showTab = (tabId) => {
      // Hide all tab contents
      tabContents.forEach(content => {
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
        selectedTab.classList.add('active');
        selectedBtn.classList.add('active');
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

    // Preload video metadata
    video.preload = 'metadata';
    
    // Force load video when in viewport
    const loadVideo = () => {
      if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        video.load();
      }
    };

    // Use Intersection Observer to load video when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadVideo();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(video);

    // Add click event to play button with error handling
    playBtn.addEventListener('click', () => {
      togglePlay().catch(err => {
        console.error('Error playing video:', err);
        // Retry playing
        setTimeout(() => togglePlay(), 1000);
      });
    });
    
    // Add click event to video
    video.addEventListener('click', () => {
      togglePlay().catch(err => {
        console.error('Error playing video:', err);
      });
    });
    
    // Update progress as video plays
    video.addEventListener('timeupdate', () => updateProgress());
    
    // Update duration once metadata is loaded
    video.addEventListener('loadedmetadata', () => {
      durationEl.textContent = formatTime(video.duration);
    });
    
    // Handle video end
    video.addEventListener('ended', () => {
      playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      videoWrapper.classList.remove('playing');
    });

    // Add fullscreen button event
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => toggleFullscreen());
    }

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

  handleResize() {
    // Implementation moved to class method for better organization
    if (this.renderer && this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  cleanup() {
    // Cleanup method to prevent memory leaks
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    // Remove event listeners
    window.removeEventListener('resize', this.resizeHandler);
    
    // Dispose of Three.js resources
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

// Initialize with error handling
try {
  window.visualEngine = new OptimizedVisualEngine();
} catch (error) {
  console.error('Failed to initialize Visual Engine:', error);
}
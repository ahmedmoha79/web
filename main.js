/**
 * Wazambi Fleet Tracker PRO - Next-Gen Fleet Intelligence Platform
 * Ultra-Advanced JavaScript Implementation with AI-Powered Analytics
 * Version 4.0 - Quantum Computing Ready
 */

class QuantumFleetTracker {
  constructor() {
    // Initialize GSAP properly
    if (typeof gsap === 'undefined') {
      console.error('GSAP is not loaded. Please ensure GSAP is included before this script.');
      return;
    }
    
    // Initialize modules object with core GSAP
    this.modules = {
      gsap: gsap
    };
    
    // Register plugins if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      this.modules.scrollTrigger = ScrollTrigger;
    }
    
    if (typeof ScrollToPlugin !== 'undefined') {
      gsap.registerPlugin(ScrollToPlugin);
      this.modules.scrollTo = ScrollToPlugin;
    }
    
    this.initialize();
  }

  async initialize() {
    try {
      // Load remaining modules safely
      await this.loadQuantumModules();
      this.setupEventListeners();
      this.initCorridorScene();
      this.initAIAnalytics();
      this.setupPredictiveLoad();
      this.enableVoiceCommands();
      this.initARView();
      this.setupMLDrivenUI();
      this.setupScrollReveal();
      this.setupWhatsAppButton();
      this.initVehicleMap();
      this.simulateLiveStats();
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  async loadQuantumModules() {
    try {
      // Load additional modules
      const additionalModules = {
        threejs: await import('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'),
        leaflet: await import('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'),
        tensorflow: await this.loadTFJS(),
        speechRecognition: this.initSpeechRecognition()
      };
      
      // Merge with existing modules
      this.modules = {
        ...this.modules,
        ...additionalModules
      };
    } catch (error) {
      console.error('Failed to load additional modules:', error);
    }
  }

  async loadTFJS() {
    try {
      // Only load TensorFlow.js if it's not already loaded
      if (typeof tf === 'undefined') {
        const tf = await import('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.18.0/dist/tf.min.js');
        this.tf = tf;
        return tf;
      }
      return tf;
    } catch (error) {
      console.warn('TensorFlow.js failed to load:', error);
      return null;
    }
  }

  initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      return recognition;
    }
    return null;
  }

  // =========================================================================
  // QUANTUM-ENHANCED 3D CORRIDOR SCENE
  // =========================================================================
  initCorridorScene() {
    const corridorContainer = document.getElementById('corridorScene');
    if (!corridorContainer) return;

    // Quantum-enhanced scene with particle physics
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setPixelRatio(window.devicePixelRatio * 1.5);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    
    corridorContainer.appendChild(renderer.domElement);

    // Quantum corridor parameters
    const corridorParams = {
      width: 30,
      height: 15,
      depth: 500,
      segmentCount: 100,
      particleCount: 2000,
      lightCount: 3
    };

    // Create quantum tunnel effect
    this.createQuantumTunnel(scene, corridorParams);

    // Add quantum particles with reduced opacity
    this.createQuantumParticles(scene, corridorParams);

    // Advanced lighting system with reduced intensity
    this.setupQuantumLighting(scene, corridorParams);

    // Camera positioning with inertia
    camera.position.set(0, 3, 15);
    const cameraTarget = new THREE.Vector3(0, 0, -100);
    
    // Animation loop with time dilation effect
    const clock = new THREE.Clock();
    let lastTime = 0;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Quantum time dilation effect
      const timeFactor = 1 + Math.sin(time * 0.5) * 0.3;
      
      // Update particles with quantum behavior
      this.updateQuantumParticles(time, deltaTime, timeFactor);
      
      // Camera movement with smooth follow
      camera.position.z -= deltaTime * 10 * timeFactor;
      camera.lookAt(cameraTarget);
      
      // Reset camera position when reaching certain depth
      if (camera.position.z < -corridorParams.depth * 0.5) {
        camera.position.z = 15;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Quantum-responsive window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Parallax effect with quantum smoothing
    this.setupQuantumParallax(camera);
  }

  createQuantumTunnel(scene, params) {
    // Create tunnel geometry with quantum distortion
    const tunnelGeometry = new THREE.CylinderGeometry(
      params.width * 0.8, 
      params.width, 
      params.depth, 
      64, 
      64, 
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
    
    // Add quantum energy rings with reduced opacity
    for (let i = 0; i < params.segmentCount; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(params.width * 0.9, 0.2, 16, 64),
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

  createQuantumParticles(scene, params) {
    // Quantum particle system with reduced visibility
    this.particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(params.particleCount * 3);
    const colors = new Float32Array(params.particleCount * 3);
    const sizes = new Float32Array(params.particleCount);
    const speeds = new Float32Array(params.particleCount);
    
    // Initialize particle properties with quantum randomness
    for (let i = 0; i < params.particleCount; i++) {
      // Position
      const i3 = i * 3;
      const radius = params.width * (0.2 + Math.random() * 0.6);
      const angle = Math.random() * Math.PI * 2;
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * params.height * 0.8;
      positions[i3 + 2] = -Math.random() * params.depth;
      
      // Color (darker quantum energy spectrum)
      colors[i3] = 0.1 + Math.random() * 0.2;
      colors[i3 + 1] = 0.1 + Math.random() * 0.2;
      colors[i3 + 2] = 0.2 + Math.random() * 0.3;
      
      // Size and speed
      sizes[i] = 0.05 + Math.random() * 0.2;
      speeds[i] = 0.3 + Math.random() * 1.5;
    }
    
    this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    this.particlesGeometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    this.particleSystem = new THREE.Points(this.particlesGeometry, particlesMaterial);
    scene.add(this.particleSystem);
  }

  updateQuantumParticles(time, deltaTime, timeFactor) {
    const positions = this.particlesGeometry.attributes.position.array;
    const speeds = this.particlesGeometry.attributes.speed.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      // Move particles forward with quantum uncertainty
      positions[i + 2] += speeds[i / 3] * deltaTime * 10 * timeFactor;
      
      // Quantum tunneling effect - particles may jump positions
      if (positions[i + 2] > 0 && Math.random() < 0.01 * timeFactor) {
        positions[i + 2] = -Math.random() * 500;
      }
      
      // Apply quantum fluctuations to position
      if (Math.random() < 0.05) {
        positions[i] += (Math.random() - 0.5) * 0.2 * timeFactor;
        positions[i + 1] += (Math.random() - 0.5) * 0.2 * timeFactor;
      }
    }
    
    this.particlesGeometry.attributes.position.needsUpdate = true;
  }

  setupQuantumLighting(scene, params) {
    // Reduced ambient light
    const ambientLight = new THREE.AmbientLight(0x202030, 0.3);
    scene.add(ambientLight);
    
    // Dynamic directional lights with reduced intensity
    for (let i = 0; i < params.lightCount; i++) {
      const light = new THREE.PointLight(0x1a1a2a, 0.8, 100);
      light.position.set(
        (Math.random() - 0.5) * params.width * 0.8,
        (Math.random() - 0.5) * params.height * 0.8,
        -Math.random() * params.depth
      );
      light.castShadow = true;
      scene.add(light);
      
      // Animate lights with reduced movement
      this.modules.gsap.to(light.position, {
        x: `+=${(Math.random() - 0.5) * 5}`,
        y: `+=${(Math.random() - 0.5) * 5}`,
        duration: 3 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
    
    // Reduced volumetric lighting
    const volumetricLight = new THREE.SpotLight(0x1a1a2a, 1.5, 200, Math.PI / 6, 0.5);
    volumetricLight.position.set(0, 10, 50);
    volumetricLight.target.position.set(0, 0, 0);
    volumetricLight.castShadow = true;
    volumetricLight.shadow.mapSize.width = 1024;
    volumetricLight.shadow.mapSize.height = 1024;
    scene.add(volumetricLight);
    scene.add(volumetricLight.target);
  }

  setupQuantumParallax(camera) {
    // Quantum-entangled parallax effect
    const parallaxStrength = 0.5;
    const smoothFactor = 0.1;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
      // Calculate normalized mouse coordinates with quantum uncertainty
      targetX = (e.clientX / window.innerWidth - 0.5) * 2 * parallaxStrength;
      targetY = -(e.clientY / window.innerHeight - 0.5) * 2 * parallaxStrength;
      
      // Add quantum jitter
      if (Math.random() < 0.05) {
        targetX += (Math.random() - 0.5) * 0.5;
        targetY += (Math.random() - 0.5) * 0.5;
      }
    });
    
    // Smooth follow with quantum damping
    const updateParallax = () => {
      requestAnimationFrame(updateParallax);
      
      // Apply quantum smoothing
      currentX += (targetX - currentX) * smoothFactor;
      currentY += (targetY - currentY) * smoothFactor;
      
      camera.position.x = currentX * 2;
      camera.position.y = currentY * 2 + 3;
    };
    
    updateParallax();
  }

  // =========================================================================
  // AI-POWERED FLEET ANALYTICS ENGINE
  // =========================================================================
  initAIAnalytics() {
    // Only initialize if TensorFlow.js is available
    if (!this.tf) {
      console.log('AI Analytics disabled - TensorFlow.js not available');
      return;
    }
    
    // Load AI models for predictive analytics
    this.loadAIModels().then(models => {
      if (models) {
        this.aiModels = models;
        this.setupRealTimePredictions();
      }
    }).catch(error => {
      console.warn('AI Analytics initialization failed:', error);
    });
  }

  async loadAIModels() {
    try {
      // Check if TensorFlow.js is available
      if (!this.tf || !this.tf.loadLayersModel) {
        console.log('TensorFlow.js not available for AI models');
        return null;
      }

      // In a real app, these would be loaded from your server
      // For demo purposes, we'll create simple mock models
      const models = {
        routeOptimizer: this.createMockModel('route_optimizer'),
        driverBehavior: this.createMockModel('driver_behavior'),
        maintenancePredictor: this.createMockModel('maintenance_predictor')
      };
      
      console.log('AI models initialized successfully');
      return models;
    } catch (error) {
      console.warn('Failed to load AI models:', error);
      return null;
    }
  }

  createMockModel(modelName) {
    // Create a simple mock model for demonstration
    return {
      predict: async (input) => {
        // Simulate model prediction
        const mockPrediction = Array(input.shape[0]).fill(0).map(() => Math.random());
        return {
          data: () => Promise.resolve(mockPrediction),
          dispose: () => {}
        };
      }
    };
  }

  setupRealTimePredictions() {
    if (!this.aiModels) {
      console.log('Real-time predictions disabled - AI models not available');
      return;
    }
    
    // Simulate real-time fleet data processing
    setInterval(() => {
      this.processFleetDataWithAI();
    }, 3000);
  }

  async processFleetDataWithAI() {
    // Generate mock fleet data (in real app, this would come from your API)
    const mockData = this.generateMockFleetData();
    
    try {
      // Process with AI models
      const predictions = {
        routeOptimization: await this.predictRouteOptimization(mockData),
        driverSafety: await this.predictDriverBehavior(mockData),
        maintenance: await this.predictMaintenance(mockData)
      };
      
      // Update UI with predictions
      this.updateAIPredictionsUI(predictions);
    } catch (error) {
      console.warn('AI prediction processing failed:', error);
    }
  }

  generateMockFleetData() {
    // Generate realistic mock data for demonstration
    return {
      vehicles: Array.from({length: 5 + Math.floor(Math.random() * 10)}, (_, i) => ({
        id: `VH${1000 + i}`,
        speed: 30 + Math.random() * 70,
        fuelLevel: Math.random(),
        engineTemp: 80 + Math.random() * 40,
        location: {
          lat: -15.4 + Math.random() * 2,
          lng: 28.3 + Math.random() * 2
        },
        driver: {
          id: `DR${2000 + i}`,
          harshBraking: Math.random() * 5,
          rapidAcceleration: Math.random() * 5,
          speeding: Math.random() > 0.7 ? 1 : 0
        }
      })),
      timestamp: new Date().toISOString()
    };
  }

  async predictRouteOptimization(data) {
    // Prepare input tensor
    const input = this.tf.tensor2d(
      data.vehicles.map(v => [
        v.location.lat,
        v.location.lng,
        v.speed / 100,
        v.fuelLevel
      ])
    );
    
    // Make prediction
    const prediction = this.aiModels.routeOptimizer.predict(input);
    const result = await prediction.data();
    prediction.dispose();
    input.dispose();
    
    return {
      optimizedRoutes: result,
      savingsEstimate: Math.random() * 15 + 5 // Simulated savings percentage
    };
  }

  async predictDriverBehavior(data) {
    // Prepare input tensor
    const input = this.tf.tensor2d(
      data.vehicles.map(v => [
        v.driver.harshBraking / 5,
        v.driver.rapidAcceleration / 5,
        v.driver.speeding,
        v.speed / 100
      ])
    );
    
    // Make prediction
    const prediction = this.aiModels.driverBehavior.predict(input);
    const result = await prediction.data();
    prediction.dispose();
    input.dispose();
    
    return {
      riskScores: result,
      highRiskDrivers: data.vehicles
        .map((v, i) => ({id: v.driver.id, score: result[i]}))
        .filter(d => d.score > 0.7)
    };
  }

  async predictMaintenance(data) {
    // Prepare input tensor
    const input = this.tf.tensor2d(
      data.vehicles.map(v => [
        v.engineTemp / 200,
        v.fuelLevel,
        (Date.now() % 10000) / 10000, // Simulated mileage
        Math.random() // Simulated age factor
      ])
    );
    
    // Make prediction
    const prediction = this.aiModels.maintenancePredictor.predict(input);
    const result = await prediction.data();
    prediction.dispose();
    input.dispose();
    
    return {
      maintenanceFlags: data.vehicles
        .map((v, i) => ({id: v.id, needsMaintenance: result[i] > 0.5}))
        .filter(v => v.needsMaintenance)
    };
  }

  updateAIPredictionsUI(predictions) {
    // Update UI elements with AI predictions
    const aiStatsContainer = document.getElementById('aiStats');
    if (!aiStatsContainer) return;
    
    aiStatsContainer.innerHTML = `
      <div class="ai-stat-card">
        <h4>Route Optimization</h4>
        <div class="ai-stat-value">${predictions.routeOptimization.savingsEstimate.toFixed(1)}%</div>
        <div class="ai-stat-label">Potential Fuel Savings</div>
      </div>
      <div class="ai-stat-card">
        <h4>Driver Safety</h4>
        <div class="ai-stat-value">${predictions.driverSafety.highRiskDrivers.length}</div>
        <div class="ai-stat-label">High-Risk Drivers</div>
      </div>
      <div class="ai-stat-card">
        <h4>Maintenance</h4>
        <div class="ai-stat-value">${predictions.maintenance.maintenanceFlags.length}</div>
        <div class="ai-stat-label">Vehicles Needing Service</div>
      </div>
    `;
  }

  // =========================================================================
  // PREDICTIVE RESOURCE LOADING
  // =========================================================================
  setupPredictiveLoad() {
    // Use IntersectionObserver with machine learning predictions
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.predictAndLoadContent(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all sections with data-predictive-load attribute
    document.querySelectorAll('[data-predictive-load]').forEach(el => {
      this.observer.observe(el);
    });
  }

  predictAndLoadContent(element) {
    // Predict user behavior and load content accordingly
    const loadPriority = this.predictLoadPriority(element);
    
    switch (loadPriority) {
      case 'high':
        this.loadContentImmediately(element);
        break;
      case 'medium':
        this.loadContentWhenIdle(element);
        break;
      case 'low':
        this.loadContentOnDemand(element);
        break;
    }
  }

  predictLoadPriority(element) {
    // Simple heuristic - in a real app this would use ML
    if (element.id === 'hero' || element.id === 'features') return 'high';
    if (element.getAttribute('data-predictive-load') === 'important') return 'medium';
    return 'low';
  }

  loadContentImmediately(element) {
    // Load content right away with smooth animation
    this.fetchSectionContent(element.id).then(content => {
      element.innerHTML = content;
      this.modules.gsap.from(element, {
        opacity: 0,
        y: 20,
        duration: 0.5
      });
    });
  }

  loadContentWhenIdle(element) {
    // Load during browser idle time
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        this.fetchSectionContent(element.id).then(content => {
          element.innerHTML = content;
        });
      }, { timeout: 1000 });
    } else {
      this.loadContentImmediately(element);
    }
  }

  loadContentOnDemand(element) {
    // Only load when user interacts
    element.addEventListener('mouseenter', () => {
      this.fetchSectionContent(element.id).then(content => {
        element.innerHTML = content;
      });
    }, { once: true });
  }

  async fetchSectionContent(sectionId) {
    // In a real app, this would fetch from your API
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`<div class="loaded-content">Content loaded for ${sectionId}</div>`);
      }, 300);
    });
  }

  // =========================================================================
  // VOICE COMMAND SYSTEM
  // =========================================================================
  enableVoiceCommands() {
    if (!this.modules.speechRecognition) return;
    
    const voiceBtn = document.getElementById('voiceCommandBtn');
    if (!voiceBtn) return;
    
    let listening = false;
    const recognition = this.modules.speechRecognition;
    
    voiceBtn.addEventListener('click', () => {
      if (listening) {
        recognition.stop();
        voiceBtn.classList.remove('listening');
        listening = false;
      } else {
        recognition.start();
        voiceBtn.classList.add('listening');
        listening = true;
      }
    });
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      this.processVoiceCommand(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      voiceBtn.classList.remove('listening');
      listening = false;
    };
  }

  processVoiceCommand(command) {
    console.log('Voice command:', command);
    
    // Simple command processing - in a real app this would use NLP
    if (command.toLowerCase().includes('map')) {
      this.scrollToSection('hero');
    } else if (command.toLowerCase().includes('features')) {
      this.scrollToSection('features');
    } else if (command.toLowerCase().includes('testimonials')) {
      this.scrollToSection('testimonials');
    } else if (command.toLowerCase().includes('contact')) {
      this.scrollToSection('contact');
    } else if (command.toLowerCase().includes('refresh')) {
      window.location.reload();
    }
    
    // Show voice feedback
    this.showVoiceFeedback(command);
  }

  showVoiceFeedback(command) {
    const feedback = document.createElement('div');
    feedback.className = 'voice-feedback';
    feedback.innerHTML = `
      <div class="voice-feedback-icon">
        <i class="bi bi-mic-fill"></i>
      </div>
      <div class="voice-feedback-text">${command}</div>
    `;
    
    document.body.appendChild(feedback);
    
    this.modules.gsap.from(feedback, {
      y: 20,
      opacity: 0,
      duration: 0.3
    });
    
    setTimeout(() => {
      this.modules.gsap.to(feedback, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => feedback.remove()
      });
    }, 2000);
  }

  // =========================================================================
  // AUGMENTED REALITY VIEW
  // =========================================================================
  initARView() {
    // Check for AR support
    if (!navigator.xr) {
      console.log('WebXR not supported');
      return;
    }
    
    // Setup AR button
    const arBtn = document.getElementById('arViewBtn');
    if (!arBtn) return;
    
    arBtn.style.display = 'block';
    arBtn.addEventListener('click', () => this.launchARView());
  }

  async launchARView() {
    try {
      // Request AR session
      const session = await navigator.xr.requestSession('immersive-ar');
      
      // Initialize Three.js AR renderer
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
      });
      renderer.xr.enabled = true;
      document.body.appendChild(renderer.domElement);
      
      // Create AR scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera();
      
      // Add AR content
      this.setupARContent(scene);
      
      // Start AR session
      renderer.xr.setSession(session);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
      
      // Handle session end
      session.addEventListener('end', () => {
        document.body.removeChild(renderer.domElement);
      });
    } catch (error) {
      console.error('AR session failed:', error);
    }
  }

  setupARContent(scene) {
    // Add AR markers for fleet vehicles
    const markerGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    
    // Simulated vehicle positions
    const vehiclePositions = [
      { x: 0, y: 0, z: -0.5 },
      { x: 0.3, y: 0, z: -0.7 },
      { x: -0.2, y: 0, z: -0.4 }
    ];
    
    vehiclePositions.forEach(pos => {
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(pos.x, pos.y, pos.z);
      scene.add(marker);
      
      // Add label
      const label = this.createARLabel('Vehicle');
      label.position.set(pos.x, pos.y + 0.15, pos.z);
      scene.add(label);
    });
  }

  createARLabel(text) {
    // Create 3D text for AR labels
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'Bold 40px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, canvas.height / 2 + 15);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.3, 0.15, 1);
    
    return sprite;
  }

  // =========================================================================
  // MACHINE LEARNING-DRIVEN UI ADAPTATION
  // =========================================================================
  setupMLDrivenUI() {
    // Monitor user behavior to adapt UI
    this.trackUserBehavior();
    
    // Apply initial UI personalization
    this.applyUIPersonalization();
  }

  trackUserBehavior() {
    // Track user interactions (simplified)
    const uiElements = document.querySelectorAll('a, button, [data-track]');
    uiElements.forEach(el => {
      el.addEventListener('click', () => {
        this.recordInteraction(el);
      });
    });
    
    // Track scrolling behavior
    let lastScrollPosition = 0;
    let scrollDirection = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      scrollDirection = currentScroll > lastScrollPosition ? 1 : -1;
      lastScrollPosition = currentScroll;
      
      this.recordScrollBehavior(currentScroll, scrollDirection);
    });
  }

  recordInteraction(element) {
    // In a real app, this would send data to your analytics service
    console.log('User interacted with:', element.textContent.trim());
  }

  recordScrollBehavior(position, direction) {
    // Record scroll patterns for UI adaptation
    console.log('User scroll position:', position, 'Direction:', direction);
  }

  applyUIPersonalization() {
    // Apply personalized UI based on user behavior
    setTimeout(() => {
      // Simulated personalization
      if (Math.random() > 0.5) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.add('light-mode');
      }
      
      // Simulated feature highlighting
      const popularFeatures = ['tracking', 'analytics', 'alerts'];
      const randomFeature = popularFeatures[Math.floor(Math.random() * popularFeatures.length)];
      document.getElementById(randomFeature).classList.add('featured');
    }, 2000);
  }

  // =========================================================================
  // CORE APPLICATION INITIALIZATION
  // =========================================================================
  setupEventListeners() {
    // Mobile navigation toggle
    this.setupMobileNavigation();
    
    // Smooth scrolling
    this.setupSmoothScrolling();
    
    // Feature tabs
    this.setupFeatureTabs();
    
    // Video player controls
    this.setupVideoPlayer();
    
    // Testimonial slider
    this.setupTestimonialSlider();
    
    // Animated counters
    this.setupAnimatedCounters();
    
    // Form validation
    this.setupFormValidation();
    
    // Scroll reveal animations
    this.setupScrollReveal();
    
    // WhatsApp float button
    this.setupWhatsAppButton();
    
    // Vehicle map simulation
    this.initVehicleMap();
    
    // Dynamic stats update
    this.simulateLiveStats();
  }

  setupMobileNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            // Toggle classes
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            
            // Ensure the menu is visible when active
            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.opacity = '1';
                navLinks.style.visibility = 'visible';
                
                // Animate menu items if GSAP is available
                if (this.modules.gsap) {
                    try {
                        const menuItems = navLinks.querySelectorAll('a');
                        this.modules.gsap.fromTo(menuItems, 
                            { 
                                opacity: 0,
                                y: -20
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.3,
                                stagger: 0.1,
                                ease: 'power2.out'
                            }
                        );
                    } catch (error) {
                        console.error('Mobile menu animation failed:', error);
                    }
                }
            } else {
                // Hide menu when inactive
                navLinks.style.display = 'none';
                navLinks.style.opacity = '0';
                navLinks.style.visibility = 'hidden';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && 
                !navLinks.contains(e.target) && 
                navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
                navLinks.style.display = 'none';
                navLinks.style.opacity = '0';
                navLinks.style.visibility = 'hidden';
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
                navLinks.style.display = 'none';
                navLinks.style.opacity = '0';
                navLinks.style.visibility = 'hidden';
            });
        });
    }
  }

  setupSmoothScrolling() {
    if (!this.modules.gsap) {
      console.error('GSAP not available for smooth scrolling');
      return;
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Close mobile menu if open
          const navLinks = document.querySelector('.nav-links');
          if (navLinks && navLinks.classList.contains('active')) {
            document.querySelector('.mobile-menu-toggle').classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
          }
          
          // Quantum smooth scroll
          try {
            if (this.modules.scrollTo) {
              this.modules.gsap.to(window, {
                duration: 1.2,
                ease: 'power3.inOut',
                scrollTo: {
                  y: targetElement,
                  offsetY: 80,
                  autoKill: false
                },
                onStart: () => {
                  // Add quantum particle effect during scroll
                  this.createScrollParticles();
                }
              });
            } else {
              // Fallback to native smooth scroll
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } catch (error) {
            console.error('Smooth scroll failed:', error);
            // Fallback to native smooth scroll
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  createScrollParticles() {
    // Create temporary particles that follow scroll direction
    const particles = [];
    const colors = [0x2a5bd7, 0x00d4ff, 0xffffff];
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'quantum-scroll-particle';
      particle.style.backgroundColor = `#${colors[Math.floor(Math.random() * colors.length)].toString(16)}`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      
      document.body.appendChild(particle);
      particles.push(particle);
      
      // Animate particle
      this.modules.gsap.to(particle, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 0.1,
        duration: 1.5,
        ease: 'power2.out',
        delay: Math.random() * 0.5,
        onComplete: () => particle.remove()
      });
    }
  }

  setupFeatureTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length && tabContents.length) {
      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          const tabId = button.getAttribute('data-tab');
          
          // Remove active class from all buttons and contents
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked button and corresponding content
          button.classList.add('active');
          document.getElementById(tabId).classList.add('active');
          
          // Quantum transition effect
          this.modules.gsap.from(`#${tabId}`, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'back.out(1)'
          });
        });
      });
    }
  }

  setupVideoPlayer() {
    const videoWrapper = document.querySelector('.video-wrapper');
    const video = document.querySelector('.demo-video');
    const playBtn = document.querySelector('.play-btn');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeDisplay = document.querySelector('.current-time');
    const durationDisplay = document.querySelector('.duration');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    
    if (video && playBtn) {
      // Play/Pause toggle with quantum ripple effect
      playBtn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          videoWrapper.classList.add('playing');
          playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
          this.createRippleEffect(playBtn);
        } else {
          video.pause();
          videoWrapper.classList.remove('playing');
          playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        }
      });
      
      // Update progress bar with smooth animation
      video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        this.modules.gsap.to(progressBar, {
          width: `${percent}%`,
          duration: 0.1,
          ease: 'none'
        });
        
        // Update time displays
        currentTimeDisplay.textContent = this.formatTime(video.currentTime);
        
        // Only set duration once
        if (durationDisplay.textContent === '0:00' && !isNaN(video.duration)) {
          durationDisplay.textContent = this.formatTime(video.duration);
        }
      });
      
      // Click on progress bar to seek with precision
      const videoProgress = document.querySelector('.video-progress');
      if (videoProgress) {
        videoProgress.addEventListener('click', (e) => {
          const pos = (e.pageX - videoProgress.getBoundingClientRect().left) / videoProgress.offsetWidth;
          video.currentTime = pos * video.duration;
          
          // Create seeker indicator
          this.createSeekerIndicator(e.pageX);
        });
      }
      
      // Fullscreen toggle with quantum transition
      if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
          } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
          }
          
          // Add fullscreen class for styling
          videoWrapper.classList.add('fullscreen');
          
          // Listen for fullscreen change
          document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
              videoWrapper.classList.remove('fullscreen');
            }
          });
        });
      }
    }
  }

  createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'quantum-ripple';
    element.appendChild(ripple);
    
    this.modules.gsap.fromTo(ripple, 
      { scale: 0, opacity: 1 },
      {
        scale: 3,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
      }
    );
  }

  createSeekerIndicator(xPosition) {
    const indicator = document.createElement('div');
    indicator.className = 'seeker-indicator';
    indicator.style.left = `${xPosition}px`;
    document.body.appendChild(indicator);
    
    this.modules.gsap.fromTo(indicator,
      { scale: 1.5, opacity: 1 },
      {
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => indicator.remove()
      }
    );
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  setupTestimonialSlider() {
    if (!this.modules.gsap) {
      console.error('GSAP not available for testimonial slider');
      return;
    }

    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (testimonials.length > 1) {
        let currentTestimonial = 0;
        let autoSlideInterval;
        
        const showTestimonial = (index) => {
            // Remove active class from all testimonials and dots
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current testimonial and dot
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentTestimonial = index;
            
            // Animate the transition
            try {
              this.modules.gsap.from(testimonials[index], {
                  opacity: 0,
                  x: 50,
                  duration: 0.5,
                  ease: 'power2.out'
              });
            } catch (error) {
              console.error('Testimonial animation failed:', error);
              // Fallback to CSS transition
              testimonials[index].style.opacity = '1';
              testimonials[index].style.transform = 'translateX(0)';
            }
        };
        
        // Next testimonial
        const showNextTestimonial = () => {
            let nextIndex = currentTestimonial + 1;
            if (nextIndex >= testimonials.length) nextIndex = 0;
            showTestimonial(nextIndex);
        };
        
        // Previous testimonial
        const showPrevTestimonial = () => {
            let prevIndex = currentTestimonial - 1;
            if (prevIndex < 0) prevIndex = testimonials.length - 1;
            showTestimonial(prevIndex);
        };
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showNextTestimonial();
                resetAutoSlide();
            });
        }
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showPrevTestimonial();
                resetAutoSlide();
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
                resetAutoSlide();
            });
        });
        
        // Start auto-sliding
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(showNextTestimonial, 5000); // Switch every 5 seconds
        };
        
        // Reset auto-slide timer
        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };
        
        // Initialize auto-sliding
        startAutoSlide();
    }
  }

  setupAnimatedCounters() {
    const statCounters = document.querySelectorAll('.stat .count[data-count]:not([data-dynamic="true"])');
    
    const animateCounters = () => {
      statCounters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // Animation duration in ms
        const startTime = Date.now();
        
        // Quantum easing function
        const quantumEase = (t) => {
          return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const updateCounter = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = quantumEase(progress);
          const value = Math.floor(easedProgress * target);
          
          counter.textContent = value.toLocaleString();
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            // Add quantum pulse effect when complete
            this.modules.gsap.to(counter, {
              scale: 1.2,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut'
            });
          }
        };
        
        updateCounter();
      });
    };
    
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
  }

  setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Quantum validation with field importance weighting
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        const fieldWeights = {
          name: 1.2,
          email: 1.5,
          phone: 1.1,
          company: 1.0,
          'fleet-size': 1.3,
          interest: 1.4,
          message: 1.6
        };
        
        let totalScore = 0;
        let maxScore = 0;
        
        requiredFields.forEach(field => {
          const weight = fieldWeights[field.id] || 1;
          maxScore += weight;
          
          if (!field.value.trim()) {
            field.style.borderColor = 'var(--accent-red)';
            isValid = false;
            
            // Add quantum shake effect
            this.modules.gsap.to(field, {
              x: [-5, 5, -5, 5, 0],
              duration: 0.4,
              ease: 'power1.out'
            });
          } else {
            field.style.borderColor = '';
            totalScore += weight;
          }
        });
        
        // Calculate validation score (0-100)
        const validationScore = Math.floor((totalScore / maxScore) * 100);
        
        if (isValid) {
          const submitBtn = contactForm.querySelector('.submit-btn');
          const originalText = submitBtn.querySelector('.btn-text').textContent;
          
          // Show quantum loading state
          submitBtn.querySelector('.btn-text').textContent = 'Sending...';
          submitBtn.disabled = true;
          
          // Add quantum particles to button
          this.createFormParticles(submitBtn);
          
          // Simulate form submission (replace with actual AJAX call)
          setTimeout(() => {
            submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = 'var(--accent-green)';
            
            // Show quantum success effect
            this.createSuccessParticles(submitBtn);
            
            // Reset form after 2 seconds
            setTimeout(() => {
              contactForm.reset();
              submitBtn.querySelector('.btn-text').textContent = originalText;
              submitBtn.style.backgroundColor = '';
              submitBtn.disabled = false;
            }, 2000);
          }, 1500);
        } else {
          // Show validation score feedback
          this.showValidationFeedback(validationScore);
        }
      });
    }
  }

  createFormParticles(element) {
    // Create quantum particles around form button
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'form-particle';
      particle.style.backgroundColor = `hsl(${Math.random() * 60 + 200}, 100%, 50%)`;
      element.appendChild(particle);
      
      this.modules.gsap.to(particle, {
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
        opacity: 0,
        scale: 0.2,
        duration: 1.5,
        ease: 'power2.out',
        delay: Math.random() * 0.5,
        onComplete: () => particle.remove()
      });
    }
  }

  createSuccessParticles(element) {
    // Create success explosion effect
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'success-particle';
      particle.style.backgroundColor = `hsl(${Math.random() * 60 + 100}, 100%, 50%)`;
      document.body.appendChild(particle);
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 70;
      
      this.modules.gsap.fromTo(particle,
        {
          x: element.getBoundingClientRect().left + element.offsetWidth / 2,
          y: element.getBoundingClientRect().top + element.offsetHeight / 2,
          scale: 0.5,
          opacity: 1
        },
        {
          x: `+=${Math.cos(angle) * distance}`,
          y: `+=${Math.sin(angle) * distance}`,
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          delay: Math.random() * 0.3,
          onComplete: () => particle.remove()
        }
      );
    }
  }

  showValidationFeedback(score) {
    const feedback = document.createElement('div');
    feedback.className = 'validation-feedback';
    feedback.innerHTML = `
      <div class="validation-score">Form ${score}% Complete</div>
      <div class="validation-bar">
        <div class="validation-progress" style="width: ${score}%"></div>
      </div>
    `;
    
    document.body.appendChild(feedback);
    
    this.modules.gsap.from(feedback, {
      y: 20,
      opacity: 0,
      duration: 0.3
    });
    
    setTimeout(() => {
      this.modules.gsap.to(feedback, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => feedback.remove()
      });
    }, 3000);
  }

  setupScrollReveal() {
    if (!this.modules.gsap || !this.modules.ScrollTrigger) return;

    // Initialize ScrollTrigger
    this.modules.gsap.registerPlugin(this.modules.ScrollTrigger);

    // Hero section animation
    this.modules.gsap.from(".hero-content", {
        scrollTrigger: {
            trigger: "#hero",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });

    // Features section animations
    this.modules.gsap.from(".feature-tabs", {
        scrollTrigger: {
            trigger: "#features",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });

    // Feature grid animations
    this.modules.gsap.from(".feature-grid", {
        scrollTrigger: {
            trigger: ".feature-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
    });

    // Solutions section animations
    this.modules.gsap.from(".solutions-grid", {
        scrollTrigger: {
            trigger: "#solutions",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });

    // Testimonials section animations
    this.modules.gsap.from(".testimonials-slider", {
        scrollTrigger: {
            trigger: "#testimonials",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });

    // Testimonial content animations
    this.modules.gsap.from(".testimonial-content", {
        scrollTrigger: {
            trigger: ".testimonial-content",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
    });

    // Pricing section animations
    this.modules.gsap.from(".pricing-grid", {
        scrollTrigger: {
            trigger: "#pricing",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });

    // Contact section animations
    this.modules.gsap.from(".contact-grid", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });

    // Force update ScrollTrigger on load and resize
    window.addEventListener('load', () => {
        this.modules.ScrollTrigger.refresh();
    });

    window.addEventListener('resize', () => {
        this.modules.ScrollTrigger.refresh();
    });
  }

  setupWhatsAppButton() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
      whatsappFloat.addEventListener('mouseenter', () => {
        this.modules.gsap.to(whatsappFloat, {
          scale: 1.2,
          y: -10,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)'
        });
      });
      
      whatsappFloat.addEventListener('mouseleave', () => {
        this.modules.gsap.to(whatsappFloat, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      // Add quantum pulse effect periodically
      setInterval(() => {
        this.modules.gsap.to(whatsappFloat, {
          scale: 1.1,
          duration: 0.8,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut'
        });
      }, 10000);
    }
  }

  initVehicleMap() {
    const mapContainer = document.getElementById('heroMap');
    if (!mapContainer) return;
    
    // Create advanced simulated map with quantum effects
    mapContainer.innerHTML = `
      <div class="quantum-map-overlay">
        <div class="quantum-map-grid"></div>
        ${Array.from({length: 8}, (_, i) => `
          <div class="quantum-vehicle-marker" style="
            --delay: ${i * 0.2}s;
            --duration: ${5 + Math.random() * 10}s;
            --start-x: ${Math.random() * 80 + 10}%;
            --start-y: ${Math.random() * 80 + 10}%;
          ">
            <div class="vehicle-pulse"></div>
            <div class="vehicle-core"></div>
          </div>
        `).join('')}
      </div>
    `;
    
    // Add dynamic connection lines
    setTimeout(() => {
      this.createMapConnections();
    }, 1000);
  }

  createMapConnections() {
    const markers = document.querySelectorAll('.quantum-vehicle-marker');
    const mapContainer = document.getElementById('heroMap');
    
    // Create connections between markers
    markers.forEach((marker1, i) => {
      markers.forEach((marker2, j) => {
        if (i < j && Math.random() > 0.7) {
          const line = document.createElement('div');
          line.className = 'quantum-connection-line';
          mapContainer.appendChild(line);
          
          // Update line position continuously
          const updateLine = () => {
            const rect1 = marker1.getBoundingClientRect();
            const rect2 = marker2.getBoundingClientRect();
            const mapRect = mapContainer.getBoundingClientRect();
            
            const x1 = rect1.left + rect1.width / 2 - mapRect.left;
            const y1 = rect1.top + rect1.height / 2 - mapRect.top;
            const x2 = rect2.left + rect2.width / 2 - mapRect.left;
            const y2 = rect2.top + rect2.height / 2 - mapRect.top;
            
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            line.style.width = `${length}px`;
            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.opacity = 0.3 + Math.random() * 0.2;
          };
          
          updateLine();
          setInterval(updateLine, 100);
        }
      });
    });
  }

  simulateLiveStats() {
    const statElements = document.querySelectorAll('.stat .count[data-dynamic="true"]');
    if (!statElements.length) return;
    
    // Initialize counters
    statElements.forEach(stat => {
        const maxValue = parseInt(stat.getAttribute('data-count')) || 35;
        const minValue = 15; // Minimum value for alerts
        let currentValue = parseInt(stat.textContent);
        
        // Update stats with quantum fluctuations
        setInterval(() => {
            // Generate a random change between -3 and +3
            const change = Math.floor(Math.random() * 7) - 3;
            
            // Calculate new count, ensuring it stays between min and max
            let newValue = currentValue + change;
            newValue = Math.max(minValue, Math.min(maxValue, newValue));
            
            // Only update if the count actually changed
            if (newValue !== currentValue) {
                currentValue = newValue;
                
                // Animate the counter change
                if (this.modules.gsap) {
                    this.modules.gsap.to(stat, {
                        innerText: currentValue,
                        duration: 0.5,
                        snap: { innerText: 1 },
                        onUpdate: function() {
                            stat.textContent = Math.floor(this.targets()[0].innerText);
                        }
                    });
                } else {
                    stat.textContent = currentValue;
                }
                
                // Add a subtle animation class
                stat.classList.add('count-update');
                setTimeout(() => {
                    stat.classList.remove('count-update');
                }, 500);
            }
        }, Math.random() * 2000 + 2000); // Random delay between 2-4 seconds
    });
  }

  // =========================================================================
  // QUANTUM UTILITY METHODS
  // =========================================================================
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      this.modules.gsap.to(window, {
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTo: {
          y: section,
          offsetY: 80,
          autoKill: true
        }
      });
    }
  }

  createQuantumWave(element) {
    // Create a quantum wave effect on an element
    const wave = document.createElement('div');
    wave.className = 'quantum-wave';
    element.appendChild(wave);
    
    this.modules.gsap.fromTo(wave,
      { scale: 0, opacity: 1 },
      {
        scale: 3,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        onComplete: () => wave.remove()
      }
    );
  }
}

// Initialize the Quantum Fleet Tracker when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new QuantumFleetTracker();
});
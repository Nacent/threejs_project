import { gsap } from "gsap";//Module pour l'animation fluide
import { Vector3 } from "three";

export class CustomAnimations {
  constructor(camera, scrollThresholds, button) {
    this.camera = camera;
    this.scrollThresholds = scrollThresholds;
    this.currentStep = 0;
    this.totalSteps = this.scrollThresholds.length;
    this.button = button;

    const reversedThresholds = [...scrollThresholds].reverse();
    this.combinedThresholds = [...scrollThresholds, ...reversedThresholds]

    document.addEventListener('wheel', this.handleScroll.bind(this));
  }

  handleScroll(event) {
    if (!this.isAnimating) {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
  
      this.animationFrameId = requestAnimationFrame(() => {
        this.animateCamera();
      });
    }//animation scroll

    const delta = event.deltaY * 1;

    if (delta > 0) {
      this.moveToNextStep();    
    } else {
      this.moveToPreviousStep();
    }
  }

  moveToNextStep() {
    this.currentStep++;
    if (this.currentStep >= this.totalSteps * 2) {
      this.currentStep = 0;
    }
    this.animateCamera();
    
  }
  
  moveToPreviousStep() {
    if (this.currentStep < 0) {
      this.currentStep--;
      
      const {lookAt} = this.scrollThresholds[this.currentStep];
      if(lookAt) {
        const invertedLookAt = {
          x: -lookAt.x,
          y: -lookAt.y,
          z: -lookAt.z
        }
        this.scrollThresholds[this.currentStep].lookAt = invertedLookAt;
      }
      this.animateCamera();
    } 
  }

  checkButtonVisibility() {
    const { position } = this.combinedThresholds[this.currentStep % this.totalSteps];
    const targetPosition = new Vector3(position.x, position.y, position.z).round(); 
    const distance = this.camera.position.distanceTo(targetPosition);
    const DISTANCE_SEUIL = 0;

    // Vérification de la condition de visibilité et ajout/suppression de la classe "visible" sur la classe "ecran"
    if (distance <= DISTANCE_SEUIL) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }


  animateCamera() {
    this.isAnimating = true;
  
    // Récupérer la position et le point de regard pour l'étape en cours
    const step = this.currentStep % this.totalSteps;
    const { position, lookAt } = this.combinedThresholds[step];
  
    const onComplete = () => {
      this.isAnimating = false;
    };

    gsap.to(this.camera.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: 0.5,
      onComplete: onComplete,
      onUpdate: () => {
        // Mettre à jour le point de regard si disponible
        if (lookAt) {
          this.camera.lookAt(new Vector3(lookAt.x, lookAt.y, lookAt.z));
        }
      }
    });
    
  } 
}
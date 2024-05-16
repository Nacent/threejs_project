import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'//Module d'intégration du modèle 3D

export default class ModelLoader {
    constructor(scene, groupe) {
      this.scene = scene;
      this.groupe = groupe;
      this.loader = new GLTFLoader();
    }
  
    loadModel(url) {
      this.loader.load(
        url,
        gltf => {
          this.groupe.add(gltf.scene);
          this.groupe.traverse(child => {
            if (child.isObject3D) {
              child.castShadow = true;
              child.receiveShadow = true;
            }//intégration des ombres 
          });
          this.scene.add(this.groupe);
        },
        
      );
    }
  }
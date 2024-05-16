import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class CustomControls {

    constructor(camera, domElement) {
        this.controls = new OrbitControls(camera, domElement);
        this.controls.enablePan = false;//mettre en commentaire ou la valeur sur true si il y'a besoin de Déplacer ou Zoomer la caméra autour de l'objet
        this.controls.enableRotate = false;//mettre en commentaire ou la valeur sur true si il y'a besoin de Déplacer ou Zoomer la caméra autour de l'objet
        this.controls.enableZoom = false;//mettre en commentaire ou la valeur sur true si il y'a besoin de Déplacer ou Zoomer la caméra autour de l'objet
        this.controls.target.set( -3.5, 0, -3 );
        this.controls.update();

        
      }

}
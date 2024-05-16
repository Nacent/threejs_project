import { Scene, PerspectiveCamera, AxesHelper, AmbientLight, DirectionalLight, SpotLight, Group, WebGLRenderer, CameraHelper, PCFSoftShadowMap} from 'three';
//import * as THREE from 'three';
import { CustomControls } from './camera.js';//module de controle de la caméra
import { CustomAnimations } from './animation.js';//module animation
import ModelLoader from './modelLoader';
import '../style.css';

const scene = new Scene();
const scrollThresholds = [
    { position: { x: 8, y: 1, z: 6 }, lookAt: { x: 0, y: 1, z: -10 } },
    { position: { x: 1, y: 1, z: -2 }, lookAt: { x: 0, y: 1, z: -2 } },
    { position: { x: 1, y: 1.7, z: -2 }, },
    { position: { x: 0, y: 1.7, z: -1.5 }, lookAt: { x: 0, y: 1.7, z: -2 } },
    { position: { x: 0, y: 1.7, z: -3 }, },
    { position: { x: 1, y: 1.7, z: -4.3 }, },
    { position: { x: 1, y: 1.7, z: -4.3 }, lookAt: { x: 1, y: 1.7, z: -10 }},
    { position: { x: 8, y: 1, z: 6 }, lookAt: { x: 0, y: 1, z: -10 } },
  ] //Position de déplacement du scroll

scene.add(new AxesHelper()); //Point de repère dans l'espace


/*-----Camera position/perspective-----*/


const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.set(8, 1, 6);//position de la caméra
scene.add(camera);


/*-----3D Model Loader----*/


const abint = new AmbientLight(0xffffff, 0.3)
scene.add(abint); //Lumière ambiante pour les couleur du modèle .glb

const light = new DirectionalLight(0xffffff, 0.6)
light.position.set(3, 0, 10)//direction de la lumière
light.castShadow = true;
light.shadow.mapSize.width = 4060;
light.shadow.mapSize.height = 4060;//résolution des ombres
light.shadow.bias = -0.0001; //Ajustez cette valeur en fonction de votre scène afin d'éviter d'avoir des effet d'ombre génante
light.shadow.camera.near = 0.9;
light.shadow.camera.far = 500;
scene.add(light)

const spotLight = new SpotLight( 0xff0000 );
spotLight.position.set( 0, 0.501, -3 );
spotLight.target.position.set( 0, 0.5, -3)//Jeu de lumière rose

const spotLight_2 = new SpotLight( 0xF3F573 );
spotLight_2.position.set( 1, 0.501, -4.5 );
spotLight_2.target.position.set( 1, 0.5, -4.5);//Jeu de lumière jaune droite

const spotLight_3 = new SpotLight( 0xF3F573 );
spotLight_3.position.set( -0.5, 0.501, -4.5 );
spotLight_3.target.position.set( -0.5, 0.5, -4.5);//Jeu de lumière jaune gauche

scene.add(spotLight.target, spotLight );
scene.add(spotLight_2, spotLight_2.target)
scene.add(spotLight_3, spotLight_3.target)

const groupe = new Group();
const modelLoader = new ModelLoader(scene, groupe);
modelLoader.loadModel("/room.glb");//modèle 3D modeliser sur Blender

console.log(modelLoader)

const helper = new CameraHelper(light.shadow.camera);
scene.add( helper );


/*-----Renderer-----*/


const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
});

renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);


/*-----Camera controls-----*/

const button = document.getElementById('object'); // Pour le déploiement du bouton html a l'approche de la caméra
const controls = new CustomControls(camera, renderer.domElement);
const animation = new CustomAnimations(camera, scrollThresholds, button);



let mouseX = 0;
window.addEventListener('mousemove', e => {
    mouseX = e.clientX
});

function animate() {
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    const ratio = (mouseX / window.innerWidth - 0.5) * 2
    groupe.rotation.y = ratio * Math.PI * 0.003;

    animation.checkButtonVisibility();
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
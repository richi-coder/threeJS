import Scrollbar from 'smooth-scrollbar';
import './style.css'
import * as THREE from 'three';
// import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

// SMOOTHNESS

let scrollbar = new Scrollbar.init(document.body, {
  renderByPixels: true
})

let scrollPercent = 0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight, false);
document.body.appendChild( renderer.domElement );

let array = new Array(15).fill(null)


// New object

// *********** ROOM

// Textures 
const loader = new THREE.TextureLoader();

const plane = new THREE.Mesh(
                          new THREE.PlaneGeometry(5,5,5,5),
                          new THREE.MeshBasicMaterial(  { color: 0x222222, wireframe: true } )
                          )
const rightPlane = new THREE.Mesh(
                          new THREE.PlaneGeometry(35,5,35,5),
                          new THREE.MeshBasicMaterial( {
                            map: loader.load('richicoder_logo.png'),
                          } )
                          )
const leftPlane = new THREE.Mesh(
                          new THREE.PlaneGeometry(35,5,35,5),
                          new THREE.MeshBasicMaterial( { color: 0x222222, wireframe: true } )
                          )
const topPlane = new THREE.Mesh(
                          new THREE.PlaneGeometry(35,5,35,5),
                          new THREE.MeshBasicMaterial( { color: 0x222222, wireframe: true } )
                          )
const bottomPlane = new THREE.Mesh(
                          new THREE.PlaneGeometry(35,5,35,5),
                          new THREE.MeshBasicMaterial( { color: 0x222222, wireframe: true } )
                          )

// const geometry = new THREE.BoxGeometry( 50, 50, 50 );
// const material = new THREE.MeshBasicMaterial( { color: 0x01ff1 } );
// const cube = new THREE.Mesh( geometry, material );
scene.add( plane, rightPlane, leftPlane, topPlane, bottomPlane );

// Camera Position
camera.position.set(0,0,2);
camera.lookAt(plane.position);
// First plane position
plane.position.set(0,0,-17.5)
// Right plane position
rightPlane.position.set(2.5,0,0)
rightPlane.rotation.y = -90*(2*3.14/360)
// Left plane position
leftPlane.position.set(-2.5,0,0)
leftPlane.rotation.y = 90*(2*3.14/360)
// Top plane position
topPlane.position.set(0,2.5,0)
topPlane.rotation.x = 90*(2*3.14/360)
topPlane.rotation.z = 90*(2*3.14/360)
// Bottom plane position
bottomPlane.position.set(0,-2.5,0)
bottomPlane.rotation.x = 90*(2*3.14/360)
bottomPlane.rotation.z = 90*(2*3.14/360)

// ******* SQUARES

array.forEach((item, indexPosition) => {
  let square = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,1,1),
    new THREE.MeshBasicMaterial(  {
      map: loader.load('richicoder_logo.png'),
    }  )
    )
  let indexRandom = Math.round(Math.random())
  let randomMath = [Math.random(), -Math.random()]
  const yPosition = randomMath[indexRandom]
  const xPosition = randomMath[indexRandom]
  
  square.position.set(xPosition,yPosition,Number(`0.${indexPosition}`)*5)
  
  scene.add( square )
})


function animate() {
	requestAnimationFrame( animate );
  playScrollAnimation()

	renderer.render( scene, camera );
}
animate();


function playScrollAnimation() {
  camera.lookAt(plane.position)
  // camera.position.set(20, 10, 20)
  // plane.position.z = scrollPercent;
  camera.position.z = (-scrollPercent+50)/10
}


setTimeout(() => {
  
  scrollbar.addListener(() => {
    scrollPercent =
        ((scrollbar.offset.y) /
            (scrollbar.size.content.height -
                document.documentElement.clientHeight)) * 100;
    console.log(scrollPercent);
})


}, 1000);


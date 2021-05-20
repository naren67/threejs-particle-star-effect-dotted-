import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'



//texture loader - (plus png)
const loader = new THREE.TextureLoader()
const cross = loader.load('./plus.png')





// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );








//add custom particles - (stars)
const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 5000;

const postArray = new Float32Array(particlesCount * 3)
// xyz, xyz, xyz, xyz

//looping
for(let i=0;i<particlesCount * 3; i++){
    // postArray[i] = Math.random()

    //to mke it center
    // postArray[i] = Math.random() - 0.5

    //to spead it with a widt 0f 100%
    postArray[i] = (Math.random() - 0.5) * 5

    //for creativity
    // postArray[i] = (Math.random() - 0.5) * (Math.random() * 5)
}

//positioning
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(postArray, 3))







// Materials

//defaultly presented material storage
const material = new THREE.PointsMaterial({
    size:0.005,
    color: 'black'
})

//storage for the particles material
const particlesMaterial = new THREE.PointsMaterial({
    size:0.003,
    // map:cross,
    // transparent:true,
     color:'black',
    //blending:THREE.AdditiveBlending,
})


// Mesh
const sphere = new THREE.Points(geometry,material)
//floating particles code
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
//add the newly created materials and geometry
scene.add(sphere, particlesMesh)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



//add background color
renderer.setClearColor(new THREE.Color('#ffffff'), 0.9)



//mouse movement events for star particles

document.addEventListener('mousemove', animateParticles)

let mouseX = 0
let mouseY = 0

function animateParticles(event){
    mouseX =event.clientX
    mouseY = event.clientY
}




/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects - donut
    sphere.rotation.y = .5 * elapsedTime


    window.addEventListener('load',()=>{
        runSlow()
})


    //to get a initial star movement
    particlesMesh.rotation.y = .1 * elapsedTime
    


    // Update objects - stars rotation        // ***** notes - play with the 0.00008 to 1 to make the star move speeder and also play with minus plus and x and y value
   if(mouseX >0){
    particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00008)
    particlesMesh.rotation.y = -mouseX * (elapsedTime * 0.00008)
   }



    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
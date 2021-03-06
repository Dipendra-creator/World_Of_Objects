import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes helper
const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)
const material = new THREE.MeshNormalMaterial()
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new THREE.TextBufferGeometry('Dipendra Bhardwaj \n Web Designer',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4,
            }
        )

        textGeometry.center()
        const textMaterial = new THREE.MeshNormalMaterial({wireframe: false, matcap: matcapTexture})
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)
    }
)

const count = 500

for(let i = 0; i < count; i++) {

    console.log(i)

    const sphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.5, 16, 16),
        material
    )
    
    const torus = new THREE.Mesh(
     new THREE.TorusBufferGeometry(0.5, 0.2, 16, 32),
     material
    )

    const cube = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 1, 1),
        material
    )
    var min=-50;
    var max=50; 
    var randomX = Math.floor(Math.random() * (+max - +min) + +min)
    var randomY = Math.floor(Math.random() * (+max - +min) + +min)
    var randomZ = Math.floor(Math.random() * (+max - +min) + +min)
    
    sphere.position.set(randomX, randomY, randomZ)

    var randomX = Math.floor(Math.random() * (+max - +min) + +min)
    var randomY = Math.floor(Math.random() * (+max - +min) + +min)
    var randomZ = Math.floor(Math.random() * (+max - +min) + +min)

    torus.position.set(randomX, randomY, randomZ)

    cube.position.set(randomX * 0.5, randomY * 0.4, randomZ * 0.9)

    scene.add(sphere, torus, cube)
}
/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
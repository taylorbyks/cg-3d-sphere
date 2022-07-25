import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { render } from './utils'
import { camera } from './cameras'
import { width, height } from './const'

const renderer = new THREE.WebGLRenderer()
const controls = new OrbitControls(camera, renderer.domElement)
const stats = Stats()

renderer.setSize(width, height)

document.body.appendChild(renderer.domElement)
document.body.appendChild(stats.dom)

// Listeners
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  if (camera instanceof THREE.PerspectiveCamera) {
    camera.aspect = width / height
  }
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
  render(renderer, camera as any)
}
window.addEventListener('keydown', function (event: KeyboardEvent) {
  switch (event.key) {
    case 'w':
      camera.position.z += 1
      break
    case 's':
      camera.position.z -= 1
      break
    case 'a':
      camera.position.x += 1
      break
    case 'd':
      camera.position.x -= 1
      break
  }
})

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  render(renderer, camera as any)
  stats.update()
}

animate()

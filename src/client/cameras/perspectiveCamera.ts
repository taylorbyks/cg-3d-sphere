import * as THREE from 'three'
import { width, height } from '../const'

export const perspectiveCamera = new THREE.PerspectiveCamera(
  75,
  width / height,
  0.1,
  1000,
)

perspectiveCamera.position.z = 4
perspectiveCamera.position.y = 2

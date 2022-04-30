import * as THREE from 'three'
import { width, height } from '../const'

export const orthographicCamera = new THREE.OrthographicCamera(
  width / -2,
  width / 2,
  height / 2,
  height / -2,
  1,
  1000,
)

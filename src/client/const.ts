import * as THREE from 'three'

export const width = window.innerWidth
export const height = window.innerHeight
export const axios = {
  x: 500,
  y: 500,
  z: 500,
}
export const grid = {
  size: 500,
  divisions: 500,
  color: 500,
}
export const spheres = new THREE.Group()
export const scene = new THREE.Scene()
scene.autoUpdate = true
scene.add(new THREE.GridHelper(grid.size, grid.divisions, grid.color))
scene.add(spheres)

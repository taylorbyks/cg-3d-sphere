import * as THREE from 'three'

export const width = window.innerWidth
export const height = window.innerHeight
export const axios = {
  x: 25,
  y: 25,
  z: 25,
}
export const grid = {
  size: 25,
  divisions: 25,
  color: 25,
}
export const light = {
  color: 0xffffff,
  x: 25,
  y: 25,
  z: 25,
}
export const spheres = new THREE.Group()
export const scene = new THREE.Scene()
const pointLight = new THREE.PointLight(light.color, 1, 100000)
pointLight.position.set(light.x, light.y, light.z)
scene.autoUpdate = true
scene.add(new THREE.GridHelper(grid.size, grid.divisions, grid.color))
scene.add(pointLight)
scene.add(spheres)

import * as THREE from 'three'
import { axios, grid, light, scene, spheres } from '../const'
import { spheresFolder } from '../menu'
import { SphereProps, GuiFolder } from '../types'

function createEmptyMesh() {
  return new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    }),
  )
}

function createMaterial(material?: any) {
  if (
    material instanceof THREE.MeshBasicMaterial ||
    material instanceof THREE.MeshPhongMaterial ||
    material instanceof THREE.MeshLambertMaterial
  ) {
    return material
  }

  return new THREE.MeshBasicMaterial(material)
}

function createSphere(
  { radius, widthSegments, heightSegments }: SphereProps,
  materialProp: THREE.MeshBasicMaterialParameters | THREE.MeshBasicMaterial,
) {
  const material = createMaterial(materialProp)
  const geometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments,
  )
  return new THREE.Mesh(geometry, material)
}

function updateGeometry(
  parent: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>,
  SphereProps: SphereProps,
) {
  const material = (parent.children[0] as any).material
  console.log(material)
  parent.remove(parent.children[0])
  parent.add(createSphere(SphereProps, material))
}

export function render(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
) {
  renderer.render(scene, camera)
}

export function updateLight(active = true) {
  const oldLight = scene.children.findIndex(
    child => child.type === 'PointLight',
  )
  scene.remove(scene.children[oldLight])
  if (active) {
    const newPointLight = new THREE.PointLight(light.color, 1, 100000)
    newPointLight.position.set(light.x, light.y, light.z)
    scene.add(newPointLight)
  }
}

export function updateGrid(active = true) {
  const oldGridIndex = scene.children.findIndex(
    child => child.type === 'GridHelper',
  )
  scene.remove(scene.children[oldGridIndex])
  if (active) {
    scene.add(new THREE.GridHelper(grid.size, grid.divisions, grid.color))
  }
}

export function removeFolder(parentFolder: GuiFolder, id: string) {
  var folderToDelete = parentFolder.__folders[id]
  if (!folderToDelete) {
    return
  }
  folderToDelete.close()
  parentFolder.__ul.removeChild(folderToDelete.domElement.parentNode)
  delete parentFolder.__folders[id]
  parentFolder.onResize()
}

export function cleanSpheres() {
  spheres.children.forEach(({ id }) =>
    removeFolder(spheresFolder as unknown as GuiFolder, `Sphere ${id}`),
  )
  spheres.clear()
}

export function addSphere() {
  const materialProp = {
    color: 0xff,
  }
  var material = new THREE.MeshBasicMaterial(materialProp)

  var mesh = createEmptyMesh()
  var sphere = createSphere(
    {
      radius: 1,
      widthSegments: 32,
      heightSegments: 16,
    },
    material,
  )

  mesh.add(sphere)
  spheres.add(mesh)

  const sphereFolder = spheresFolder.addFolder(`Sphere ${mesh.id}`)
  sphereFolder.add(
    {
      Delete: () => {
        removeFolder(spheresFolder as unknown as GuiFolder, `Sphere ${mesh.id}`)
        spheres.remove(mesh)
      },
    },
    'Delete',
  )
  sphereFolder
    .add(mesh.geometry.parameters, 'radius', 1, 30)
    .onChange(() => updateGeometry(mesh, mesh.geometry.parameters))
  sphereFolder
    .add(mesh.geometry.parameters, 'widthSegments', 3, 64)
    .step(1)
    .onChange(() => updateGeometry(mesh, mesh.geometry.parameters))
  sphereFolder
    .add(mesh.geometry.parameters, 'heightSegments', 2, 32)
    .step(1)
    .onChange(() => updateGeometry(mesh, mesh.geometry.parameters))
  const materialFolder = sphereFolder.addFolder('Material')
  materialFolder.addColor(materialProp, 'color').onChange(() => {
    console.log(material)
    material.color.setHex(materialProp.color)
  })
  materialFolder.add(
    {
      Gouraud: () => {
        sphere.material.dispose()
        material = new THREE.MeshLambertMaterial({
          color: sphere.material.color,
          wireframe: sphere.material.wireframe,
        })
        sphere.material = material
      },
    },
    'Gouraud',
  )
  materialFolder.add(
    {
      Phong: () => {
        sphere.material.dispose()
        material = new THREE.MeshPhongMaterial({
          color: sphere.material.color,
          wireframe: sphere.material.wireframe,
        })
        sphere.material = material
      },
    },
    'Phong',
  )
  materialFolder.add(
    {
      Constant: () => {
        sphere.material.dispose()
        material = new THREE.MeshBasicMaterial({
          color: sphere.material.color,
          wireframe: sphere.material.wireframe,
        })
        sphere.material = material
      },
    },
    'Constant',
  )
  materialFolder.add(
    {
      Wireframe: () => {
        material.wireframe = !sphere.material.wireframe
      },
    },
    'Wireframe',
  )
  const positionFolder = sphereFolder.addFolder('Position')
  positionFolder.add(mesh.position, 'x', -axios.x, axios.x)
  positionFolder.add(mesh.position, 'y', -axios.y, axios.y)
  positionFolder.add(mesh.position, 'z', -axios.z, axios.z)
  const rotationFolder = sphereFolder.addFolder('Rotation')
  rotationFolder.add(mesh.rotation, 'x', 0, Math.PI * 2, 0.01)
  rotationFolder.add(mesh.rotation, 'y', 0, Math.PI * 2, 0.01)
  rotationFolder.add(mesh.rotation, 'z', 0, Math.PI * 2, 0.01)
  const scaleFolder = sphereFolder.addFolder('Scale')
  scaleFolder.add(mesh.scale, 'x', 0)
  scaleFolder.add(mesh.scale, 'y', 0)
  scaleFolder.add(mesh.scale, 'z', 0)
}

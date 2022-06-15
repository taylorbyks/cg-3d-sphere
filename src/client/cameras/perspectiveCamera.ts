import * as THREE from 'three'
import { MathUtils } from 'three'
import { width, height } from '../const'

interface PerspectiveCameraOptions {
  fov?: number
  aspect?: number
  position?: THREE.Vector3
}
class PerspectiveCamera extends THREE.Camera {
  type: string
  fov: number
  zoom: number
  near: number
  far: number
  focus: number
  aspect: number
  filmGauge: number
  filmOffset: number
  projectionMatrix: any
  projectionMatrixInverse: any
  position: THREE.Vector3
  view:
    | {
        enabled: boolean
        fullWidth: number
        fullHeight: number
        offsetX: number
        offsetY: number
        width: number
        height: number
      }
    | undefined

  constructor({
    fov = 75,
    aspect = 1,
    position = new THREE.Vector3(0, 0, 0),
  }: PerspectiveCameraOptions) {
    super()

    this.type = 'Camera'
    this.fov = fov
    this.zoom = 1
    this.near = 0.1
    this.far = 1000
    this.focus = 10
    this.aspect = aspect
    this.filmGauge = 35
    this.filmOffset = 0
    this.position = position

    this.updateProjectionMatrix()
  }

  updateProjectionMatrix() {
    const near = this.near
    let top = (near * Math.tan(MathUtils.DEG2RAD * 0.5 * this.fov)) / this.zoom
    let height = 2 * top
    let width = this.aspect * height
    let left = -0.5 * width

    if (this.view !== undefined && this.view.enabled) {
      const fullWidth = this.view.fullWidth,
        fullHeight = this.view.fullHeight

      left += (this.view.offsetX * width) / fullWidth
      top -= (this.view.offsetY * height) / fullHeight
      width *= this.view.width / fullWidth
      height *= this.view.height / fullHeight
    }

    this.projectionMatrix.makePerspective(
      left,
      left + width,
      top,
      top - height,
      near,
      this.far,
    )

    this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
  }
}

export const perspectiveCamera = new PerspectiveCamera({
  aspect: width / height,
  position: new THREE.Vector3(4, 2, 0),
})

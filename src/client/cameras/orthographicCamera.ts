import * as THREE from 'three'
import { width, height } from '../const'

interface OrthographicCameraOptions {
  zoom?: number
  left?: number
  right?: number
  top?: number
  bottom?: number
  near?: number
  far?: number
}

class OrthographicCamera extends THREE.Camera {
  zoom: number
  left: number
  right: number
  top: number
  bottom: number
  near: number
  far: number
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
    zoom = 1,
    left = -1,
    right = 1,
    top = 1,
    bottom = -1,
    near = 0.1,
    far = 1000,
  }: OrthographicCameraOptions) {
    super()

    this.type = 'Camera'
    this.zoom = zoom
    this.left = left
    this.right = right
    this.top = top
    this.bottom = bottom
    this.near = near
    this.far = far

    this.updateProjectionMatrix()
  }

  updateProjectionMatrix() {
    const dx = (this.right - this.left) / (2 * this.zoom)
    const dy = (this.top - this.bottom) / (2 * this.zoom)
    const cx = (this.right + this.left) / 2
    const cy = (this.top + this.bottom) / 2

    let left = cx - dx
    let right = cx + dx
    let top = cy + dy
    let bottom = cy - dy

    if (this.view !== undefined && this.view.enabled) {
      const scaleW = (this.right - this.left) / this.view.fullWidth / this.zoom
      const scaleH = (this.top - this.bottom) / this.view.fullHeight / this.zoom

      left += scaleW * this.view.offsetX
      right = left + scaleW * this.view.width
      top -= scaleH * this.view.offsetY
      bottom = top - scaleH * this.view.height
    }

    this.projectionMatrix.makeOrthographic(
      left,
      right,
      top,
      bottom,
      this.near,
      this.far,
    )

    this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
  }
}

export const orthographicCamera = new OrthographicCamera({
  left: width / -2,
  right: width / 2,
  top: height / 2,
  bottom: height / -2,
})

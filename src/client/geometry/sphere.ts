import { BufferGeometry, Float32BufferAttribute, Vector3 } from 'three'

export class Sphere extends BufferGeometry {
  parameters: { radius: number; meridians: number; parallels: number }
  constructor(radius = 1, meridians = 32, parallels = 16) {
    super()
    this.type = 'Sphere'

    meridians = Math.max(3, Math.floor(meridians))
    parallels = Math.max(2, Math.floor(parallels))

    let index = 0
    const grid = []

    const vertex = new Vector3()
    const normal = new Vector3()

    // buffers

    const indices = []
    const vertices = []
    const normals = []
    const uvs = []

    // generate vertices, normals and uvs

    for (let iy = 0; iy <= parallels; iy++) {
      const verticesRow = []

      const v = iy / parallels

      // special case for the poles

      let uOffset = 0

      if (iy == 0) {
        uOffset = 0.5 / meridians
      } else if (iy == parallels) {
        uOffset = -0.5 / meridians
      }

      for (let ix = 0; ix <= meridians; ix++) {
        const u = ix / meridians

        // vertex

        vertex.x = -radius * Math.cos(u * Math.PI * 2) * Math.sin(v * Math.PI)
        vertex.y = radius * Math.cos(v * Math.PI)
        vertex.z = radius * Math.sin(u * Math.PI * 2) * Math.sin(v * Math.PI)

        vertices.push(vertex.x, vertex.y, vertex.z)

        // normal

        normal.copy(vertex).normalize()
        normals.push(normal.x, normal.y, normal.z)

        // uv

        uvs.push(u + uOffset, 1 - v)

        verticesRow.push(index++)
      }

      grid.push(verticesRow)
    }

    // indices

    for (let iy = 0; iy < parallels; iy++) {
      for (let ix = 0; ix < meridians; ix++) {
        const a = grid[iy][ix + 1]
        const b = grid[iy][ix]
        const c = grid[iy + 1][ix]
        const d = grid[iy + 1][ix + 1]

        if (iy !== 0) indices.push(a, b, d)
        if (iy !== parallels - 1) indices.push(b, c, d)
      }
    }

    // build geometry

    this.parameters = {
      radius,
      meridians,
      parallels,
    }
    this.setIndex(indices)
    this.setAttribute('position', new Float32BufferAttribute(vertices, 3))
    this.setAttribute('normal', new Float32BufferAttribute(normals, 3))
    this.setAttribute('uv', new Float32BufferAttribute(uvs, 2))
  }
}

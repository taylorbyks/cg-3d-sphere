import { GUI } from 'dat.gui'
import { axios, grid, light } from '../const'
import { cleanSpheres, addSphere, updateGrid, updateLight } from '../utils'

export const gui = new GUI()
export const spheresFolder = gui.addFolder('Spheres')
spheresFolder.open()
spheresFolder.add(
  {
    Clear: () => cleanSpheres(),
  },
  'Clear',
)
spheresFolder.add(
  {
    Add: () => addSphere(),
  },
  'Add',
)
const worldFolder = gui.addFolder('World Limits')
worldFolder.add(axios, 'x', 1)
worldFolder.add(axios, 'y', 1)
worldFolder.add(axios, 'z', 1)
const gridFolder = worldFolder.addFolder('Grid')
gridFolder.add(grid, 'size', 1).onChange(updateGrid)
gridFolder.add(grid, 'divisions', 2).onChange(updateGrid)
// gridFolder.add(grid, 'color').onChange(updateGrid)
gridFolder.add(
  {
    Hide: () => updateGrid(false),
  },
  'Hide',
)
gridFolder.add(
  {
    Show: updateGrid,
  },
  'Show',
)
const lightFolder = gui.addFolder('Light')
lightFolder.addColor(light, 'color').onChange(updateLight)
lightFolder.add(light, 'x', -axios.x, axios.x).onChange(updateLight)
lightFolder.add(light, 'y', -axios.y, axios.y).onChange(updateLight)
lightFolder.add(light, 'z', -axios.z, axios.z).onChange(updateLight)
lightFolder.add(
  {
    Hide: () => updateLight(false),
  },
  'Hide',
)
lightFolder.add(
  {
    Show: updateLight,
  },
  'Show',
)

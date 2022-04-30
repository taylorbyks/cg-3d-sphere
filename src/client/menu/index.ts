import { GUI } from 'dat.gui'
import { axios, grid } from '../const'
import { cleanSpheres, addSphere, updateGrid } from '../utils'

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
worldFolder.add(axios, 'x')
worldFolder.add(axios, 'y')
worldFolder.add(axios, 'z')
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

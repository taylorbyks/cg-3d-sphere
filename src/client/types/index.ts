export type GuiFolder = {
  __folders: { [x: string]: any }
  __ul: { removeChild: (arg0: any) => void }
  onResize: () => void
}

export type SphereProps = {
  radius: number
  meridians: number
  parallels: number
}

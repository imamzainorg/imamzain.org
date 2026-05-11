export {}

declare global {
  interface CanvasRenderingContext2D {
    roundRect?: (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) => void
  }
}
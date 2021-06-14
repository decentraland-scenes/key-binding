// Colors to cycle through (6 main colours)
export const paintColors: GLTFShape[] = [
  new GLTFShape("models/redPaint.glb"),
  new GLTFShape("models/orangePaint.glb"),
  new GLTFShape("models/yellowPaint.glb"),
  new GLTFShape("models/greenPaint.glb"),
  new GLTFShape("models/bluePaint.glb"),
  new GLTFShape("models/purplePaint.glb")
]

export class PaintManager {

  public static colorIndex: number = 0

  public static nextPaintColor(): void {
    PaintManager.colorIndex < paintColors.length - 1
      ? PaintManager.colorIndex++
      : (PaintManager.colorIndex = 0)
  }
  public static previousPaintColor(): void {
    PaintManager.colorIndex == 0
      ? PaintManager.colorIndex = paintColors.length - 1
      : PaintManager.colorIndex--
  }
}

export class Guide extends Entity {
  public guideVisibleImage: UIImage

  constructor(canvas: UICanvas) {
    super()
    const guideContainer = new UIContainerRect(canvas)
    guideContainer.adaptWidth = true
    guideContainer.width = "100%"
    guideContainer.height = "100%"
    guideContainer.isPointerBlocker = false

    this.guideVisibleImage = new UIImage(canvas, new Texture("images/guide.png"))
    this.guideVisibleImage.sourceWidth = 640
    this.guideVisibleImage.sourceHeight = 360
    this.guideVisibleImage.positionX = 15
    this.guideVisibleImage.positionY = -128
    this.guideVisibleImage.hAlign = "left"
    this.guideVisibleImage.vAlign = "top"
    this.guideVisibleImage.width = 256
    this.guideVisibleImage.height = 144
  }
}

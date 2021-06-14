// BUG: Issue with having all combining all the animations contained within the bucket...
// Only able to play through each animation once only so am now using a workaround where the
// paint animations are separated and the child of the bucket (might be to do with the way animation is setup)
export class Bucket extends Entity {

  public redPaint = new Entity()
  public orangePaint = new Entity()
  public yellowPaint = new Entity()
  public greenPaint = new Entity()
  public bluePaint = new Entity()
  public indigoPaint = new Entity()
  public violetPaint = new Entity()

  constructor(transform: Transform) {
    super()
    engine.addEntity(this)
    this.addComponent(new GLTFShape("models/bucket.glb"))
    this.addComponent(transform)

    this.addComponent(new Animator())
    this.getComponent(Animator).addClip(new AnimationState("Blank", { looping: false }))
    this.getComponent(Animator).addClip(new AnimationState("SwitchPaint", { looping: false }))
    this.getComponent(Animator).getClip("SwitchPaint").play(true)

    // ANNOYING WORKAROUND: Paints
    this.redPaint.addComponent(new GLTFShape("models/bucketRedPaint.glb"))
    this.redPaint.addComponent(new Transform())
    this.redPaint.addComponent(new Animator())
    this.redPaint.getComponent(Animator).addClip(new AnimationState("SwitchPaint", { looping: false }))
    this.redPaint.getComponent(Animator).getClip("SwitchPaint").play(true)
    this.redPaint.setParent(this)

    this.orangePaint.addComponent(new GLTFShape("models/bucketOrangePaint.glb"))
    this.orangePaint.addComponent(new Transform())
    this.orangePaint.addComponent(new Animator())
    this.orangePaint.getComponent(Animator).addClip(new AnimationState("SwitchPaint", { looping: false }))
    this.orangePaint.setParent(this)

    this.yellowPaint.addComponent(new GLTFShape("models/bucketYellowPaint.glb"))
    this.yellowPaint.addComponent(new Transform())
    this.yellowPaint.addComponent(new Animator())
    this.yellowPaint.getComponent(Animator).addClip(new AnimationState("SwitchPaint", { looping: false }))
    this.yellowPaint.setParent(this)

    this.greenPaint.addComponent(new GLTFShape("models/bucketGreenPaint.glb"))
    this.greenPaint.addComponent(new Transform())
    this.greenPaint.addComponent(new Animator())
    this.greenPaint.getComponent(Animator).addClip(new AnimationState("SwitchPaint", { looping: false }))
    this.greenPaint.setParent(this)

    this.bluePaint.addComponent(new GLTFShape("models/bucketBluePaint.glb"))
    this.bluePaint.addComponent(new Transform())
    this.bluePaint.addComponent(new Animator())
    this.bluePaint.getComponent(Animator).addClip(new AnimationState("SwitchPaint", { looping: false }))
    this.bluePaint.setParent(this)

    this.indigoPaint.addComponent(new GLTFShape("models/bucketIndigoPaint.glb"))
    this.indigoPaint.addComponent(new Transform())
    this.indigoPaint.addComponent(new Animator())
    this.indigoPaint.getComponent(Animator).addClip(new AnimationState("SwitchPaint", { looping: false }))
    this.indigoPaint.setParent(this)

    this.violetPaint.addComponent(new GLTFShape("models/bucketVioletPaint.glb"))
    this.violetPaint.addComponent(new Transform())
    this.violetPaint.addComponent(new Animator())
    this.violetPaint.getComponent(Animator).addClip(new AnimationState("SwitchPaint", { looping: false }))
    this.violetPaint.setParent(this)
  }

  // Switching paints (NEEDS REFACTORING)
  switchPaintAnim(colorIndex: number) {
    this.turnOffPaintVisibility()
    switch (colorIndex) {
      case 0:
        this.redPaint.getComponent(Transform).scale.setAll(1)
        this.redPaint.getComponent(Animator).getClip("SwitchPaint").play(true)
        this.getComponent(Animator).getClip("SwitchPaint").play(true)
        break
      case 1:
        this.orangePaint.getComponent(Transform).scale.setAll(1)
        this.orangePaint.getComponent(Animator).getClip("SwitchPaint").play(true)
        this.getComponent(Animator).getClip("SwitchPaint").play(true)
        break
      case 2:
        this.yellowPaint.getComponent(Transform).scale.setAll(1)
        this.yellowPaint.getComponent(Animator).getClip("SwitchPaint").play(true)
        this.getComponent(Animator).getClip("SwitchPaint").play(true)
        break
      case 3:
        this.greenPaint.getComponent(Transform).scale.setAll(1)
        this.greenPaint.getComponent(Animator).getClip("SwitchPaint").play(true)
        this.getComponent(Animator).getClip("SwitchPaint").play(true)
        break
      case 4:
        this.bluePaint.getComponent(Transform).scale.setAll(1)
        this.bluePaint.getComponent(Animator).getClip("SwitchPaint").play(true)  
        this.getComponent(Animator).getClip("SwitchPaint").play(true)
        break
      case 5:
        this.indigoPaint.getComponent(Transform).scale.setAll(1)
        this.indigoPaint.getComponent(Animator).getClip("SwitchPaint").play(true)  
        this.getComponent(Animator).getClip("SwitchPaint").play(true)
        break
      case 6:
        this.violetPaint.getComponent(Transform).scale.setAll(1)
        this.violetPaint.getComponent(Animator).getClip("SwitchPaint").play(true)  
        this.getComponent(Animator).getClip("SwitchPaint").play(true)
        break
    }
  }
  turnOffPaintVisibility(): void {
    this.redPaint.getComponent(Transform).scale.setAll(0)
    this.orangePaint.getComponent(Transform).scale.setAll(0)
    this.yellowPaint.getComponent(Transform).scale.setAll(0)
    this.greenPaint.getComponent(Transform).scale.setAll(0)
    this.bluePaint.getComponent(Transform).scale.setAll(0)
    this.indigoPaint.getComponent(Transform).scale.setAll(0)
    this.violetPaint.getComponent(Transform).scale.setAll(0)
  }
}

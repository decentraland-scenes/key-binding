// BUG: Issue with having all combining all the animations contained within the bucket...
// Only able to play through each animation once only so am now using a workaround where the
// paint animations are separated and the child of the bucket (might be to do with the way animation is setup)

// Paint shapes
const bucketPaintShapes: GLTFShape[] = [
  new GLTFShape("models/bucketRedPaint.glb"),
  new GLTFShape("models/bucketOrangePaint.glb"),
  new GLTFShape("models/bucketYellowPaint.glb"),
  new GLTFShape("models/bucketGreenPaint.glb"),
  new GLTFShape("models/bucketBluePaint.glb"),
  new GLTFShape("models/bucketIndigoPaint.glb"),
  new GLTFShape("models/bucketVioletPaint.glb"),
]

const bucketPaints: Entity[] = []

export class Bucket extends Entity {
  constructor(transform: Transform) {
    super()
    engine.addEntity(this)
    this.addComponent(new GLTFShape("models/bucket.glb"))
    this.addComponent(transform)

    this.addComponent(new Animator())
    this.getComponent(Animator).addClip(new AnimationState("Blank", { looping: false }))
    this.getComponent(Animator).addClip(new AnimationState("SwitchPaint", { looping: false }))
    this.getComponent(Animator).getClip("SwitchPaint").play(true)

    // ANIMATION WORKAROUND: Paints
    for (let i = 0; i < bucketPaintShapes.length; i++) {
      const bucketPaint = new Entity()
      bucketPaint.addComponent(bucketPaintShapes[i])
      bucketPaint.addComponent(new Transform())
      bucketPaint.addComponent(new Animator())
      bucketPaint.getComponent(Animator).addClip(new AnimationState("SwitchPaint", { looping: false }))
      bucketPaint.setParent(this)
      bucketPaints.push(bucketPaint)
    }
    // Play animation for red paint on load
    bucketPaints[0].getComponent(Animator).getClip("SwitchPaint").play(true)
  }

  // Switching paints
  switchPaintAnim(colorIndex: number) {
    // BUG WORKAROUND: Turn off visibility of paints first
    for(let i = 0; i < bucketPaints.length; i++) {
      bucketPaints[i].getComponent(Transform).scale.setAll(0)
    }
    bucketPaints[colorIndex].getComponent(Transform).scale.setAll(1)
    bucketPaints[colorIndex].getComponent(Animator).getClip("SwitchPaint").play(true)
    this.getComponent(Animator).getClip("SwitchPaint").play(true)
  }
}

import { Paint } from "./paint"
import { PaintManager, paintColors } from "./paintManager"
import { Sound } from "./sound"
import { Guide } from "./guide"
import { Bucket } from "./bucket"

// UI
const canvas = new UICanvas()
const guide = new Guide(canvas)

// Bucket
let bucket = new Bucket(new Transform())
bucket.getComponent(Transform).position.set(0, -0.5, 0.75)
bucket.getComponent(Transform).rotation = Quaternion.Euler(-10, 0, 0)
bucket.setParent(Attachable.FIRST_PERSON_CAMERA)

// Base
const base = new Entity()
base.addComponent(new GLTFShape("models/baseDarkWithCollider.glb"))
base.addComponent(new Transform({ scale: new Vector3(2, 1, 2) }))
engine.addEntity(base)

// Sound
const splatSound = new Sound(new AudioClip("sounds/splat.mp3"))
const switchSound = new Sound(new AudioClip("sounds/switch.mp3"))

// Message bus
const sceneMessageBus = new MessageBus()

// Cache paints
for (let i = 0; i < paintColors.length; i++) {
  const paintCache = new Entity()
  const paintColorShape = paintColors[i]
  paintCache.addComponent(new Transform({ scale: new Vector3(0, 0, 0) }))
  paintCache.addComponent(paintColorShape)
  engine.addEntity(paintCache)
}

type PaintInfo = {
  colorIndex: number
  position: ReadOnlyVector3
  rotation: Quaternion
}

// Controls
const input = Input.instance
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, true, (e) => {
  if (e.hit && e.hit.entityId) {
    splatSound.getComponent(AudioSource).playOnce()
    const paintInfo: PaintInfo = {
      colorIndex: PaintManager.colorIndex,
      position: e.hit.hitPoint,
      rotation: Quaternion.FromToRotation(Vector3.Up(), e.hit.normal),
    }
    sceneMessageBus.emit("paint", paintInfo)
  }
})

input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, true, (e) => {
  switchSound.getComponent(AudioSource).playOnce()
  PaintManager.nextPaintColor()
  bucket.switchPaintAnim(PaintManager.colorIndex)
})

input.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, true, (e) => {
  switchSound.getComponent(AudioSource).playOnce()
  PaintManager.previousPaintColor()
  bucket.switchPaintAnim(PaintManager.colorIndex)
})

onPlayerExpressionObservable.add(({ expressionId }) => {
  switch (expressionId) {
    case "wave":
      PaintManager.colorIndex = 0
      break
    case "fistpump":
      PaintManager.colorIndex = 1
      break
    case "robot":
      PaintManager.colorIndex = 2
      break
    case "raiseHand":
      PaintManager.colorIndex = 3
      break
    case "clap":
      PaintManager.colorIndex = 4
      break
    case "money":
      PaintManager.colorIndex = 5
      break
    case "kiss":
      PaintManager.colorIndex = 6
      break
    default:
      break
  }

  switchSound.getComponent(AudioSource).playOnce()
  bucket.switchPaintAnim(PaintManager.colorIndex)
})

sceneMessageBus.on("paint", (paintInfo: PaintInfo) => {
  const splat = new Paint(paintColors[paintInfo.colorIndex], new Transform())
  let transform = splat.getComponent(Transform)
  transform.position.copyFrom(paintInfo.position)
  transform.rotation = paintInfo.rotation
})

export class Sound extends Entity {
  constructor(audio: AudioClip) {
    super()
    engine.addEntity(this)
    this.addComponent(new AudioSource(audio))
    this.getComponent(AudioSource).loop = false
    this.setParent(Attachable.AVATAR)
  }
}

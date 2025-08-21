import { MODULE_ID } from "./misc.js";

const splitters = ["|", "-"];

export async function trackTitleAnimation(text) {
  let parts = [];
  for (const splitter of splitters) {
    if (text.includes(splitter))
      parts = text.split(splitter)?.map(t => t?.trim())
  }
  if (parts.length === 0) parts = [text]

  const duration = game.settings.get(MODULE_ID, "track-title.duration") * 1000;

  const size = game.settings.get(MODULE_ID, "track-title.size") / 5;

  const effects = Sequencer.EffectManager.getEffects({ name: "RHYM-trackTitle*" });
  if (effects.length > 0) {
    await Sequencer.EffectManager.endEffects({ name: "RHYM-trackTitle*" })
  }


  const seq = new Sequence({ moduleName: game.modules.get(MODULE_ID).title })
    //Track name
    .effect()
    .name("RHYM-trackTitle-name")
    .text(
      `${parts?.[0] ?? ""}`,
      {
        "fill": "white",
        "align": "left",
        "fontFamily": "Georgia",
        "fontSize": 28 * size,
        dropShadow: true,
        "strokeThickness": 2,
        anchor: { x: 0, y: 0.9 }
      }
    )
    .screenSpace()
    .screenSpaceAboveUI()
    .screenSpaceAnchor({ x: 0.01, y: 0.1 })
    .screenSpacePosition({
      x: document.getElementById("scene-controls").getBoundingClientRect().width,
      y: 0
    })
    .duration(duration)
    .fadeIn(duration / 4)
    .fadeOut(duration / 2)
    //Artist
    .effect()
    .name("RHYM-trackTitle-artist")
    .text(
      `${parts?.[1] ?? ""}`,
      {
        "fill": "white",
        "align": "left",
        "fontFamily": "Georgia",
        "fontSize": 14 * size,
        dropShadow: true,
        "strokeThickness": 2,
        anchor: { x: 0, y: 0.1 }
      }
    )
    .screenSpace()
    .screenSpaceAboveUI()
    .screenSpaceAnchor({ x: 0.015, y: 0.1 })
    .screenSpacePosition({
      x: document.getElementById("scene-controls").getBoundingClientRect().width,
      y: 0
    })
    .duration(duration)
    .fadeIn(duration / 4)
    .fadeOut(duration / 4)
  seq.play()
}

// Bottom Right
/**
const seq = new Sequence()
  //Track name
  .effect()
  .text(
   ` ${parts?.[0] ?? ""} `,
    {
        "fill": "white",
        "align": "left",
        "fontFamily": "Arial Black",
        "fontSize": 28,
       "strokeThickness": 4,
      anchor: {x: 1, y: 0.9}
    }
  )
  .screenSpace()
  .screenSpaceAboveUI()
  .screenSpaceAnchor({x: 1, y: 0.9})
  .screenSpacePosition({
    x:-document.getElementById("ui-right").getBoundingClientRect().width,
    y: 0
  })
  .duration(duration)
  .fadeIn(duration/4)
  .fadeOut(duration/2)
  //Author
.effect()
  .text(
   ` ${parts?.[1] ?? ""} `,
    {
        "fill": "white",
        "align": "left",
        "fontFamily": "Arial Black",
        "fontSize": 14,
       "strokeThickness": 4,
      anchor: {x: 1, y: 0.1}
    }
  )
  .screenSpace()
  .screenSpaceAboveUI()
  .screenSpaceAnchor({x: 1, y: 0.9})
  .screenSpacePosition({
    x:-document.getElementById("ui-right").getBoundingClientRect().width,
    y: 0
  })
  .duration(duration)
  .fadeIn(duration/4)
  .fadeOut(duration/2)
seq.play()*/
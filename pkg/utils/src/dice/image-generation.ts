import { createCanvas, type SKRSContext2D } from "@napi-rs/canvas";
import type { RollResult } from "#dice/roll";

const boxSize = 80;
const pad = 10;

function square(ctx: SKRSContext2D, x: number, y: number, value: string, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, boxSize, boxSize, 10);
  ctx.fill();

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 40px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(value, x + boxSize / 2, y + boxSize / 2);
}

function circle(ctx: SKRSContext2D, x: number, y: number, value: string) {
  ctx.fillStyle = "#003d66";
  ctx.beginPath();
  ctx.arc(x + boxSize / 2, y + boxSize / 2, boxSize / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 40px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(value, x + boxSize / 2, y + boxSize / 2);
}

export function imgGenerator(result: RollResult): Buffer {
  const variacao = !result.variation;

  const qntDados = result.values.length + (variacao ? 1 : 2);

  const width = qntDados * (boxSize + pad * 2);
  const height = boxSize + pad * 2;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  result.values.forEach((value, i) => {
    const x = i * (boxSize + pad) + pad;
    square(ctx, x, pad, value.toString(), "#330066");
  });

  if (result.variation < 0) {
    const x = result.values.length * (boxSize + pad * 2);
    square(ctx, x, pad, result.variation.toString(), "#810000");
  } else if (result.variation > 0) {
    const x = result.values.length * (boxSize + pad * 2);
    square(ctx, x, pad, result.variation.toString(), "#009719");
  }

  if (result.variation) {
    const x = (result.values.length + 1) * (boxSize + pad * 2);
    circle(ctx, x, pad, result.total.toString());
    return canvas.toBuffer("image/png");
  }
  const x = result.values.length * (boxSize + pad * 2);
  circle(ctx, x, pad, result.total.toString());

  return canvas.toBuffer("image/png");
}

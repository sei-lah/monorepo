import { createCanvas, type SKRSContext2D } from "@napi-rs/canvas";
import type { RollResult } from "./rolldice.ts";

const boxSize = 80;
const pad = 10;

function square(ctx: SKRSContext2D, x: number, y: number, value: string) {
  ctx.fillStyle = "#330066";
  ctx.beginPath();
  ctx.roundRect(x, y, boxSize, boxSize, 10);
  ctx.fill();

  ctx.strokeStyle = "#6666FF";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#afafff";
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

  ctx.strokeStyle = "#007acc";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#4fb8ff";
  ctx.font = "bold 40px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(value, x + boxSize / 2, y + boxSize / 2);
}

export function imgGenerator(result: RollResult): Buffer {
  const width = result.values.length * (boxSize + pad * 2) + pad * 2 + boxSize;
  const height = boxSize + pad * 2;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  result.values.forEach((value, i) => {
    const x = i * (boxSize + pad) + pad;
    square(ctx, x, pad, value.toString());
  });

  const x = result.values.length * (boxSize + pad * 2);
  circle(ctx, x, pad, result.total.toString());

  return canvas.toBuffer("image/png");
}

export interface RollResult {
  qnt: number;
  face: number;
  values: number[];
  variation: number;
  total: number;
}

export const minDice = 1;
export const maxDice = 10;
export const diceFaces = [3, 4, 6, 8, 10, 12, 20];

export function roll(xp: string): RollResult | false {
  const regex = new RegExp(
    `^(${maxDice}|[${minDice}-${maxDice - 1}])d(${diceFaces.join("|")})([+-]\\d+)?$`,
  );
  const match = xp.match(regex);
  if (!match) {
    return false;
  }
  const qnt = Number(match[1]);
  const face = Number(match[2]);
  const variation = Number(match[3]);
  const values = Array.from({ length: qnt }, () => Math.floor(Math.random() * face) + 1);
  let total = 0;
  for (const value of values) {
    total += value;
  }
  if (variation) {
    total += variation;
  }
  return { qnt, face, values, variation, total };
}

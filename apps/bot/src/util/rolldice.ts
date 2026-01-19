export interface RollResult {
  qnt: number;
  face: number;
  values: number[];
  total: number;
}

export const minDice = 1;
export const maxDice = 10;
export const diceFaces = [3, 4, 6, 8, 10, 12, 20];

export function roll(xp: string): RollResult | false {
  ///^(10|[1-9])d(3|4|6|8|10|12|20)$/gm
  const regex = new RegExp(`^(${maxDice}|[${minDice}-${maxDice - 1}])d(${diceFaces.join("|")})$`);
  const match = xp.match(regex);
  if (!match) {
    return false;
  }
  const qnt = Number(match[1]);
  const face = Number(match[2]);
  const values = Array.from({ length: qnt }, () => Math.floor(Math.random() * face) + 1);
  let total = 0;
  for (const value of values) {
    total += value;
  }
  return { qnt, face, values, total };
}

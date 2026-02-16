import { roll } from "@pkg/utils/dice/roll";
import { Reorder } from "motion/react";
import { useState } from "react";

interface RollItem {
  id: string;
  value: number;
}

function createItems(values: number[]): RollItem[] {
  return values.map((v) => ({ id: crypto.randomUUID(), value: v }));
}

export function Atributos() {
  const [items, setItems] = useState(createItems([0, 0, 0]));
  const [rolado, setRolado] = useState(false);

  function rolar() {
    const xp = "2d6+3";
    const r1 = roll(xp);
    const r2 = roll(xp);
    const r3 = roll(xp);
    if (!(r1 && r2 && r3)) {
      throw new Error("falha na criaçao de dados");
    }
    setItems(createItems([r1.total, r2.total, r3.total]));
    setRolado(true);
  }
  return (
    <div>
      <div className="flex space-x-5">
        <ul>
          <li>FOR</li>
          <li>DES</li>
          <li>VON</li>
        </ul>
        <Reorder.Group axis="y" onReorder={setItems} values={items}>
          {items.map((item) => (
            <Reorder.Item key={item.id} value={item}>
              {item.value}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
      <div>
        <button
          className="cursor-pointer text-blue bg-brand box-border border border-black hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          disabled={rolado}
          onClick={() => rolar()}
          type="button"
        >
          Rolar
        </button>
      </div>
    </div>
  );
}

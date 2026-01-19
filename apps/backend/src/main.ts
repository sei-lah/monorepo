/** biome-ignore-all lint/suspicious/noConsole: needed, yo */

import { divide } from "#math/advanced";
import { add } from "#math/basic";

const sum = add(1, 2);
console.log(`1 + 2 = ${sum}`);
const div = divide(4, 2);
if (div.isError) {
  console.error(div.error.message);
} else {
  console.log(`4 / 2 = ${div.value}`);
}

import { createProxy, processResult } from "./proxy";
import { produce } from "../index";
class Immer {
  produce(base, recipe) {
    if (typeof base === "function" && typeof recipe !== "function") {
      return function (r = recipe, ...arg) {
        return produce(r, (draft) => {
          base.call(this, draft, ...arg);
        });
      };
    }
    const proxy = createProxy(base);
    recipe(proxy);
    return processResult(proxy);
  }
}

export { Immer };

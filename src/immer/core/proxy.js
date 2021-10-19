import { isObject, isArray, shallowCopy, DRAFT_STATE } from "./utils";
function createProxy(base, parent) {
  let state = {
    base,
    copy: shallowCopy(base),
    modified: false,
    immer: {},
  };
  return new Proxy(base, {
    get(target, key) {
      if (key === DRAFT_STATE) {
        return state;
      }
      let value = target[key];
      if (isObject(value) || isArray(value)) {
        if (!(key in state.immer)) {
          state.immer[key] = createProxy(value, () => {
            state.modified = true;
            parent && parent();
          });
        }
        return state.immer[key];
      }
      return state.modified ? state.copy[key] : state.base[key];
    },
    set(target, key, value) {
      state.copy[key] = value;
      state.modified = true;
      parent && parent();
      return true;
    },
  });
}

function processResult(value) {
  let state = value[DRAFT_STATE];
  Object.keys(state.immer).forEach((item) => {
    state.copy[item] = processResult(state.immer[item]);
  });

  return state.modified ? state.copy : state.base;
}

export { createProxy, processResult };

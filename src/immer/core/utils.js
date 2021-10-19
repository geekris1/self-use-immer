function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function isArray(value) {
  return Array.isArray(value);
}

function shallowCopy(value) {
  if (isObject(value)) {
    return { ...value };
  }
  if (isArray(value)) {
    return [...value];
  }
  return value;
}

const DRAFT_STATE = Symbol.for("draft-immer");

export { isObject, isArray, shallowCopy, DRAFT_STATE };

import { useState, useCallback } from "react";
import produce from "../immer";
function useImmer(initValue) {
  let [val, updateValue] = useState(() =>
    typeof initValue === "function" ? initValue() : initValue
  );
  return [
    val,
    useCallback((draft) => {
      updateValue(produce(draft));
    }, []),
  ];
}

export { useImmer };

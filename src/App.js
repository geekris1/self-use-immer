import "./App.css";
import { useImmer } from "./use-immer";
function App() {
  let [state, setState] = useImmer([1, 2, 3]);
  console.log(state, "1111");
  return (
    <div className="App">
      <button
        onClick={() => {
          setState((draft) => {
            draft.push(1);
          });
        }}
      >
        加1
      </button>
      {state.map((item) => {
        return <div>{item}</div>;
      })}
    </div>
  );
}

export default App;

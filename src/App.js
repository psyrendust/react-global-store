import "./styles.css";
import * as React from "react";
import { GlobalStore, useDataStore } from "./StoreProvider3";
console.clear();
export default function App() {
  return (
    <div className="App">
      <GlobalStore>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <div className="row">
          <div className="col">
            <WriteA />
          </div>
          <div className="col">
            <ReadA />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <WriteB />
          </div>
          <div className="col">
            <ReadB />
          </div>
        </div>
        <ShowValuesA />
      </GlobalStore>
    </div>
  );
}

const storeA = "store-a";
const storeB = "store-b";
function ShowValuesA() {
  const [, , dataStore] = useDataStore(storeA);
  return (
    <div className="showValues">
      <h4>Show Values - {storeA}</h4>
      <pre>{JSON.stringify(dataStore.toString(), null, 4)}</pre>
    </div>
  );
}
function WriteA() {
  const id = "write-a";
  const [storeValue, setStoreValue] = useDataStore(storeA);
  const [value, setValue] = React.useState(storeValue ?? 1);
  const handleClick = React.useCallback(() => {
    setValue((prev) => {
      const next = prev + 1;
      setStoreValue({ value: next });
      return next;
    });
  }, [setStoreValue]);

  React.useEffect(() => {
    console.log(`[3] [test][${id}] value updated`, value);
  }, [value]);

  console.log(`[1] [test][${id}] render`, value);
  return (
    <div>
      <h3>
        {id} value: {value}
      </h3>
      <div>
        <button onClick={handleClick}>update</button>
      </div>
    </div>
  );
}
function ReadA() {
  const id = "read-a";
  const [value] = useDataStore(storeA);

  React.useEffect(() => {
    console.log(`[4] [test][${id}] value updated`, value);
  }, [value]);

  console.log(`[2] [test][${id}] render`, value);
  return (
    <div>
      <h3>
        {id} value: {value != null && JSON.stringify(value, null, 2)}
      </h3>
    </div>
  );
}

function WriteB() {
  const id = "write-b";
  const [, setStoreValue] = useDataStore(storeB);
  const [value, setValue] = React.useState(1);
  const handleClick = React.useCallback(() => {
    setValue((prev) => {
      const next = prev + 1;
      setStoreValue({ value: next });
      return next;
    });
  }, [setStoreValue]);

  React.useEffect(() => {
    console.log(`---- [test][${id}] value updated`, value);
  }, [value]);

  console.log(`---- [test][${id}] render`, value);
  return (
    <div>
      <h3>
        {id} value: {value}
      </h3>
      <div>
        <button onClick={handleClick}>update</button>
      </div>
    </div>
  );
}
function ReadB() {
  const id = "read-b";
  const [value] = useDataStore(storeB);

  React.useEffect(() => {
    console.log(`---- [test][${id}] value updated`, value);
  }, [value]);

  console.log(`---- [test][${id}] render`, value);
  return (
    <div>
      <h3>
        {id} value: {value != null && JSON.stringify(value, null, 2)}
      </h3>
    </div>
  );
}

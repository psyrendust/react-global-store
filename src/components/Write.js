import * as React from "react";
import { useDataStore } from "../globalStore";

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

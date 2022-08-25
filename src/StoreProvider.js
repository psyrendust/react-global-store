import * as React from "react";

const globalStore = new Map();
const globalStorePrev = new Map();
let storeInstance = globalStore;

export const StoreContext = React.createContext({
  updateStore: (uuid, value) => {},
  _lastUpdated: ""
});

export function StoreProvider({ children, value }) {
  console.log("[test] ----------------- StoreProvider 1");
  const [_lastUpdated, setLastUpdated] = React.useState(performance.now());

  React.useEffect(() => {
    console.log("[test] ----------------- update store 1", {
      value,
      storeInstance
    });
    if (value != null && value instanceof Map) {
      storeInstance = value;
    } else {
      storeInstance = globalStore;
    }
  }, [value]);

  const updateStore = React.useCallback((uuid, nextValue) => {
    const currValue = storeInstance.get(uuid);
    console.log(`[test][updateStore][${uuid}] write --------- `, {
      currValue,
      nextValue
    });
    storeInstance.set(uuid, nextValue);
    globalStorePrev.set(uuid, currValue);
    setLastUpdated(performance.now());
  }, []);

  const contextValue = {
    updateStore,
    _lastUpdated
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export function useComponentStore(uuid) {
  React.useContext(StoreContext);
  const prevValue = globalStorePrev.get(uuid);
  const currValue = storeInstance.get(uuid);
  return React.useMemo(() => {
    if (!Object.is(currValue, prevValue)) {
      // globalStorePrev.set(uuid, currValue);
      console.log(
        `[test][useComponentStore][${uuid}] read --------- return new value`,
        {
          value: currValue
        }
      );
      return { value: currValue };
    }
    console.log(
      `[test][useComponentStore][${uuid}] read --------- return previous value`,
      { value: prevValue }
    );
    return { value: prevValue };
  }, [currValue, prevValue, uuid]);
}

export function useStoreUpdate() {
  const { updateStore } = React.useContext(StoreContext);
  return updateStore;
}

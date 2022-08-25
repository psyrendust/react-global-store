import * as React from "react";
import { globalStore } from "./globalStore";
import { useForceUpdate } from "./useForceUpdate";

let storeInstance = globalStore;

export const StoreContext = React.createContext({
  updateStore: (uuid, value) => {}
});

export function StoreProvider({ children, value }) {
  console.log("[test] ----------------- StoreProvider 2");
  const forceUpdate = useForceUpdate();

  React.useEffect(() => {
    console.log("[test] ----------------- update store 2", {
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
    storeInstance.setComponentStoreValue(uuid, nextValue);
    console.log(
      "[test][updateStore] ----",
      JSON.stringify({ uuid, nextValue })
    );
    forceUpdate();
  }, []);

  const contextValue = React.useMemo(
    () => ({
      updateStore
    }),
    [updateStore]
  );
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export function useComponentStore(uuid) {
  React.useContext(StoreContext);
  const store = storeInstance.getComponentStore(uuid, true);
  console.log(`[test][useComponentStore][${uuid}] store`, store.value);
  return React.useMemo(() => {
    return store;
  }, [store.value]);
}

export function useStoreUpdate(uuid) {
  const { updateStore } = React.useContext(StoreContext);
  return updateStore;
}

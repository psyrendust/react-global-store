import * as React from "react";
import { getGlobalStore } from "./globalStore";
import { useForceUpdate } from "./useForceUpdate";

export let globalStore = getGlobalStore();

export function useDataStore(uuid) {
  const forceUpdate = useForceUpdate();
  const dataStore = globalStore.dataStores.get(uuid, true);
  console.log(
    `****** [test][useDataStore][${uuid}] dataStore`,
    dataStore.value
  );

  React.useLayoutEffect(() => {
    console.log(
      `****** [test][useDataStore][${uuid}] useLayoutEffect -- addListener`
    );
    // const callback = () => forceUpdate();
    dataStore.addListener("change", forceUpdate);
    return () => {
      console.log(
        `****** [test][useDataStore][${uuid}] useLayoutEffect -- removeListener`
      );
      dataStore.removeListener("change", forceUpdate);
    };
  }, [dataStore, forceUpdate, uuid]);

  const setValue = React.useCallback(
    (value) => {
      console.log(`****** [test][useDataStore][${uuid}] setValue`, { value });
      dataStore.value = value;
    },
    [dataStore]
  );

  return [dataStore.value, setValue, dataStore];
}

import * as React from "react";

export function useForceUpdate(uuid = "") {
  const [, setTick] = React.useState(0);

  const update = React.useCallback(() => {
    console.log(`[test][useForceUpdate][${uuid}] update`);
    setTick((tick) => tick + 1);
  }, []);

  return update;
}

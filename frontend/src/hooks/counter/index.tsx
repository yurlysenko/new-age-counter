import { useCallback, useEffect, useState } from "react";
import { backendApi } from "../../libs/axios.ts";
import { ICounterItem, ICounterResponse, IUseCounterHook } from "./types";
import { getCurrentCounter, getHistory } from "./utils";
import { getSeconds } from "date-fns";

export const useCounter = (
  accessToken: string | undefined,
  onError: (e: unknown) => void
): IUseCounterHook => {
  const [counter, setCounter] = useState<number>();
  const [history, setHistory] = useState<ICounterItem[]>();

  const getData = async () => {
    await getCurrentCounter(
      accessToken,
      (data) => setCounter(data.counter_value),
      onError
    );
    await getHistory(accessToken, (data) => setHistory(data), onError);
  };

  useEffect(() => {
    void getData();

    const interval = setInterval(async () => {
      const shouldRefetch = getSeconds(Date.now()) === 0;

      if (!shouldRefetch) {
        return;
      }

      await getData();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [accessToken]);

  const update = useCallback(
    async (action: "increment" | "decrement"): Promise<void> => {
      try {
        const res = await backendApi.patch(`/counter/${action}`, undefined, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data: ICounterResponse = res.data;

        if (res.status === 200) {
          setCounter(data.counter_value);
        }
      } catch (e) {
        onError(e);
      }
    },
    [accessToken]
  );

  return {
    counter,
    history,
    increment: () => update("increment"),
    decrement: () => update("decrement"),
  };
};

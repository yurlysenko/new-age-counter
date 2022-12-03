import { ICounterItem, ICounterResponse } from "../types";
import { backendApi } from "../../../libs/axios.ts";

export const getCurrentCounter = async (
  accessToken: string | undefined,
  onSuccess: (data: ICounterResponse) => void,
  onError: (e: unknown) => void
): Promise<void> => {
  try {
    const res = await backendApi.get("/counter/current", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: ICounterResponse = res.data;

    if (res.status === 200) {
      onSuccess(data);
    }
  } catch (e) {
    onError(e);
  }
};

export const getHistory = async (
  accessToken: string | undefined,
  onSuccess: (data: ICounterItem[]) => void,
  onError: (e: unknown) => void
): Promise<void> => {
  try {
    const res = await backendApi.get("/counter/history", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: ICounterItem[] = res.data;

    if (res.status === 200) {
      onSuccess(data);
    }
  } catch (e) {
    onError(e);
  }
};

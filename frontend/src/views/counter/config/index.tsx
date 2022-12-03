import { ColumnsType } from "antd/es/table/interface";
import { ICounterItem } from "../../../hooks/counter/types";
import { format } from "date-fns";

export const TABLE_COLUMNS: ColumnsType<ICounterItem> = [
  {
    key: "value",
    title: "Value",
    render: (data: ICounterItem) => data.value,
  },
  {
    key: "value",
    title: "Recorded Date",
    render: (data: ICounterItem) =>
      format(new Date(data.created_at), "hh:mm aaa MM/dd/yyyy"),
  },
];

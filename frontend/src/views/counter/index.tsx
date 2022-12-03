import { AuthContext } from "../../context/auth";
import { useContext, useState } from "react";
import { Button, message, Space, Spin, Table } from "antd";

import styles from "./styles.module.scss";
import { useCounter } from "../../hooks/counter";
import { isAxiosError } from "axios";
import { ICounterItem } from "../../hooks/counter/types";
import { TABLE_COLUMNS } from "./config";

export const CounterView = () => {
  const { payload } = useContext(AuthContext);

  const [error, setError] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { counter, increment, decrement, history } = useCounter(
    payload?.access_token,
    (e) => {
      if (!isAxiosError(e)) {
        setError(true);
        return;
      }

      if (e.request.status == 401) {
        messageApi.warning("You don't have permission to do this action.");
        return;
      }

      setError(true);
    }
  );

  return (
    <>
      {contextHolder}
      <Spin spinning={counter === undefined}>
        <section className={styles.wrapper}>
          <h2 className={styles.title}>Counter</h2>
          <center>
            {error ? (
              <p>There was a problem getting your request</p>
            ) : (
              <p>
                Current Counter: <b>{counter ?? "N/A"}</b>
              </p>
            )}
          </center>

          <center className={styles.actions}>
            <Space>
              <Button
                type="primary"
                htmlType="button"
                disabled={error}
                onClick={increment}
              >
                Increment
              </Button>
              <Button
                type="primary"
                htmlType="button"
                disabled={error}
                onClick={decrement}
              >
                Decrement
              </Button>
            </Space>
          </center>

          {history && (
            <Table<ICounterItem> columns={TABLE_COLUMNS} dataSource={history} />
          )}
        </section>
      </Spin>
    </>
  );
};

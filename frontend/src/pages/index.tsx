import styles from "./styles.module.scss";
import { AuthContext } from "../context/auth";
import { useContext } from "react";
import { LoginForm } from "../views/login-form";
import { CounterView } from "../views/counter";
import { Spin } from "antd";

export const IndexPage = () => {
  const { authenticated } = useContext(AuthContext);

  return (
    <main className={styles.layout}>
      {authenticated === null ? (
        <Spin spinning={true} />
      ) : authenticated ? (
        <CounterView />
      ) : (
        <LoginForm />
      )}
    </main>
  );
};

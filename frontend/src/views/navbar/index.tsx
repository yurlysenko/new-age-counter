import { FC, useContext } from "react";
import { AuthContext } from "../../context/auth";

import styles from "./styles.module.scss";
import { Button } from "antd";

export const Navbar: FC = () => {
  const { authenticated, logout, payload } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      {authenticated && (
        <div className={styles.profile}>
          <span>{payload?.username}</span>
          <Button type={"primary"} htmlType={"button"} onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

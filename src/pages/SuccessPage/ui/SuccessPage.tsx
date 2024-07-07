import { Placeholder, Button } from "@telegram-apps/telegram-ui";
import { useMiniApp } from "@tma.js/sdk-react";

import styles from "./SuccessPage.module.css";

export const SuccessPage = () => {
  const miniApp = useMiniApp();

  const onClose = () => {
    miniApp.close();
  }
  return (
    <div className={styles.successPage}>
      {/* TODO: вставить иконку */}
      <Placeholder
        header="Вы успешно записаны"
        description="Суббота, 10 июня в 20:00"
      />
      <Button size="l" className={styles.closeButton} onClick={onClose}>Закрыть</Button>
    </div>
  );
};

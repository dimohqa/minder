import { Navigation } from "@/shared/ui/Calendar"
import { Steps, Title } from "@telegram-apps/telegram-ui"
import { progressCount } from "../model/const/constants"

import styles from './SelectTimePage.module.css';

export const SelectTimePage = () => {

  return (
    <div className={styles.wrapper}>
      <Steps count={3} progress={progressCount} />
      <Title className={styles.title}>Время</Title>
      <Navigation />
    </div>
  )
}
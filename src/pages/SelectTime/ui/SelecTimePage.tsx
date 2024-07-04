import { Navigation } from "@/shared/ui/Calendar";
import { Steps, Title } from "@telegram-apps/telegram-ui";
import { progressCount } from "../model/const/constants";
import dayjs from "dayjs";
import { useState } from "react";

import styles from "./SelectTimePage.module.css";

export const SelectTimePage = () => {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [year, setYear] = useState<number>(dayjs().year());

  return (
    <div className={styles.wrapper}>
      <Steps count={3} progress={progressCount} />
      <Title className={styles.title}>Время</Title>
      <Navigation
        year={year}
        monthIndex={monthIndex}
        changeYear={setYear}
        changeMonthIndex={setMonthIndex}
      />
    </div>
  );
};

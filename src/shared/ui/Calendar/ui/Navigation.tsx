import { Button } from "@telegram-apps/telegram-ui";
import { FC, useState } from "react";
import dayjs from "dayjs";
import { Icon24ChevronLeft } from "@telegram-apps/telegram-ui/dist/icons/24/chevron_left";
import { Icon24ChevronRight } from "@telegram-apps/telegram-ui/dist/icons/24/chevron_right";
import { months, firstMonthIndex, lastMonthIndex } from "../model/const/dates";
import { Select } from "@telegram-apps/telegram-ui";

import styles from "./Navigaton.module.css";

type NavigationProps = {
  monthIndex?: number;
  year?: number;
};

export const Navigation: FC<NavigationProps> = (props) => {
  const [monthIndex, setMonthIndex] = useState<number>(
    props.monthIndex ?? dayjs().month()
  );
  const [year, setYear] = useState<number>(props.year ?? dayjs().year());

  const onClickNextMonth = () => {
    const isLastMonth = monthIndex === lastMonthIndex;

    if (isLastMonth) {
      setMonthIndex(firstMonthIndex);
      setYear(year + 1);

      return;
    }

    setMonthIndex(monthIndex + 1);
  };

  const onClickPrevMonth = () => {
    const isFirstMonth = monthIndex === firstMonthIndex;

    if (isFirstMonth) {
      setMonthIndex(lastMonthIndex);
      setYear(year - 1);

      return;
    }

    setMonthIndex(monthIndex - 1);
  };

  const disabledPrevMonthButton =
    year <= dayjs().year() - 1 && monthIndex === firstMonthIndex;
  const disabledNextMonthButton =
    year >= dayjs().year() + 1 && monthIndex === lastMonthIndex;

  return (
    <div className={styles.navigation}>
      <Button
        mode="gray"
        onClick={onClickPrevMonth}
        disabled={disabledPrevMonthButton}
      >
        <Icon24ChevronLeft className={styles.chevronIcon} />
      </Button>
      <div className={styles.datePickerButtons}>
        <Select className={styles.month}>
          {months.map((month, index) => (
            <option key={month} selected={monthIndex === index}>
              {month}
            </option>
          ))}
        </Select>
        <Select className={styles.year}>
          <option>{year - 1}</option>
          <option selected>{year}</option>
          <option>{year + 1}</option>
        </Select>
        {/* <Button mode='gray'>{months[monthIndex]}</Button> */}
        {/* <Button mode='gray'>{year}</Button> */}
      </div>
      <Button
        mode="gray"
        onClick={onClickNextMonth}
        disabled={disabledNextMonthButton}
      >
        <Icon24ChevronRight className={styles.chevronIcon} />
      </Button>
    </div>
  );
};

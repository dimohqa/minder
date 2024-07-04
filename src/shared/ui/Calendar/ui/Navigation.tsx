import { Button } from "@telegram-apps/telegram-ui";
import { ChangeEvent, FC, useState } from "react";
import dayjs from "dayjs";
import { Icon24ChevronLeft } from "@telegram-apps/telegram-ui/dist/icons/24/chevron_left";
import { Icon24ChevronRight } from "@telegram-apps/telegram-ui/dist/icons/24/chevron_right";
import { months, firstMonthIndex, lastMonthIndex } from "../model/const/dates";
import { Select } from "@telegram-apps/telegram-ui";
import { useThemeParams } from "@tma.js/sdk-react";

import styles from "./Navigaton.module.css";

type NavigationProps = {
  monthIndex?: number;
  year?: number;
};

export const Navigation: FC<NavigationProps> = (props) => {
  const theme = useThemeParams();

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

  const onChangeYear = (e: ChangeEvent<HTMLSelectElement>) => {
    setYear(+e.currentTarget.value);
  };
  const onChangeMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonthIndex(months.findIndex(value => value === e.currentTarget.value));
  };

  const disabledPrevMonthButton =
    year === dayjs().year() - 1 && monthIndex === firstMonthIndex;
  const disabledNextMonthButton =
    year=== dayjs().year() + 1 && monthIndex === lastMonthIndex;

  return (
    <div className={styles.navigation}>
      <Button
        style={{ backgroundColor: theme.bgColor }}
        onClick={onClickPrevMonth}
        disabled={disabledPrevMonthButton}
      >
        <Icon24ChevronLeft className={styles.chevronIcon} />
      </Button>
      <div className={styles.datePickerButtons}>
        <Select
          className={styles.month}
          value={months[monthIndex]}
          onChange={onChangeMonth}
        >
          {months.map((month) => (
            <option key={month}>{month}</option>
          ))}
        </Select>
        <Select
          className={styles.year}
          value={year}
          onChange={onChangeYear}
        >
          <option>{year - 1}</option>
          <option>{year}</option>
          <option>{year + 1}</option>
        </Select>
        {/* Если select'ы по итогу не подойдут, тк они громоздкие, но контекстного меню в ui готового нет*/}
        {/* <Button mode='gray'>{months[monthIndex]}</Button> */}
        {/* <Button mode='gray'>{year}</Button> */}
      </div>
      <Button
        style={{ backgroundColor: theme.bgColor }}
        onClick={onClickNextMonth}
        disabled={disabledNextMonthButton}
      >
        <Icon24ChevronRight className={styles.chevronIcon} />
      </Button>
    </div>
  );
};

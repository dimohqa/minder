import { Steps, Title } from "@telegram-apps/telegram-ui";
import { progressCount } from "../model/const/constants";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Button } from "@telegram-apps/telegram-ui";
import { ru } from "date-fns/locale";
import { addMonths, getYear } from "date-fns";

import styles from "./SelectTimePage.module.css";

// TODO: Add fetch times from API
const availableTimes = [
  "13:00",
  "14:00",
  "15:00",
  "19:00",
  "21:00",
  "22:00",
  "13:10",
  "14:10",
  "15:10",
  "19:10",
  "21:10",
  "22:10",
] as const;

export const SelectTimePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const onChangeSelectedDate = (selectedDate: Date | undefined) => {
    setSelectedDate(selectedDate);
    setSelectedTime(null);
  }

  const submitButtonIsVisible = selectedDate && selectedTime;

  return (
    <div className={styles.wrapper}>
      <Steps count={3} progress={progressCount} />
      <Title level="1" className={styles.title}>
        Дата
      </Title>
      <DayPicker
        mode="single"
        captionLayout="dropdown-buttons"
        fromMonth={new Date()}
        toMonth={addMonths(new Date(), 1)}
        locale={ru}
        fromYear={getYear(new Date())}
        toYear={getYear(new Date())}
        selected={selectedDate}
        disabled={{ before: new Date(), after: addMonths(new Date(), 1) }}
        onSelect={onChangeSelectedDate}
      />
      <div className={styles.availableTimes}>
        {availableTimes.map((availableTime) => (
          <Button
            key={availableTime}
            mode={selectedTime === availableTime ? "filled" : "gray"}
            className={styles.timeButton}
            onClick={() => setSelectedTime(availableTime)}
          >
            {availableTime}
          </Button>
        ))}
      </div>
      <div className={styles.submitButtonWrapper}>
        {submitButtonIsVisible && (<Button size="l" className={styles.submitButton}>Продолжить</Button>)}
      </div>
    </div>
  );
};

import { Steps, Title } from "@telegram-apps/telegram-ui";
import { availableTimes, progressCount } from "../model/const/constants";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Button } from "@telegram-apps/telegram-ui";
import { ru } from "date-fns/locale";
import { addMonths, getYear } from "date-fns";
import { useNavigate } from "react-router-dom";

import styles from "./SelectTimePage.module.css";

export const SelectTimePage = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const onChangeSelectedDate = (selectedDate: Date | undefined) => {
    setSelectedDate(selectedDate);
    setSelectedTime(null);
  };

  const onSubmitTime = () => {
    navigate("/contacts");
  };

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
        {submitButtonIsVisible && (
          <Button
            size="l"
            className={styles.submitButton}
            onClick={onSubmitTime}
          >
            Продолжить
          </Button>
        )}
      </div>
    </div>
  );
};

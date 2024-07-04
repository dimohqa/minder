import { useThemeParams } from "@tma.js/sdk-react";
import { days } from "../model/const/dates";
import { Text } from "@telegram-apps/telegram-ui";

import styles from "./Calendar.module.css";

export const Calendar = () => {
  const theme = useThemeParams();

  return (
    <div>
      <div className={styles.title}>
        {days.map((day) => (
          <Text
            key={day}
            weight="1"
            style={{ color: theme.textColor }}
          >
            {day}
          </Text>
        ))}
      </div>
    </div>
  );
};

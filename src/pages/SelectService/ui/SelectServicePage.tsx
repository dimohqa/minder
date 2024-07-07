import { Cell, List, Steps, Title, Text } from "@telegram-apps/telegram-ui";
import { progressCount } from "../model/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeParams } from "@tma.js/sdk-react";

import styles from "./SelectServicePage.module.css";

const services: Service[] = [
  {
    name: "Маникюр без покрытия",
    role: "Мастер",
    cost: 700,
    description: "1ч 15мин",
  },
  {
    name: "Маникюр с покрытием и снятием",
    role: "Стажер",
    cost: 1950,
    description: "2ч",
  },
  {
    name: "Наращивание ногтей гель/акригель",
    role: "Мастер",
    cost: 2900,
    description: "3ч",
  },
];

type Service = {
  name: string;
  role: string;
  cost: number;
  description: string;
}

export const SelectServicePage = () => {
  const theme = useThemeParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSelectedService] = useState<Service | null>(null);

  const navigate = useNavigate();

  const onSelectService = (service: Service) => {
    setSelectedService(service);

    navigate('/date');
  }

  return (
    <div>
      <Steps count={3} progress={progressCount} />
      <Title level="1" className={styles.title}>
        Услуги
      </Title>
      <List>
        {services.map((service) => (
          <Cell
            key={service.name}
            onClick={() => onSelectService(service)}
            // subhead={service.role}
            subtitle={<Text weight="3" style={{ color: theme.textColor }}>{service.cost} ₽</Text>}
            description={service.description}
          >
            {service.name}
          </Cell>
        ))}
      </List>
    </div>
  );
};

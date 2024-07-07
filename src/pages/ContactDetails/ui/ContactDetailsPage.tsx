import {
  Checkbox,
  Input,
  Cell,
  Select,
  Steps,
  Textarea,
  Title,
  Banner,
  Button,
  Section,
} from "@telegram-apps/telegram-ui";
import { formSchema, Notification, progressCount } from "../model/constants";
import { Formik } from "formik";
import cx from "classnames";
import { useLaunchParams } from "@tma.js/sdk-react";
import { useNavigate } from "react-router-dom";

import styles from "./ContactDetailsPage.module.css";

export const ContactDetailsPage = () => {
  const lp = useLaunchParams();
  const navigate = useNavigate();

  const isApplePlatform = ["macos", "ios"].includes(lp.platform);

  const onSubmit = () => {
    navigate('/success');
  }

  return (
    <div>
      <Steps count={3} progress={progressCount} />
      <Title level="1" className={styles.title}>
        Контактные данные
      </Title>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          comment: "",
          isCheckedPersInf: true,
          notification: Notification.THREE_HOURS,
        }}
        validationSchema={formSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          console.log("Submit!", values);
        }}
      >
        {({ values, handleChange, handleSubmit, errors, setFieldValue }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Section className={cx({ [styles.wrapper]: isApplePlatform })}>
              <Input
                id="name"
                placeholder={`Введите ваше имя${isApplePlatform ? '*' : ''}`}
                header="Имя*"
                status={errors?.name ? "error" : undefined}
                value={values.name}
                onChange={handleChange}
                className={styles.formInput}
              />
              <Input
                id="phone"
                type="tel"
                placeholder={`Введите контактный номер для связи${isApplePlatform ? '*' : ''}`}
                header="Телефон*"
                status={errors?.phone ? "error" : undefined}
                value={values.phone}
                onFocus={(event) => {
                  if (event.currentTarget.value.length === 0) {
                    setFieldValue('phone', '+7');
                  } 
                }}
                onChange={(event) => {
                  // ПОПРОБОВАТЬ https://www.npmjs.com/package/react-phone-number-input#formatphonenumberintlvalue-string-string
                    handleChange(event);
                }}
                className={styles.formInput}
              />
              <Textarea
                id="comment"
                placeholder="Укажите необходимую информацию для мастера"
                status={errors?.comment ? "error" : undefined}
                header="Комментарий"
                value={values.comment}
                onChange={handleChange}
                className={styles.formInput}
              />
              <Select
                id="notification"
                onChange={handleChange}
                value={values.notification}
                className={cx(styles.formInput, styles.notification)}
              >
                <option value={Notification.THREE_HOURS}>За 3 часа</option>
                <option value={Notification.ONE_DAY}>За день</option>
                {/* TODO: дизейблить, если запись ближе 3ех дней */}
                <option value={Notification.THREE_DAYS}>За 3 дня</option>
              </Select>
              <Cell
                multiline
                Component="label"
                before={
                  <Checkbox
                    id="isCheckedPersInf"
                    disabled
                    checked={values.isCheckedPersInf}
                  />
                }
              >
                Я предоставляю согласие на обработку персональных данных
              </Cell>
            </Section>
            <Banner
              header="Итого"
              subheader="1 950 ₽"
              className={cx(styles.costBanner, { [styles.wrapper]: isApplePlatform })}
            />
            <Button type="submit" size="l" className={cx(styles.submitButton, styles.wrapper)} onClick={onSubmit}>
              Записаться
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

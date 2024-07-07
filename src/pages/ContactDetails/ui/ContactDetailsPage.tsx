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
import { progressCount } from "../model/constants";
import { Formik } from "formik";
import cx from "classnames";
import * as yup from "yup";
import { useLaunchParams } from "@tma.js/sdk-react";

import styles from "./ContactDetailsPage.module.css";

const phoneRegExp = /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/;
// const onlyNumbersReg = new RegExp(/\d+$/);

const formSchema = yup.object({
  name: yup
    .string()
    .trim()
    .max(60)
    .required(),
  phone: yup
    .string()
    .trim()
    .matches(phoneRegExp)
    .required(),
  comment: yup.string().trim().max(210),
  isCheckedPersInf: yup.boolean().isTrue(),
  notification: yup.string().required(),
});

export const ContactDetailsPage = () => {
  const lp = useLaunchParams();
  const isApplePlatform = ["macos", "ios"].includes(lp.platform);

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
          notification: "3h",
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
                placeholder={`Введите контактный номер для связи${isApplePlatform ? '*' : ''}`}
                header="Телефон*"
                status={errors?.phone ? "error" : undefined}
                value={values.phone}
                onFocus={(event) => {
                  if (event.currentTarget.value.length === 0) {
                    setFieldValue('phone', '+7 ');
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
                <option value="3h">За 3 часа</option>
                <option value="1day">За день</option>
                {/* TODO: дизейблить, если запись ближе 3ех дней */}
                <option value="3day">За 3 дня</option>
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
            <Button type="submit" size="l" className={cx(styles.submitButton, styles.wrapper)}>
              Записаться
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

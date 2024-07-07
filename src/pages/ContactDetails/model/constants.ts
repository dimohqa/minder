import * as yup from "yup";

export const progressCount = 3;

export const phoneRegExp = /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/;
// export const onlyNumbersReg = new RegExp(/\d+$/);

export enum Notification {
  THREE_HOURS = '3h',
  ONE_DAY = '1d',
  THREE_DAYS = '3d',
}

export const formSchema = yup.object({
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
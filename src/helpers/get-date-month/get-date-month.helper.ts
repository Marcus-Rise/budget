import { ru } from "date-fns/locale";
import format from "date-fns/format";

const getDateMonthHelper = (date: Date): string => {
  return format(date, "LLLL", { locale: ru });
};

export { getDateMonthHelper };

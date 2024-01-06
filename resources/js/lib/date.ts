import dayjs from "dayjs";

export const formatDate = (date: Date) => {
  return dayjs(date).format("DD MMM YYYY");
}

export const formatDateTime = (date: Date) => {
  return dayjs(date).format("DD MMM YYYY hh:mm A");
}
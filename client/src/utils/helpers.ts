/* eslint-disable */

export const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export const getFormattedDate = (date: number | string) => {
  if (!date) return;

  const newDate = new Date(Number(date));

  let day: string | number = newDate.getDate();
  let month: string | number = newDate.getMonth() + 1;
  let year: string | number = newDate.getFullYear();

  day = day < 10 ? day = `0${day}` : day;
  month = month < 10 ? `0${month}` : month;


  return `${day}/${month}/${year}`;
}



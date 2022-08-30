import numeral from 'numeral';

export function formatAmount(num: string | number) {
  const n = String(num),
    p = n.indexOf(".");
  return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
    p < 0 || i < p ? `${m},` : m
  );
}

export function truncateStr(str: string, max: number) {
  return str.length > max ? str.substr(0, max - 1) + '…' : str;
}

export function shortNumber(number = 0) {
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(number);
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function formatDate(date: any) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [month, day, year].join('-');
}


export function fData(number: any) {
  return numeral(number).format('0.0 b');
}

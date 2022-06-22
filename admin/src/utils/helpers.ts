// import numeral from 'numeral';

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
// export function fCurrency(number: string | number) {
//     return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
//   }
  
//   export function fPercent(number:  number) {
//     return numeral(number / 100).format('0.0%');
//   }
  
//   export function fNumber(number:  string | number) {
//     return numeral(number).format();
//   }

//   export function fData(number:  string | number) {
//     return numeral(number).format('0.0 b');
//   }
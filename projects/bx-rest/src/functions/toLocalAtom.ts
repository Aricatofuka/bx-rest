export function toLocalAtom(date: Date): string {
  const pad = (n: number): string => String(n).padStart(2, '0');

  const tzOffset = -date.getTimezoneOffset(); // минуты
  const sign = tzOffset >= 0 ? '+' : '-';
  const hh = pad(Math.floor(Math.abs(tzOffset) / 60));
  const mm = pad(Math.abs(tzOffset) % 60);

  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
    `${sign}${hh}:${mm}`
  );
}


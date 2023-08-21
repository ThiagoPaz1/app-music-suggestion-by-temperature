export function dateFormat(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {timeZone: "UTC"}).format(
    new Date(date)
  )
}
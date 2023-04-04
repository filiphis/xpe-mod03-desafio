// const numberFormatter = new Intl.NumberFormat("pt-br", {
//   style: "decimal",
//   minimumFractionDigits: 2,
//   maximumFractionDigits: 2,
// });

export function helperFormatNumberToLocaleBR(value: number) {
  return Number(value).toLocaleString("pt-BR");
}

export function helperFormatMoneyToLocaleBR(value: number) {
  const prefix = "R$ ";
  return `${prefix}${Number(value).toLocaleString("pt-BR")}`;
}

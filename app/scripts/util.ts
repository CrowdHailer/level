export function round (precision: number) {
  return function (value: number) {
    return parseFloat(value.toPrecision(precision));
  };
}

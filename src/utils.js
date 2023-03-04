export function calcPercentagesInTheProgressBar(allDays, currentDays) {
  return Math.floor((100 / allDays) * currentDays);
}

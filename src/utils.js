export function setTimeCount(count, action) {
  if (action === "start" || action === "split") {
    return count + 1;
  } else if (action === "reset") {
    return 0;
  }
  return count;
}

export function formatTime(timeCount) {
  const ms = timeCount % 1000;
  const sec = pad(parseInt((timeCount / 100) % 60, 10));
  const min = pad(parseInt(timeCount / (60 * 100), 10));
  const hrs = pad(parseInt(timeCount / (3600 * 100), 10));

  return { hrs, min, sec, ms };
}

export function pad(val) {
  return val > 9 ? val : "0" + val;
}

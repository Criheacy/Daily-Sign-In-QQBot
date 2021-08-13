import { useEffect, useMemo, useState } from "react";

export const pad = (value: number, digits: number = 2) => {
  const sign = Math.sign(value) === -1 ? "-" : "";
  return sign + new Array(digits).concat([Math.abs(value)]).join("0").slice(-digits);
};

const difference = (target: Date, current: Date) => {
  return ms2Date(target.getTime() - current.getTime()).date;
}

export const getTimeOfToday = (hour: number, minute: number = 0, second: number = 0, milliseconds: number = 0) => {
  const current = new Date();
  return new Date(current.getFullYear(), current.getMonth(), current.getDate(),
    hour, minute, second, milliseconds);
}

const atSameDay = (date1: Date, date2: Date) => {
  return (date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate());
}

const ms2Date = (milliseconds: number) => {
  const bases = [24, 60, 60, 1000];
  return {
    date: new Date(0, 0, 0, ...bases.reverse().map((base) => {
      const _ = milliseconds % base;
      milliseconds /= base;
      return _;
    }).reverse()),
    overflow: milliseconds > 0
  }
}

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return currentTime;
}

export const useCountDown = (targetTime: Date, onFinish?: () => void) => {
  const [finished, setFinished] = useState(false);
  const currentTime = useCurrentTime();

  const countDownTime = useMemo(() => {
    const result = difference(targetTime, currentTime);
    if (targetTime.getTime() <= currentTime.getTime() && !finished) {
      setFinished(true);
      if (onFinish) {
        onFinish();
      }
    }
    return result;
  }, [currentTime, targetTime]);

  return { countDownTime, finished };
}

export const useInTimeRange = (rangeStart: Date, rangeEnd: Date) => {
  const currentTime = useCurrentTime();
  return rangeStart.getTime() <= currentTime.getTime()
    && currentTime.getTime() <= rangeEnd.getTime();
}

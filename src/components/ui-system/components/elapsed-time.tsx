import { useEffect, useState } from "react";
import { toZonedTime } from "date-fns-tz";

interface ElapsedTimeProps {
  createdAt: string;
}

const ElapsedTime = ({ createdAt }: ElapsedTimeProps) => {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const updateElapsed = () => {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const now = toZonedTime(new Date(), userTimeZone);
      const created = toZonedTime(new Date(createdAt), userTimeZone);
      let diffMs = now.getTime() - created.getTime();
      if (diffMs < 0) diffMs = 0;
      const minutes = Math.floor(diffMs / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      let result = "";
      if (hours > 0) result += `${hours} hr `;
      if (hours === 0 && remainingMinutes === 0) {
        result = "just now";
      } else {
        result += `${remainingMinutes} min ago`;
      }

      setElapsed(result);
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 60000);
    return () => clearInterval(interval);
  }, [createdAt]);

  return <span className="font-semibold">{elapsed}</span>;
};

export default ElapsedTime;

import { useState, useEffect } from "react";

const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState({ date: "", time: "" });

  useEffect(() => {
    const formatDate = (date: Date) => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const dayName = days[date.getDay()];
      const day = String(date.getDate()).padStart(2, "0");
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();

      return `${dayName}  ${day} ${monthName} ${year}`;
    };

    const formatTime = (date: Date) => {
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert hours to 12-hour format
      return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
    };

    const updateDateTime = () => {
      const now = new Date();
      setDateTime({
        date: formatDate(now),
        time: formatTime(now),
      });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-2  text-end">
      <p className="text-xs md:text-sm lg:text-[16.5px] 2xl:text-lg text-white font-bold">
        {dateTime.date}
      </p>
      <p className="text-xs md:text-sm lg:text-[16.5px] 2xl:text-lg text-white font-bold">
        {dateTime.time}
      </p>
    </div>
  );
};

export default DateTimeDisplay;

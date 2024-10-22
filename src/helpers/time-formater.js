// import moment from "moment";

export function TimeStampToDateFormater(date) {
  if (date == null) {
    return "";
  }
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

// epoch time to mm dd, year convertion
export function TimeStampToMonthDateYear(date) {
  if (date == null) {
    return "";
  }
  let d = new Date(date),
    formattedDate = d.toLocaleString("default", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  return formattedDate;
}

// epoch time to mm dd, year convertion
export function TimeStampToMonthDateYearTime(date) {
  if (date == null) {
    return [];
  }
  let d = new Date(date),
    formattedDate = d.toLocaleString("default", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    formattedTime = d.toLocaleString("default", {
      minute: "2-digit",
      hour: "2-digit",
      hour12: true,
    });

  return [formattedDate + " " + formattedTime];
}

// epoch time to dd mm convertion
export function TimeStampToDateMonth(date) {
  if (date == null) {
    return [];
  }
  let d = new Date(date),
    month = d.toLocaleString("default", { month: "short" }),
    day = d.getDate();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [day + " " + month];
}

// epoch time to mm dd, year convertion
// export function TimeStampToMonthDateYearForInput(date) {
//   if (date == null) {
//     return "";
//   }
//   return moment.unix(date / 1000).format("YYYY-MM-DD");
// }

// mm dd, year to epoch time convertion
export function DateToTimestapmFormater(data) {
  return Date.parse(data) / 1000;
}

// present time in miliseconds
export function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000);
}

// Age Calculator
export const ageCalculator = (value) => {
  const currentDate = new Date();
  const dateOfBirth = new Date(value);
  let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
  const monthDifference = currentDate.getMonth() - dateOfBirth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < dateOfBirth.getDate())
  ) {
    age--;
  }
  return age;
};

export function convertUTCToLocal(timestamp) {
  const utcDate = new Date(timestamp);
  const today = new Date();

  today.setHours(15, 50, 0, 0);
  const localDate = new Date(
    today.toLocaleDateString() + " " + utcDate.toLocaleTimeString()
  );
  const localTime = localDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return localTime;
}

//Get Months Between Dates
export const getMonthsBetweenDates = (startDate, endDate, isStillWorking) => {
  // Calculate the difference in milliseconds between the two dates
  let timeDiff;
  if (isStillWorking == "Yes" || isStillWorking == null) {
    timeDiff = Date.now() - startDate;
  } else {
    timeDiff = endDate - startDate;
  }

  // Convert milliseconds to months
  const millisecondsInMonth = 1000 * 60 * 60 * 24 * 30.44;
  const monthsDiff = timeDiff / millisecondsInMonth;

  return Math.round(monthsDiff);
};

export const getCurrentDateMonthYear = () => {
  let dateString = new Date();
  let date = new Date(dateString);

  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-indexed
  let year = date.getFullYear();

  let formattedDate = day + "/" + month + "/" + year;
  return formattedDate;
};

export const getCurrentTime = () => {
  let date = new Date();

  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");

  let formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
};
export const getMonthInShort = () => {
  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "short" });
  return month;
};
export const currentDateForDisable = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  return currentDate;
};

//
export const timeAgo = (timestamp) => {
  if (!timestamp) {
    return `0m ago`;
  }
  const now = Date.now();
  const diff = now - timestamp;

  const second = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (second < 60) {
    return `${second}s ago`;
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return TimeStampToDateMonth(diff);
  }
};

/* eslint-disable */

import React from "react";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import TAG_COLORS from "./colorsTag";
import { APPOINTMENT_STATUS_LOOKUP, ORDER_STATUS_LOOKUP } from "./lookup";
// import { PAGES_INFO } from "./path";

export const handleMultipleCheck = (event, values) => {
  let checked = values;

  if (event.target.checked) {
    checked = [...checked, event.target.value];
  } else {
    checked.splice(checked.indexOf(event.target.value), 1);
  }
  return checked;
};

export const checkPastDate = (date) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return date < today;
};

export const getColorsTagClass = (tag) => {
  const tagColor = TAG_COLORS.find(
    (item) => item.name.toLowerCase() === tag.toLowerCase()
  );
  return tagColor?.colorClass || "most-least-assets";
};

export function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

// eslint-disable-next-line arrow-body-style
export const getCountryTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const convertBase64 = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });

// const comparePath = (pathUrl, locationUrl) => {
//   // debugger; // eslint-disable-line no-debugger
//   const path = pathUrl?.split("/");
//   const location = locationUrl.split("/");
//   if (path.length !== location.length) return false;
//   let isSamePath = true;
//   // eslint-disable-next-line no-plusplus
//   for (let i = 1; i < location.length; i++) {
//     if (!path[i].startsWith(":")) {
//       if (location[i].toLowerCase() !== path[i].toLowerCase()) {
//         isSamePath = false;
//         break;
//       }
//     }
//   }
//   return isSamePath;
// };

// export const getPageInfo = (path) => {
//   const getInfo = PAGES_INFO.find((item) =>
//     comparePath(item?.pathName?.toLowerCase(), path?.toLowerCase())
//   );
//   return getInfo;
// };

export const findMonthForXAxisToolTip = (data) => {
  const dataIndex = data?.dataPointIndex;
  const dateMiliSeconds = data?.w?.globals?.seriesX[0]?.[dataIndex];
  const month = new Date(dateMiliSeconds).toLocaleString("default", {
    month: "long",
  });
  return month;
};
export const updateLocalStorage = (updated) => {
  let current = JSON.parse(localStorage.getItem("nafuu_user"));
  current = { ...current, ...updated };
  localStorage.setItem("nafuu_user", JSON.stringify(current));
};

export const convertTimeIntoUTC = (time, withDate = null) => {
  const date = withDate || format(new Date(), "yyyy-MM-dd");
  const utcTime = new Date(`${date} ${time}`).toISOString();
  return utcTime;
};

export const datePickerMinDate = () => format(new Date(), "yyyy-MM-dd");

export const mapValuedKeys = (reqObject, values) => {
  Object.entries(values).map(([key, value]) => {
    if (value) {
      reqObject[key] = value;
    }
  });
  return reqObject;
};

export const convert24HourTo12Hour = (time) => {
  const date = new Date(`2023-01-01 ${time}`);
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
};
export const getBadgeColorAccordingToAppointmentStatus = (status) => {
  if (status === APPOINTMENT_STATUS_LOOKUP.BOOKED) return "primary";
  if (status === APPOINTMENT_STATUS_LOOKUP.CANCELED) return "danger";
  if (status === APPOINTMENT_STATUS_LOOKUP.COMPLETED) return "success";
  if (status === APPOINTMENT_STATUS_LOOKUP.MISSED) return "warning";
  return "secondary";
};

export const getBadgeColorAccordingToOrderStatus = (status) => {
  if (status === ORDER_STATUS_LOOKUP.PENDING) return "primary";
  if (status === ORDER_STATUS_LOOKUP.COMPLETE) return "success";
  if (status === ORDER_STATUS_LOOKUP.ONGOING) return "warning";
  return "secondary";
};

export const getYearListForCard = () => {
  const years = [];
  let currentYear = new Date().getFullYear();
  const endYear = currentYear + 27;
  while (currentYear <= endYear) {
    years.push(currentYear++);
  }
  return years;
};

export const getMonthListForCard = () => {
  return [
    {
      value: "1",
      label: "1 - Jan",
    },
    {
      value: "2",
      label: "2 - Feb",
    },
    {
      value: "3",
      label: "3 - Mar",
    },
    {
      value: "4",
      label: "4 - Apr",
    },
    {
      value: "5",
      label: "5 - May",
    },
    {
      value: "6",
      label: "6 - Jun",
    },
    {
      value: "7",
      label: "7 - Jul",
    },
    {
      value: "8",
      label: "8 - Aug",
    },
    {
      value: "9",
      label: "9 - Sep",
    },
    {
      value: "10",
      label: "10 - Oct",
    },
    {
      value: "11",
      label: "11 - Nov",
    },
    {
      value: "12",
      label: "12 - Dec",
    },
  ];
};

export const shortMonthList = () => {
  return [
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
};
export const getCurrentDateWithZeroTime = () => {
  return format(new Date(), "yyyy-MM-dd") + "T00:00:00.000Z";
};

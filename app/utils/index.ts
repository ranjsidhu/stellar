const pluralise = (count: number, noun: string) =>
  `${count} ${noun}${count !== 1 ? "s" : ""}`;

// Convert the date to hours, days, or months
const calculateHours = (created_at: Date) => {
  const diffInHours =
    Math.abs(new Date().getTime() - new Date(created_at).getTime()) /
    (1000 * 60 * 60);
  const roundedHours = Math.round(diffInHours);
  const roundedDays = Math.round(diffInHours / 24);
  const roundedMinutes = Math.round(diffInHours * 60);
  const roundedMonths = Math.round(roundedDays / 30);

  if (roundedHours < 1) {
    return `Posted about ${pluralise(roundedMinutes, "minute")} ago`;
  } else if (roundedHours < 24) {
    return `Posted about ${pluralise(roundedHours, "hour")} ago`;
  } else if (roundedDays < 30) {
    return `Posted ${pluralise(roundedDays, "day")} ago`;
  } else {
    return `Posted ${pluralise(roundedMonths, "month")} ago`;
  }
};

const downloadFile = async (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

// eslint-disable-next-line import/no-unused-modules
export { calculateHours, pluralise, downloadFile };

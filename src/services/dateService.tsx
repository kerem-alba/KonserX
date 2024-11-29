export const formatDateParts = (dateString: string) => {
  const date = new Date(dateString);
  const dayName = date.toLocaleDateString("tr-TR", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleDateString("tr-TR", { month: "long" });
  const year = date.getFullYear();

  return {
    dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
    day,
    month,
    year,
  };
};

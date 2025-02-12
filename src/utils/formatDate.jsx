export const formatDate = (date, formatType = "default") => {
  const dateObj = new Date(date);

  // 기본 옵션: long format
  const options = { year: "numeric", month: "long", day: "numeric" };

  if (formatType === "default") {
    // 기본 날짜 포맷 (long format)
    return dateObj.toLocaleDateString(undefined, options);
  } else if (formatType === "short") {
    // '2025.02.11' 형식으로 변환
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 1부터 시작하므로 +1
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  return dateObj.toLocaleDateString(undefined, options); // 기본 반환 (기타 포맷에 대한 기본값)
};

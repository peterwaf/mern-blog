export const displayDate = (timestamp) => {
    const date = new Date(timestamp);
    const localStr = date.toLocaleString("en-US", { timeZone: "GMT" });
    return localStr;
  }
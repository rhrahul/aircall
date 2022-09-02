export function getDirection(data) {
  return data.direction === "inbound"
    ? data.call_type === "missed" || data.call_type === "voicemail"
      ? "missed"
      : "incoming"
    : "outgoing";
}

export function getLeftIconBackColor(direction) {
  return direction === "missed"
    ? "bg-red-100 dark:bg-red-900"
    : direction === "incoming"
    ? "bg-green-100 dark:bg-green-900"
    : "bg-purple-100 dark:bg-purple-900";
}

export function getLeftIconColor(direction) {
  return direction === "missed"
    ? "text-red-600 dark:text-red-400"
    : direction === "incoming"
    ? "text-green-600 dark:text-green-400"
    : "text-purple-600 dark:text-purple-400";
}

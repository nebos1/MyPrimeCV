export function FormatDate(value, format) {
    if (!value) {
        return "";
    }

    const [year, month, day] = value.split("-");

    if (!year || !month || !day) {
        return value;
    }

    if (format === "mm/dd/yyyy") {
        return `${month}/${day}/${year}`;
    }

    if (format === "yyyy/mm/dd") {
        return `${year}/${month}/${day}`;
    }

    if (format === "yyyy-mm-dd") {
        return value;
    }

    if (format === "month yyyy") {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return `${months[Number(month) - 1]} ${year}`;
    }

    return `${day}/${month}/${year}`;
}

export function IsIsoDateValue(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

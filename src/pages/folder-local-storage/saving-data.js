export function SaveData(key, value) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
}

export function LoadData(key, fallbackValue, throwOnError = false) {
    try {
        const data = localStorage.getItem(key);
        if (data === null) return fallbackValue;
        return JSON.parse(data);
    } catch (error) {
        if (throwOnError) throw error;
        return fallbackValue;
    }
}

export function GetStorageErrorMessage(error) {
    if (error.name === "QuotaExceededError") {
        return "Not saved: browser storage is full. Free space and try again.";
    }
    if (error.name === "SecurityError") {
        return "Not saved: browser storage is blocked. Allow storage and try again.";
    }
    return "Not saved: browser data could not be read or written.";
}

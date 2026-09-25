import "./DateField.css";
import { ChevronsUpDownLucideIcon } from "../../../folder-lucide-icons/lucide-icons";
import { FormatDate, IsIsoDateValue } from "../motivation-letter-date";
import DateFormatSelect from "./DateFormatSelect";

function DateField({ inputId, label, value, dateFormat, onChange, onDateFormatChange }) {
    let dateValue = "";
    if (IsIsoDateValue(value)) {
        dateValue = value;
    }

    function OpenCalendar(event) {
        const input = event.currentTarget;
        if (input.showPicker) {
            input.showPicker();
        }
    }

    function HandleKeyDown(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            OpenCalendar(event);
        }
    }

    return (
        <div className="letter-date-row">
            <div className="letter-date-field">
                <label htmlFor={inputId}>{label}</label>
                <div className="letter-date-box">
                    <span aria-hidden="true">{FormatDate(value, dateFormat)}</span>
                    <ChevronsUpDownLucideIcon className="letter-date-arrow" aria-hidden="true" />
                    <input
                        id={inputId}
                        className="native-date-input"
                        type="date"
                        value={dateValue}
                        onClick={OpenCalendar}
                        onKeyDown={HandleKeyDown}
                        onChange={(event) => onChange(event.target.value)}
                    />
                </div>
            </div>
            <DateFormatSelect value={dateFormat} onChange={onDateFormatChange} />
        </div>
    );
}

export default DateField;

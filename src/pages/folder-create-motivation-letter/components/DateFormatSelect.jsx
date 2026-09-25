import "./DateFormatSelect.css";
function DateFormatSelect({ value, onChange }) {
    return (
        <label className="date-format-select">
            <span>Date format</span>
            <select value={value} onChange={(event) => onChange(event.target.value)}>
                <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                <option value="yyyy-mm-dd">yyyy-mm-dd</option>
                <option value="month yyyy">Month yyyy</option>
            </select>
        </label>
    );
}

export default DateFormatSelect;

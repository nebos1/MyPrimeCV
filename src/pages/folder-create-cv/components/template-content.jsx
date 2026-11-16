import { FormatCvDate, NormalizeCvData, SampleCvData } from "../create-cv-data";
import "./cv-content.css";
import "./template-content.css";
import "../../../components/folder-document-preview/document-fonts.css";

export function HasText(value) {
    if (typeof value !== "string") {
        return false;
    }
    return value.trim().length > 0;
}

export const NextTemplateSampleData = JSON.parse(JSON.stringify(SampleCvData));
NextTemplateSampleData.studioImpact = {
    label: "Selected impact",
    value: "28%",
    description: "increase in onboarding completion.",
};

export function GetTemplateContent(data) {
    const view = NormalizeCvData(data);
    view.hasPhoto = false;
    const photoPrefix = view.basics.photo.slice(0, view.basics.photo.indexOf(",") + 1).toLowerCase();
    const imageTypes = ["png", "jpg", "jpeg", "gif", "webp", "avif", "bmp", "svg+xml"];
    for (let index = 0; index < imageTypes.length; index++) {
        if (photoPrefix === "data:image/" + imageTypes[index] + ";base64,") {
            view.hasPhoto = true;
        }
    }
    const firstName = view.basics.firstName.trim();
    const lastName = view.basics.lastName.trim();
    view.name = firstName;
    if (lastName !== "") {
        if (view.name !== "") {
            view.name = view.name + " ";
        }
        view.name = view.name + lastName;
    }

    view.initials = "";
    if (firstName !== "") {
        for (const letter of firstName) {
            view.initials = letter;
            break;
        }
    }
    if (lastName !== "") {
        for (const letter of lastName) {
            view.initials = view.initials + letter;
            break;
        }
    }

    let location = view.basics.city.trim();
    const country = view.basics.country.trim();
    if (country !== "") {
        if (location !== "") {
            location = location + ", ";
        }
        location = location + country;
    }

    view.contact = [];
    if (HasText(location)) {
        view.contact.push(location);
    }
    if (HasText(view.basics.email)) {
        view.contact.push(view.basics.email);
    }
    if (HasText(view.basics.phone)) {
        view.contact.push(view.basics.phone);
    }
    const birthDate = FormatCvDate(view.basics.birthDate, view.basics.birthDateFormat);
    if (HasText(birthDate)) {
        view.contact.push(birthDate);
    }
    if (HasText(view.basics.gender)) {
        view.contact.push(view.basics.gender);
    }

    const employment = [];
    for (let index = 0; index < view.employment.length; index++) {
        const item = view.employment[index];
        if (
            HasText(item.role) ||
            HasText(item.company) ||
            HasText(item.location) ||
            HasText(item.additions) ||
            HasText(item.startDate) ||
            HasText(item.endDate) ||
            HasText(item.summary) ||
            HasText(item.description)
        ) {
            employment.push(item);
        }
    }
    view.employment = employment;

    const education = [];
    for (let index = 0; index < view.education.length; index++) {
        const item = view.education[index];
        if (
            HasText(item.degree) ||
            HasText(item.school) ||
            HasText(item.location) ||
            HasText(item.additions) ||
            HasText(item.startDate) ||
            HasText(item.endDate)
        ) {
            education.push(item);
        }
    }
    view.education = education;

    const skills = [];
    for (let index = 0; index < view.skills.length; index++) {
        const item = view.skills[index];
        if (HasText(item.label)) {
            skills.push(item);
        }
    }
    view.skills = skills;

    const languages = [];
    for (let index = 0; index < view.languages.length; index++) {
        const item = view.languages[index];
        if (HasText(item.name) || HasText(item.level)) {
            languages.push(item);
        }
    }
    view.languages = languages;

    const links = [];
    for (let index = 0; index < view.links.length; index++) {
        const item = view.links[index];
        if (HasText(item.label) || HasText(item.url)) {
            links.push(item);
        }
    }
    view.links = links;

    const projects = [];
    for (let index = 0; index < view.projects.length; index++) {
        const item = view.projects[index];
        if (HasText(item.name) || HasText(item.subtitle) || HasText(item.description)) {
            projects.push(item);
        }
    }
    view.projects = projects;

    const mainCustom = [];
    for (let index = 0; index < view.mainCustom.length; index++) {
        const item = view.mainCustom[index];
        if (HasText(item.name) || HasText(item.subtitle) || HasText(item.description)) {
            mainCustom.push(item);
        }
    }
    view.mainCustom = mainCustom;

    const sideCustom = [];
    for (let index = 0; index < view.sideCustom.length; index++) {
        const item = view.sideCustom[index];
        if (HasText(item.name) || HasText(item.subtitle) || HasText(item.description)) {
            sideCustom.push(item);
        }
    }
    view.sideCustom = sideCustom;
    return view;
}

export function Dates({ item }) {
    const start = FormatCvDate(item.startDate, item.startDateFormat);
    const end = FormatCvDate(item.endDate, item.endDateFormat);
    if (HasText(start) && HasText(end)) {
        return start + " — " + end;
    }
    if (HasText(start)) {
        return start;
    }
    return end;
}

export function Description({ item }) {
    let description = "";
    if (typeof item.description === "string") {
        description = item.description;
    }
    const lines = description.split("\n");
    const items = [];
    for (let index = 0; index < lines.length; index++) {
        const line = lines[index].replace("\r", "");
        if (HasText(line)) {
            let className = "cv-next-list-item";
            if (items.length > 0) {
                className = className + " cv-next-list-item-spaced";
            }
            items.push(
                <li className={className} key={index}>
                    {line}
                </li>,
            );
        }
    }
    if (items.length === 0) {
        return null;
    }
    if (item.descriptionListStyle === "none") {
        return <p className="cv-entry-description">{description.trim()}</p>;
    }
    if (item.descriptionListStyle === "decimal") {
        return <ol className="cv-entry-description cv-next-list">{items}</ol>;
    }
    return <ul className="cv-entry-description cv-next-list">{items}</ul>;
}

export function EntryHeading({ item }) {
    let title = item.name;
    let subtitle = item.subtitle;
    if (typeof item.degree === "string") {
        title = item.degree;
        subtitle = item.school;
    }
    if (typeof item.role === "string") {
        title = item.role;
        subtitle = item.company;
    }
    return (
        <div className="cv-entry-heading">
            {HasText(title) && <h3>{title}</h3>}
            {HasText(subtitle) && <strong>{subtitle}</strong>}
            {HasText(item.location) && <p>{item.location}</p>}
            {HasText(item.additions) && <p>{item.additions}</p>}
        </div>
    );
}

export function EntryCopy({ item }) {
    return (
        <div className="cv-entry-copy">
            {HasText(item.summary) && <p>{item.summary}</p>}
            <Description item={item} />
        </div>
    );
}

export function Entries({ items, className = "", headingClassName = "" }) {
    const entries = [];
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        let entryClass = "cv-next-entry " + className;
        if (index > 0) {
            entryClass = entryClass + " cv-next-entry-spaced";
            if (className !== "") {
                entryClass = entryClass + " " + className + "-spaced";
            }
        }
        entries.push(
            <article key={index} className={entryClass}>
                <div className={"cv-next-entry-top " + headingClassName}>
                    <EntryHeading item={item} />
                    {(HasText(item.startDate) || HasText(item.endDate)) && (
                        <small className="cv-next-entry-date">
                            <Dates item={item} />
                        </small>
                    )}
                </div>
                <EntryCopy item={item} />
            </article>,
        );
    }
    return entries;
}

export function Rating({ item }) {
    let rating = Number(item.rating);
    if (!rating) {
        rating = 0;
    }
    if (rating < 0) {
        rating = 0;
    }
    if (rating > 5) {
        rating = 5;
    }
    if (rating === 0) {
        return null;
    }
    if (item.ratingStyle !== "circle" && item.ratingStyle !== "square") {
        return null;
    }
    const marks = [];
    for (let level = 1; level <= 5; level++) {
        let className = "";
        if (level <= rating) {
            className = "cv-rating-filled";
        }
        marks.push(<i key={level} className={className}></i>);
    }
    return (
        <span className={"cv-rating cv-rating-" + item.ratingStyle} aria-label={rating + " out of 5"}>
            {marks}
        </span>
    );
}

export function Knowledge({ item }) {
    let label = item.name;
    if (typeof item.label === "string") {
        label = item.label;
    }
    return (
        <div className="cv-next-knowledge">
            <span className="cv-next-knowledge-label">{label}</span>
            {HasText(item.level) && <small>{item.level}</small>}
            <Rating item={item} />
        </div>
    );
}

export function Link({ item, sample = false }) {
    let label = item.label.trim();
    const url = item.url.trim();
    if (label === "") {
        label = url;
    }
    if (sample || url === "") {
        return <span>{label}</span>;
    }
    let href = url;
    const lowerUrl = url.toLowerCase();
    const allowedProtocol =
        lowerUrl.startsWith("http:") ||
        lowerUrl.startsWith("https:") ||
        lowerUrl.startsWith("mailto:") ||
        lowerUrl.startsWith("tel:");
    if (!allowedProtocol) {
        if (HasUrlScheme(url) && !HasUrlPort(url)) {
            return <span>{label}</span>;
        }
        href = "https://" + url;
    }
    return (
        <a href={href} target="_blank" rel="noreferrer">
            {label}
        </a>
    );
}

function HasUrlScheme(url) {
    const colon = url.indexOf(":");
    if (colon < 1) {
        return false;
    }
    const first = url[0].toLowerCase();
    if (first < "a" || first > "z") {
        return false;
    }
    for (let index = 1; index < colon; index++) {
        const character = url[index].toLowerCase();
        const letter = character >= "a" && character <= "z";
        const digit = character >= "0" && character <= "9";
        if (!letter && !digit && character !== "+" && character !== "." && character !== "-") {
            return false;
        }
    }
    return true;
}

function HasUrlPort(url) {
    const colon = url.indexOf(":");
    let port = url.slice(colon + 1);
    const slash = port.indexOf("/");
    if (slash >= 0) {
        port = port.slice(0, slash);
    }
    if (port === "") {
        return false;
    }
    for (let index = 0; index < port.length; index++) {
        if (port[index] < "0" || port[index] > "9") {
            return false;
        }
    }
    return true;
}

export function Photo({ view }) {
    if (view.hasPhoto) {
        return <img src={view.basics.photo} alt="Profile" />;
    }
    return <span className="cv-photo-initials">{view.initials}</span>;
}

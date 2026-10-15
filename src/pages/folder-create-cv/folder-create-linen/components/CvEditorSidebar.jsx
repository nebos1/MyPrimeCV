import "../../components/CvEditorSidebar.css";
import * as Icons from "../../../../folder-lucide-icons/lucide-icons";
import { useState } from "react";
function CvEditorSidebar({ cv, actions }) {
    const [toolsTitleOpen, SetToolsTitleOpen] = useState(false);
    const [expertiseTitleOpen, SetExpertiseTitleOpen] = useState(false);
    const [projectsTitleOpen, SetProjectsTitleOpen] = useState(false);
    const [mainCustomTitleOpen, SetMainCustomTitleOpen] = useState(false);
    const [sideCustomTitleOpen, SetSideCustomTitleOpen] = useState(false);
    return (
        <aside className="create-cv-editor-sidebar">
            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.UserRoundLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Personal details</h2>
                    </div>
                </header>
                <div className="create-cv-field-grid">
                    <label className="create-cv-field">
                        <span className="document-field-label-row">First name</span>
                        <input
                            type="text"
                            aria-label="First name"
                            value={cv.basics.firstName ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("firstName", event.target.value)}
                        />
                    </label>
                    <label className="create-cv-field">
                        <span className="document-field-label-row">Last name</span>
                        <input
                            type="text"
                            aria-label="Last name"
                            value={cv.basics.lastName ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("lastName", event.target.value)}
                        />
                    </label>
                    <label className="create-cv-field create-cv-field-wide">
                        <span className="document-field-label-row">Professional title</span>
                        <input
                            type="text"
                            aria-label="Professional title"
                            value={cv.basics.professionalTitle ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("professionalTitle", event.target.value)}
                        />
                    </label>
                    <label className="create-cv-field">
                        <span className="document-field-label-row">Email</span>
                        <input
                            type="email"
                            aria-label="Email"
                            value={cv.basics.email ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("email", event.target.value)}
                        />
                    </label>
                    <label className="create-cv-field">
                        <span className="document-field-label-row">Phone</span>
                        <input
                            type="text"
                            aria-label="Phone"
                            value={cv.basics.phone ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("phone", event.target.value)}
                        />
                    </label>
                    <label className="create-cv-field">
                        <span className="document-field-label-row">City</span>
                        <input
                            type="text"
                            aria-label="City"
                            value={cv.basics.city ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("city", event.target.value)}
                        />
                    </label>
                    <label className="create-cv-field">
                        <span className="document-field-label-row">Country</span>
                        <input
                            type="text"
                            aria-label="Country"
                            value={cv.basics.country ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("country", event.target.value)}
                        />
                    </label>
                    <label className="create-cv-field">
                        <span className="document-field-label-row">Date of birth</span>
                        <input
                            type="text"
                            aria-label="Date of birth"
                            value={cv.basics.birthDate ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("birthDate", event.target.value)}
                        />
                    </label>
                    <label className="create-cv-select-field">
                        <span>Gender</span>
                        <select
                            value={cv.basics.gender}
                            onChange={(event) => actions.UpdateBasicsField("gender", event.target.value)}
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>
                </div>
            </section>
            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.NotebookTextLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Profile</h2>
                    </div>
                </header>
                <label className="create-cv-field create-cv-field-wide">
                    <span className="document-field-label-row">Professional summary</span>
                    <textarea
                        aria-label="Professional summary"
                        value={cv.profile ?? ""}
                        onChange={(event) => actions.UpdateProfile(event.target.value)}
                    />
                </label>
            </section>
            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.WrenchLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Tools</h2>
                        <button
                            type="button"
                            className="create-cv-section-rename-btn"
                            aria-label="Rename tools in CV"
                            aria-expanded={toolsTitleOpen}
                            onClick={() => SetToolsTitleOpen(!toolsTitleOpen)}
                        >
                            <Icons.PencilLucideIcon />
                        </button>
                    </div>
                </header>
                {toolsTitleOpen && (
                    <label className="create-cv-section-title-editor">
                        <span>Visible title</span>
                        <input
                            aria-label="Tools title"
                            value={cv.sectionTitles.linenTools}
                            onChange={(event) => actions.UpdateSectionTitle("linenTools", event.target.value)}
                        />
                    </label>
                )}
                <label className="create-cv-field create-cv-field-wide">
                    <span className="document-field-label-row">Tools (one per line)</span>
                    <textarea
                        aria-label="Tools (one per line)"
                        value={cv.tools ?? ""}
                        onChange={(event) => actions.UpdateTools(event.target.value)}
                    />
                </label>
            </section>
            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.NotebookTextLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Footer</h2>
                    </div>
                </header>
                <label className="create-cv-field create-cv-field-wide">
                    <span className="document-field-label-row">Footer note</span>
                    <input
                        type="text"
                        aria-label="Footer note"
                        value={cv.footerNote ?? ""}
                        onChange={(event) => actions.UpdateFooterNote(event.target.value)}
                    />
                </label>
            </section>
            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.BriefcaseBusinessLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Employment history</h2>
                    </div>
                    <button
                        type="button"
                        className="create-cv-section-add-btn"
                        aria-label="Add employment history"
                        onClick={actions.AddEmployment}
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {cv.employment.map((employmentEntry, employmentEntryIndex) => (
                    <article
                        className={
                            employmentEntryIndex > 0
                                ? "create-cv-list-item create-cv-list-item-spaced"
                                : "create-cv-list-item"
                        }
                        key={employmentEntryIndex}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Role {employmentEntryIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={"Delete employment item " + (employmentEntryIndex + 1)}
                                disabled={cv.employment.length === 1}
                                onClick={() => actions.RemoveEmployment(employmentEntryIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Role title</span>
                                <input
                                    type="text"
                                    aria-label="Role title"
                                    value={employmentEntry.role ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(employmentEntryIndex, "role", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Company</span>
                                <input
                                    type="text"
                                    aria-label="Company"
                                    value={employmentEntry.company ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "company",
                                            event.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Location</span>
                                <input
                                    type="text"
                                    aria-label="Location"
                                    value={employmentEntry.location ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "location",
                                            event.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Additions</span>
                                <input
                                    type="text"
                                    aria-label="Additions"
                                    value={employmentEntry.additions ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "additions",
                                            event.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Date start</span>
                                <input
                                    type="text"
                                    aria-label="Date start"
                                    value={employmentEntry.startDate ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "startDate",
                                            event.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Date end</span>
                                <input
                                    type="text"
                                    aria-label="Date end"
                                    value={employmentEntry.endDate ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "endDate",
                                            event.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label className="create-cv-field create-cv-field-wide">
                                <span className="document-field-label-row">Summary</span>
                                <textarea
                                    aria-label="Summary"
                                    value={employmentEntry.summary ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "summary",
                                            event.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label className="create-cv-field create-cv-field-wide">
                                <span className="document-field-label-row">Description / bullet lines</span>
                                <textarea
                                    aria-label="Description / bullet lines"
                                    value={employmentEntry.description ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label className="create-cv-select-field">
                                <span>Start date display</span>
                                <select
                                    value={employmentEntry.startDateFormat}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "startDateFormat",
                                            event.target.value,
                                        )
                                    }
                                >
                                    <option value="full">Full date</option>
                                    <option value="year">Year only</option>
                                </select>
                            </label>
                            <label className="create-cv-select-field">
                                <span>End date display</span>
                                <select
                                    value={employmentEntry.endDateFormat}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "endDateFormat",
                                            event.target.value,
                                        )
                                    }
                                >
                                    <option value="full">Full date</option>
                                    <option value="year">Year only</option>
                                </select>
                            </label>
                            <label className="create-cv-select-field">
                                <span>Description display</span>
                                <select
                                    value={employmentEntry.descriptionListStyle}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "descriptionListStyle",
                                            event.target.value,
                                        )
                                    }
                                >
                                    <option value="none">Paragraphs</option>
                                    <option value="disc">Bullet points</option>
                                    <option value="decimal">Numbered list</option>
                                </select>
                            </label>
                        </div>
                    </article>
                ))}
            </section>
            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.GraduationCapLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Education</h2>
                    </div>
                    <button
                        type="button"
                        className="create-cv-section-add-btn"
                        aria-label="Add education"
                        onClick={actions.AddEducation}
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {cv.education.map((educationEntry, educationEntryIndex) => (
                    <article
                        className={
                            educationEntryIndex > 0
                                ? "create-cv-list-item create-cv-list-item-spaced"
                                : "create-cv-list-item"
                        }
                        key={educationEntryIndex}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Education {educationEntryIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={"Delete education item " + (educationEntryIndex + 1)}
                                disabled={cv.education.length === 1}
                                onClick={() => actions.RemoveEducation(educationEntryIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Degree</span>
                                <input
                                    type="text"
                                    aria-label="Degree"
                                    value={educationEntry.degree ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(educationEntryIndex, "degree", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">School</span>
                                <input
                                    type="text"
                                    aria-label="School"
                                    value={educationEntry.school ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(educationEntryIndex, "school", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Location</span>
                                <input
                                    type="text"
                                    aria-label="Location"
                                    value={educationEntry.location ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(
                                            educationEntryIndex,
                                            "location",
                                            event.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Additions</span>
                                <input
                                    type="text"
                                    aria-label="Additions"
                                    value={educationEntry.additions ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(
                                            educationEntryIndex,
                                            "additions",
                                            event.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Date start</span>
                                <input
                                    type="text"
                                    aria-label="Date start"
                                    value={educationEntry.startDate ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(
                                            educationEntryIndex,
                                            "startDate",
                                            event.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Date end</span>
                                <input
                                    type="text"
                                    aria-label="Date end"
                                    value={educationEntry.endDate ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(educationEntryIndex, "endDate", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-select-field">
                                <span>Start date display</span>
                                <select
                                    value={educationEntry.startDateFormat}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(
                                            educationEntryIndex,
                                            "startDateFormat",
                                            event.target.value,
                                        )
                                    }
                                >
                                    <option value="full">Full date</option>
                                    <option value="year">Year only</option>
                                </select>
                            </label>
                            <label className="create-cv-select-field">
                                <span>End date display</span>
                                <select
                                    value={educationEntry.endDateFormat}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(
                                            educationEntryIndex,
                                            "endDateFormat",
                                            event.target.value,
                                        )
                                    }
                                >
                                    <option value="full">Full date</option>
                                    <option value="year">Year only</option>
                                </select>
                            </label>
                        </div>
                    </article>
                ))}
            </section>
            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.WrenchLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Skills</h2>
                        <button
                            type="button"
                            className="create-cv-section-rename-btn"
                            aria-label="Rename expertise in CV"
                            aria-expanded={expertiseTitleOpen}
                            onClick={() => SetExpertiseTitleOpen(!expertiseTitleOpen)}
                        >
                            <Icons.PencilLucideIcon />
                        </button>
                    </div>
                    <button
                        type="button"
                        className="create-cv-section-add-btn"
                        aria-label="Add skills"
                        onClick={actions.AddSkill}
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {expertiseTitleOpen && (
                    <label className="create-cv-section-title-editor">
                        <span>Visible title</span>
                        <input
                            aria-label="Expertise title"
                            value={cv.sectionTitles.linenExpertise}
                            onChange={(event) => actions.UpdateSectionTitle("linenExpertise", event.target.value)}
                        />
                    </label>
                )}
                {cv.skills.map((skill, skillIndex) => (
                    <article
                        className={
                            skillIndex > 0 ? "create-cv-list-item create-cv-list-item-spaced" : "create-cv-list-item"
                        }
                        key={skillIndex}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Skill {skillIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={"Delete skills item " + (skillIndex + 1)}
                                disabled={cv.skills.length === 1}
                                onClick={() => actions.RemoveSkill(skillIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <label className="create-cv-field create-cv-field-wide">
                                <span className="document-field-label-row">Skill</span>
                                <input
                                    type="text"
                                    aria-label="Skill"
                                    value={skill.label ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateSkillField(skillIndex, "label", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-select-field">
                                <span>Knowledge display</span>
                                <select
                                    value={skill.ratingStyle}
                                    onChange={(event) =>
                                        actions.UpdateSkillField(skillIndex, "ratingStyle", event.target.value)
                                    }
                                >
                                    <option value="none">No rating</option>
                                    <option value="circle">Circles</option>
                                    <option value="square">Squares</option>
                                </select>
                            </label>
                            <label className="create-cv-select-field">
                                <span>Level 0-5</span>
                                <select
                                    value={skill.rating}
                                    onChange={(event) =>
                                        actions.UpdateSkillField(skillIndex, "rating", Number(event.target.value))
                                    }
                                >
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </label>
                        </div>
                    </article>
                ))}
            </section>
            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.LanguagesLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Languages</h2>
                    </div>
                    <button
                        type="button"
                        className="create-cv-section-add-btn"
                        aria-label="Add languages"
                        onClick={actions.AddLanguage}
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {cv.languages.map((language, languageIndex) => (
                    <article
                        className={
                            languageIndex > 0 ? "create-cv-list-item create-cv-list-item-spaced" : "create-cv-list-item"
                        }
                        key={languageIndex}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Language {languageIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={"Delete languages item " + (languageIndex + 1)}
                                disabled={cv.languages.length === 1}
                                onClick={() => actions.RemoveLanguage(languageIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Language</span>
                                <input
                                    type="text"
                                    aria-label="Language"
                                    value={language.name ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateLanguageField(languageIndex, "name", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-select-field">
                                <span>Level</span>
                                <select
                                    value={language.level}
                                    onChange={(event) =>
                                        actions.UpdateLanguageField(languageIndex, "level", event.target.value)
                                    }
                                >
                                    <option value="">None</option>
                                    <option value="A1">A1</option>
                                    <option value="A2">A2</option>
                                    <option value="B1">B1</option>
                                    <option value="B2">B2</option>
                                    <option value="C1">C1</option>
                                    <option value="C2">C2</option>
                                    <option value="Native">Native</option>
                                </select>
                            </label>
                            <label className="create-cv-select-field">
                                <span>Knowledge display</span>
                                <select
                                    value={language.ratingStyle}
                                    onChange={(event) =>
                                        actions.UpdateLanguageField(languageIndex, "ratingStyle", event.target.value)
                                    }
                                >
                                    <option value="none">No rating</option>
                                    <option value="circle">Circles</option>
                                    <option value="square">Squares</option>
                                </select>
                            </label>
                            <label className="create-cv-select-field">
                                <span>Level 0-5</span>
                                <select
                                    value={language.rating}
                                    onChange={(event) =>
                                        actions.UpdateLanguageField(languageIndex, "rating", Number(event.target.value))
                                    }
                                >
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </label>
                        </div>
                    </article>
                ))}
            </section>
            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.LinkLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Links</h2>
                    </div>
                    <button
                        type="button"
                        className="create-cv-section-add-btn"
                        aria-label="Add links"
                        onClick={actions.AddLink}
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {cv.links.map((link, linkIndex) => (
                    <article
                        className={
                            linkIndex > 0 ? "create-cv-list-item create-cv-list-item-spaced" : "create-cv-list-item"
                        }
                        key={linkIndex}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Link {linkIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={"Delete links item " + (linkIndex + 1)}
                                disabled={cv.links.length === 1}
                                onClick={() => actions.RemoveLink(linkIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Label</span>
                                <input
                                    type="text"
                                    aria-label="Label"
                                    value={link.label ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateLinkField(linkIndex, "label", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">URL</span>
                                <input
                                    type="text"
                                    aria-label="URL"
                                    value={link.url ?? ""}
                                    onChange={(event) => actions.UpdateLinkField(linkIndex, "url", event.target.value)}
                                />
                            </label>
                        </div>
                    </article>
                ))}
            </section>
            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.SparklesLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Projects</h2>
                        <button
                            type="button"
                            className="create-cv-section-rename-btn"
                            aria-label="Rename projects in CV"
                            aria-expanded={projectsTitleOpen}
                            onClick={() => SetProjectsTitleOpen(!projectsTitleOpen)}
                        >
                            <Icons.PencilLucideIcon />
                        </button>
                    </div>
                    <button
                        type="button"
                        className="create-cv-section-add-btn"
                        aria-label="Add projects"
                        onClick={actions.AddProject}
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {projectsTitleOpen && (
                    <label className="create-cv-section-title-editor">
                        <span>Visible title</span>
                        <input
                            value={cv.sectionTitles.projects}
                            onChange={(event) => actions.UpdateSectionTitle("projects", event.target.value)}
                        />
                    </label>
                )}
                {cv.projects.map((project, projectIndex) => (
                    <article
                        className={
                            projectIndex > 0 ? "create-cv-list-item create-cv-list-item-spaced" : "create-cv-list-item"
                        }
                        key={projectIndex}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Project {projectIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={"Delete projects item " + (projectIndex + 1)}
                                disabled={cv.projects.length === 1}
                                onClick={() => actions.RemoveProject(projectIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Name</span>
                                <input
                                    type="text"
                                    aria-label="Name"
                                    value={project.name ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateProjectField(projectIndex, "name", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Subtitle</span>
                                <input
                                    type="text"
                                    aria-label="Subtitle"
                                    value={project.subtitle ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateProjectField(projectIndex, "subtitle", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-field create-cv-field-wide">
                                <span className="document-field-label-row">Description</span>
                                <textarea
                                    aria-label="Description"
                                    value={project.description ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateProjectField(projectIndex, "description", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-select-field">
                                <span>Description display</span>
                                <select
                                    value={project.descriptionListStyle}
                                    onChange={(event) =>
                                        actions.UpdateProjectField(
                                            projectIndex,
                                            "descriptionListStyle",
                                            event.target.value,
                                        )
                                    }
                                >
                                    <option value="none">Paragraphs</option>
                                    <option value="disc">Bullet points</option>
                                    <option value="decimal">Numbered list</option>
                                </select>
                            </label>
                        </div>
                    </article>
                ))}
            </section>
            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.SparklesLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Main panel custom field</h2>
                        <button
                            type="button"
                            className="create-cv-section-rename-btn"
                            aria-label="Rename main panel custom field in CV"
                            aria-expanded={mainCustomTitleOpen}
                            onClick={() => SetMainCustomTitleOpen(!mainCustomTitleOpen)}
                        >
                            <Icons.PencilLucideIcon />
                        </button>
                    </div>
                    <button
                        type="button"
                        className="create-cv-section-add-btn"
                        aria-label="Add main panel custom field"
                        onClick={actions.AddMainCustomItem}
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {mainCustomTitleOpen && (
                    <label className="create-cv-section-title-editor">
                        <span>Visible title</span>
                        <input
                            value={cv.sectionTitles.mainCustom}
                            onChange={(event) => actions.UpdateSectionTitle("mainCustom", event.target.value)}
                        />
                    </label>
                )}
                {cv.mainCustom.map((customEntry, customEntryIndex) => (
                    <article
                        className={
                            customEntryIndex > 0
                                ? "create-cv-list-item create-cv-list-item-spaced"
                                : "create-cv-list-item"
                        }
                        key={customEntryIndex}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Item {customEntryIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={"Delete mainCustom item " + (customEntryIndex + 1)}
                                disabled={cv.mainCustom.length === 1}
                                onClick={() => actions.RemoveMainCustomItem(customEntryIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Name</span>
                                <input
                                    type="text"
                                    aria-label="Name"
                                    value={customEntry.name ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateMainCustomItem(customEntryIndex, "name", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Subtitle</span>
                                <input
                                    type="text"
                                    aria-label="Subtitle"
                                    value={customEntry.subtitle ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateMainCustomItem(customEntryIndex, "subtitle", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-field create-cv-field-wide">
                                <span className="document-field-label-row">Description</span>
                                <textarea
                                    aria-label="Description"
                                    value={customEntry.description ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateMainCustomItem(
                                            customEntryIndex,
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label className="create-cv-select-field">
                                <span>Description display</span>
                                <select
                                    value={customEntry.descriptionListStyle}
                                    onChange={(event) =>
                                        actions.UpdateMainCustomItem(
                                            customEntryIndex,
                                            "descriptionListStyle",
                                            event.target.value,
                                        )
                                    }
                                >
                                    <option value="none">Paragraphs</option>
                                    <option value="disc">Bullet points</option>
                                    <option value="decimal">Numbered list</option>
                                </select>
                            </label>
                        </div>
                    </article>
                ))}
            </section>
            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.SparklesLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Additional custom field</h2>
                        <button
                            type="button"
                            className="create-cv-section-rename-btn"
                            aria-label="Rename additional custom field in CV"
                            aria-expanded={sideCustomTitleOpen}
                            onClick={() => SetSideCustomTitleOpen(!sideCustomTitleOpen)}
                        >
                            <Icons.PencilLucideIcon />
                        </button>
                    </div>
                    <button
                        type="button"
                        className="create-cv-section-add-btn"
                        aria-label="Add additional custom field"
                        onClick={actions.AddSideCustomItem}
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {sideCustomTitleOpen && (
                    <label className="create-cv-section-title-editor">
                        <span>Visible title</span>
                        <input
                            value={cv.sectionTitles.sideCustom}
                            onChange={(event) => actions.UpdateSectionTitle("sideCustom", event.target.value)}
                        />
                    </label>
                )}
                {cv.sideCustom.map((customEntry, customEntryIndex) => (
                    <article
                        className={
                            customEntryIndex > 0
                                ? "create-cv-list-item create-cv-list-item-spaced"
                                : "create-cv-list-item"
                        }
                        key={customEntryIndex}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Item {customEntryIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={"Delete sideCustom item " + (customEntryIndex + 1)}
                                disabled={cv.sideCustom.length === 1}
                                onClick={() => actions.RemoveSideCustomItem(customEntryIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Name</span>
                                <input
                                    type="text"
                                    aria-label="Name"
                                    value={customEntry.name ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateSideCustomItem(customEntryIndex, "name", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-field">
                                <span className="document-field-label-row">Subtitle</span>
                                <input
                                    type="text"
                                    aria-label="Subtitle"
                                    value={customEntry.subtitle ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateSideCustomItem(customEntryIndex, "subtitle", event.target.value)
                                    }
                                />
                            </label>
                            <label className="create-cv-field create-cv-field-wide">
                                <span className="document-field-label-row">Description</span>
                                <textarea
                                    aria-label="Description"
                                    value={customEntry.description ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateSideCustomItem(
                                            customEntryIndex,
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label className="create-cv-select-field">
                                <span>Description display</span>
                                <select
                                    value={customEntry.descriptionListStyle}
                                    onChange={(event) =>
                                        actions.UpdateSideCustomItem(
                                            customEntryIndex,
                                            "descriptionListStyle",
                                            event.target.value,
                                        )
                                    }
                                >
                                    <option value="none">Paragraphs</option>
                                    <option value="disc">Bullet points</option>
                                    <option value="decimal">Numbered list</option>
                                </select>
                            </label>
                        </div>
                    </article>
                ))}
            </section>
        </aside>
    );
}
export default CvEditorSidebar;

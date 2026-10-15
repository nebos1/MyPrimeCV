import "../../components/CvEditorSidebar.css";
import * as Icons from "../../../../folder-lucide-icons/lucide-icons";
import { useState } from "react";
import { GetDefaultProjectTitle, NormalizeSkillData } from "../../create-cv-data";
function CvEditorSidebar({ cv, templateId, actions }) {
    const [projectsTitleOpen, SetProjectsTitleOpen] = useState(false);
    const [mainCustomTitleOpen, SetMainCustomTitleOpen] = useState(false);
    const [sideCustomTitleOpen, SetSideCustomTitleOpen] = useState(false);
    const projectTitle = cv.sectionTitles.projects || GetDefaultProjectTitle(templateId);
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
                    <div className="create-cv-field">
                        <div className="document-field-label-row">
                            <label>First name</label>
                        </div>
                        <input
                            aria-label="First name"
                            type="text"
                            value={cv.basics.firstName ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("firstName", event.target.value)}
                        />
                    </div>
                    <div className="create-cv-field">
                        <div className="document-field-label-row">
                            <label>Last name</label>
                        </div>
                        <input
                            aria-label="Last name"
                            type="text"
                            value={cv.basics.lastName ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("lastName", event.target.value)}
                        />
                    </div>
                    <div className="create-cv-field create-cv-field-wide">
                        <div className="document-field-label-row">
                            <label>Professional title</label>
                        </div>
                        <input
                            aria-label="Professional title"
                            type="text"
                            value={cv.basics.professionalTitle ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("professionalTitle", event.target.value)}
                        />
                    </div>
                    <div className="create-cv-field">
                        <div className="document-field-label-row">
                            <label>Email</label>
                        </div>
                        <input
                            aria-label="Email"
                            type="email"
                            value={cv.basics.email ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("email", event.target.value)}
                        />
                    </div>
                    <div className="create-cv-field">
                        <div className="document-field-label-row">
                            <label>Phone</label>
                        </div>
                        <input
                            aria-label="Phone"
                            type="text"
                            value={cv.basics.phone ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("phone", event.target.value)}
                        />
                    </div>
                    <div className="create-cv-field">
                        <div className="document-field-label-row">
                            <label>City</label>
                        </div>
                        <input
                            aria-label="City"
                            type="text"
                            value={cv.basics.city ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("city", event.target.value)}
                        />
                    </div>
                    <div className="create-cv-field">
                        <div className="document-field-label-row">
                            <label>Country</label>
                        </div>
                        <input
                            aria-label="Country"
                            type="text"
                            value={cv.basics.country ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("country", event.target.value)}
                        />
                    </div>
                    <div className="create-cv-field">
                        <div className="document-field-label-row">
                            <label>Date of birth</label>
                        </div>
                        <input
                            aria-label="Date of birth"
                            type="text"
                            value={cv.basics.birthDate ?? ""}
                            onChange={(event) => actions.UpdateBasicsField("birthDate", event.target.value)}
                        />
                    </div>
                    <label className="create-cv-select-field">
                        <span>Gender</span>
                        <select
                            value={cv.basics.gender ?? ""}
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
                <div className="create-cv-field create-cv-field-wide">
                    <div className="document-field-label-row">
                        <label>Professional summary</label>
                    </div>
                    <textarea
                        value={cv.profile ?? ""}
                        onChange={(event) => actions.UpdateProfile(event.target.value)}
                        aria-label="Professional summary"
                    />
                </div>
            </section>

            <section className="create-cv-editor-section">
                <header className="create-cv-editor-section-header">
                    <span className="create-cv-section-icon">
                        <Icons.BriefcaseBusinessLucideIcon />
                    </span>
                    <div className="create-cv-section-heading">
                        <h2>Employment history</h2>
                    </div>
                </header>
                <div className="create-cv-list-header">
                    <h3>Roles</h3>
                    <button type="button" onClick={actions.AddEmployment} aria-label="Add roles">
                        <Icons.PlusLucideIcon />
                    </button>
                </div>
                {cv.employment.map((employmentEntry, employmentEntryIndex) => (
                    <article
                        className={
                            employmentEntryIndex > 0
                                ? "create-cv-list-item create-cv-list-item-spaced"
                                : "create-cv-list-item"
                        }
                        key={`employment-${employmentEntryIndex}`}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Role {employmentEntryIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={`Delete role ${employmentEntryIndex + 1}`}
                                disabled={cv.employment.length === 1}
                                onClick={() => actions.RemoveEmployment(employmentEntryIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Role title</label>
                                </div>
                                <input
                                    aria-label="Role title"
                                    type="text"
                                    value={employmentEntry.role ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(employmentEntryIndex, "role", event.target.value)
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Company</label>
                                </div>
                                <input
                                    aria-label="Company"
                                    type="text"
                                    value={employmentEntry.company ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "company",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Location</label>
                                </div>
                                <input
                                    aria-label="Location"
                                    type="text"
                                    value={employmentEntry.location ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "location",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Additions</label>
                                </div>
                                <input
                                    aria-label="Additions"
                                    type="text"
                                    value={employmentEntry.additions ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "additions",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Date start</label>
                                </div>
                                <input
                                    aria-label="Date start"
                                    type="text"
                                    value={employmentEntry.startDate ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "startDate",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Date end</label>
                                </div>
                                <input
                                    aria-label="Date end"
                                    type="text"
                                    value={employmentEntry.endDate ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "endDate",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="create-cv-field create-cv-field-wide">
                                <div className="document-field-label-row">
                                    <label>Description / bullet lines</label>
                                </div>
                                <textarea
                                    value={employmentEntry.description ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEmploymentField(
                                            employmentEntryIndex,
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                    aria-label="Description / bullet lines"
                                />
                            </div>
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
                        onClick={actions.AddEducation}
                        aria-label="Add education"
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
                        key={`education-${educationEntryIndex}`}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Education {educationEntryIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={`Delete education ${educationEntryIndex + 1}`}
                                disabled={cv.education.length === 1}
                                onClick={() => actions.RemoveEducation(educationEntryIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Degree</label>
                                </div>
                                <input
                                    aria-label="Degree"
                                    type="text"
                                    value={educationEntry.degree ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(educationEntryIndex, "degree", event.target.value)
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>School</label>
                                </div>
                                <input
                                    aria-label="School"
                                    type="text"
                                    value={educationEntry.school ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(educationEntryIndex, "school", event.target.value)
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Location</label>
                                </div>
                                <input
                                    aria-label="Location"
                                    type="text"
                                    value={educationEntry.location ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(
                                            educationEntryIndex,
                                            "location",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Additions</label>
                                </div>
                                <input
                                    aria-label="Additions"
                                    type="text"
                                    value={educationEntry.additions ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(
                                            educationEntryIndex,
                                            "additions",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Date start</label>
                                </div>
                                <input
                                    aria-label="Date start"
                                    type="text"
                                    value={educationEntry.startDate ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(
                                            educationEntryIndex,
                                            "startDate",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Date end</label>
                                </div>
                                <input
                                    aria-label="Date end"
                                    type="text"
                                    value={educationEntry.endDate ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateEducationField(educationEntryIndex, "endDate", event.target.value)
                                    }
                                />
                            </div>
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
                    </div>
                    <button
                        type="button"
                        className="create-cv-section-add-btn"
                        onClick={actions.AddSkill}
                        aria-label="Add skills"
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {cv.skills.map((skill, skillIndex) => {
                    const item = NormalizeSkillData(skill);
                    return (
                        <article
                            className={
                                skillIndex > 0
                                    ? "create-cv-list-item create-cv-list-item-compact create-cv-list-item-spaced"
                                    : "create-cv-list-item create-cv-list-item-compact"
                            }
                            key={`skill-${skillIndex}`}
                        >
                            <div className="create-cv-list-item-top">
                                <span>Skill {skillIndex + 1}</span>
                                <button
                                    type="button"
                                    className="create-cv-delete-btn"
                                    aria-label={`Delete skill ${skillIndex + 1}`}
                                    disabled={cv.skills.length === 1}
                                    onClick={() => actions.RemoveSkill(skillIndex)}
                                >
                                    <Icons.Trash2LucideIcon />
                                </button>
                            </div>
                            <div className="create-cv-field-grid">
                                <div className="create-cv-field create-cv-field-wide">
                                    <div className="document-field-label-row">
                                        <label>Skill</label>
                                    </div>
                                    <input
                                        aria-label="Skill"
                                        type="text"
                                        value={item.label ?? ""}
                                        onChange={(event) =>
                                            actions.UpdateSkillField(skillIndex, "label", event.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="create-cv-rating-controls">
                                <label className="create-cv-select-field">
                                    <span>Knowledge display</span>
                                    <select
                                        value={item.ratingStyle ?? ""}
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
                                        value={String(item.rating ?? 0) ?? ""}
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
                    );
                })}
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
                        onClick={actions.AddLanguage}
                        aria-label="Add languages"
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {cv.languages.map((language, languageIndex) => (
                    <article
                        className={
                            languageIndex > 0
                                ? "create-cv-list-item create-cv-list-item-compact create-cv-list-item-spaced"
                                : "create-cv-list-item create-cv-list-item-compact"
                        }
                        key={`language-${languageIndex}`}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Language {languageIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={`Delete language ${languageIndex + 1}`}
                                disabled={cv.languages.length === 1}
                                onClick={() => actions.RemoveLanguage(languageIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Language</label>
                                </div>
                                <input
                                    aria-label="Language"
                                    type="text"
                                    value={language.name ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateLanguageField(languageIndex, "name", event.target.value)
                                    }
                                />
                            </div>
                            <label className="create-cv-select-field">
                                <span>Level</span>
                                <select
                                    value={language.level ?? ""}
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
                        </div>
                        <div className="create-cv-rating-controls">
                            <label className="create-cv-select-field">
                                <span>Knowledge display</span>
                                <select
                                    value={language.ratingStyle ?? ""}
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
                                    value={String(language.rating ?? 0) ?? ""}
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
                        onClick={actions.AddLink}
                        aria-label="Add links"
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {cv.links.map((link, linkIndex) => (
                    <article
                        className={
                            linkIndex > 0
                                ? "create-cv-list-item create-cv-list-item-compact create-cv-list-item-spaced"
                                : "create-cv-list-item create-cv-list-item-compact"
                        }
                        key={`link-${linkIndex}`}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Link {linkIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={`Delete link ${linkIndex + 1}`}
                                disabled={cv.links.length === 1}
                                onClick={() => actions.RemoveLink(linkIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Label</label>
                                </div>
                                <input
                                    aria-label="Label"
                                    type="text"
                                    value={link.label ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateLinkField(linkIndex, "label", event.target.value)
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>URL</label>
                                </div>
                                <input
                                    aria-label="URL"
                                    type="text"
                                    value={link.url ?? ""}
                                    onChange={(event) => actions.UpdateLinkField(linkIndex, "url", event.target.value)}
                                />
                            </div>
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
                            className={
                                projectsTitleOpen
                                    ? "create-cv-section-rename-btn create-cv-title-open"
                                    : "create-cv-section-rename-btn"
                            }
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
                        onClick={actions.AddProject}
                        aria-label="Add projects"
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {projectsTitleOpen && (
                    <label className="create-cv-section-title-editor">
                        <span>Visible title</span>
                        <input
                            value={projectTitle ?? ""}
                            onChange={(event) => actions.UpdateSectionTitle("projects", event.target.value)}
                        />
                    </label>
                )}
                {cv.projects.map((project, projectIndex) => (
                    <article
                        className={
                            projectIndex > 0 ? "create-cv-list-item create-cv-list-item-spaced" : "create-cv-list-item"
                        }
                        key={`project-${projectIndex}`}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Project {projectIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={`Delete project ${projectIndex + 1}`}
                                disabled={cv.projects.length === 1}
                                onClick={() => actions.RemoveProject(projectIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Name</label>
                                </div>
                                <input
                                    aria-label="Name"
                                    type="text"
                                    value={project.name ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateProjectField(projectIndex, "name", event.target.value)
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Subtitle</label>
                                </div>
                                <input
                                    aria-label="Subtitle"
                                    type="text"
                                    value={project.subtitle ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateProjectField(projectIndex, "subtitle", event.target.value)
                                    }
                                />
                            </div>
                            <div className="create-cv-field create-cv-field-wide">
                                <div className="document-field-label-row">
                                    <label>Description</label>
                                </div>
                                <textarea
                                    value={project.description ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateProjectField(projectIndex, "description", event.target.value)
                                    }
                                    aria-label="Description"
                                />
                            </div>
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
                            className={
                                mainCustomTitleOpen
                                    ? "create-cv-section-rename-btn create-cv-title-open"
                                    : "create-cv-section-rename-btn"
                            }
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
                        onClick={actions.AddMainCustomItem}
                        aria-label="Add main panel custom field"
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {mainCustomTitleOpen && (
                    <label className="create-cv-section-title-editor">
                        <span>Visible title</span>
                        <input
                            value={cv.sectionTitles.mainCustom ?? ""}
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
                        key={`${"Main panel custom field"}-${customEntryIndex}`}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Item {customEntryIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={`Delete item ${customEntryIndex + 1} from ${"Main panel custom field"}`}
                                disabled={cv.mainCustom.length === 1}
                                onClick={() => actions.RemoveMainCustomItem(customEntryIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Name</label>
                                </div>
                                <input
                                    aria-label="Name"
                                    type="text"
                                    value={customEntry.name ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateMainCustomItem(customEntryIndex, "name", event.target.value)
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Subtitle</label>
                                </div>
                                <input
                                    aria-label="Subtitle"
                                    type="text"
                                    value={customEntry.subtitle ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateMainCustomItem(customEntryIndex, "subtitle", event.target.value)
                                    }
                                />
                            </div>
                            <div className="create-cv-field create-cv-field-wide">
                                <div className="document-field-label-row">
                                    <label>Description</label>
                                </div>
                                <textarea
                                    value={customEntry.description ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateMainCustomItem(
                                            customEntryIndex,
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                    aria-label="Description"
                                />
                            </div>
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
                        <h2>Side panel custom field</h2>
                        <button
                            type="button"
                            className={
                                sideCustomTitleOpen
                                    ? "create-cv-section-rename-btn create-cv-title-open"
                                    : "create-cv-section-rename-btn"
                            }
                            aria-label="Rename side panel custom field in CV"
                            aria-expanded={sideCustomTitleOpen}
                            onClick={() => SetSideCustomTitleOpen(!sideCustomTitleOpen)}
                        >
                            <Icons.PencilLucideIcon />
                        </button>
                    </div>
                    <button
                        type="button"
                        className="create-cv-section-add-btn"
                        onClick={actions.AddSideCustomItem}
                        aria-label="Add side panel custom field"
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                </header>
                {sideCustomTitleOpen && (
                    <label className="create-cv-section-title-editor">
                        <span>Visible title</span>
                        <input
                            value={cv.sectionTitles.sideCustom ?? ""}
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
                        key={`${"Side panel custom field"}-${customEntryIndex}`}
                    >
                        <div className="create-cv-list-item-top">
                            <span>Item {customEntryIndex + 1}</span>
                            <button
                                type="button"
                                className="create-cv-delete-btn"
                                aria-label={`Delete item ${customEntryIndex + 1} from ${"Side panel custom field"}`}
                                disabled={cv.sideCustom.length === 1}
                                onClick={() => actions.RemoveSideCustomItem(customEntryIndex)}
                            >
                                <Icons.Trash2LucideIcon />
                            </button>
                        </div>
                        <div className="create-cv-field-grid">
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Name</label>
                                </div>
                                <input
                                    aria-label="Name"
                                    type="text"
                                    value={customEntry.name ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateSideCustomItem(customEntryIndex, "name", event.target.value)
                                    }
                                />
                            </div>
                            <div className="create-cv-field">
                                <div className="document-field-label-row">
                                    <label>Subtitle</label>
                                </div>
                                <input
                                    aria-label="Subtitle"
                                    type="text"
                                    value={customEntry.subtitle ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateSideCustomItem(customEntryIndex, "subtitle", event.target.value)
                                    }
                                />
                            </div>
                            <div className="create-cv-field create-cv-field-wide">
                                <div className="document-field-label-row">
                                    <label>Description</label>
                                </div>
                                <textarea
                                    value={customEntry.description ?? ""}
                                    onChange={(event) =>
                                        actions.UpdateSideCustomItem(
                                            customEntryIndex,
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                    aria-label="Description"
                                />
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </aside>
    );
}
export default CvEditorSidebar;

import "../../components/CvEditorSidebar.css";
import * as Icons from "../../../../folder-lucide-icons/lucide-icons";
import { useState } from "react";

import {
    GetDefaultProjectTitle,
    LanguageLevelOptions,
    NormalizeAtlasMetrics,
    NormalizeSkillData,
    RatingStyleOptions,
} from "../../create-cv-data";

function TextField({ label, value, onChange, type = "text", wide = false }) {
    const isDateField = type === "date";

    let fieldClassName;
    if (wide) {
        fieldClassName = "create-cv-field create-cv-field-wide";
    } else {
        fieldClassName = "create-cv-field";
    }

    let inputType;
    if (isDateField) {
        inputType = "text";
    } else {
        inputType = type;
    }

    return (
        <div className={fieldClassName}>
            <div className="field-label-row">
                <label>{label}</label>
            </div>
            <input type={inputType} value={value ?? ""} onChange={(event) => onChange(event.target.value)} />
        </div>
    );
}

function TextAreaField({ label, value, onChange }) {
    return (
        <div className="create-cv-field create-cv-field-wide">
            <div className="field-label-row">
                <label>{label}</label>
            </div>
            <textarea value={value ?? ""} onChange={(event) => onChange(event.target.value)} />
        </div>
    );
}

function SelectField({ label, value, onChange, options }) {
    return (
        <label className="create-cv-select-field">
            <span>{label}</span>
            <select value={value ?? ""} onChange={(event) => onChange(event.target.value)}>
                {options.map((option) => {
                    if (typeof option === "string") {
                        return (
                            <option key={option || "empty"} value={option}>
                                {option || "None"}
                            </option>
                        );
                    } else {
                        return (
                            <option key={option.value || "empty"} value={option.value} disabled={option.disabled}>
                                {option.label}
                            </option>
                        );
                    }
                })}
            </select>
        </label>
    );
}

function RatingControls({ item, onChange }) {
    return (
        <div className="create-cv-rating-controls">
            <SelectField
                label="Knowledge display"
                value={item.ratingStyle}
                options={RatingStyleOptions}
                onChange={(value) => onChange("ratingStyle", value)}
            />
            <SelectField
                label="Level 0-5"
                value={String(item.rating ?? 0)}
                options={["0", "1", "2", "3", "4", "5"]}
                onChange={(value) => onChange("rating", Number(value))}
            />
        </div>
    );
}

function SidebarSection({ icon: Icon, title, visibleTitle, children, onAdd, onVisibleTitleChange }) {
    const [isTitleOpen, setIsTitleOpen] = useState(false);
    const canRename = typeof onVisibleTitleChange === "function";

    let createCvSectionRenameBtnClassName;
    if (canRename) {
        if (isTitleOpen) {
            createCvSectionRenameBtnClassName = "create-cv-section-rename-btn is-open";
        } else {
            createCvSectionRenameBtnClassName = "create-cv-section-rename-btn";
        }
    }

    return (
        <section className="create-cv-editor-section">
            <header className="create-cv-editor-section-header">
                <span className="create-cv-section-icon">
                    <Icon />
                </span>
                <div className="create-cv-section-heading">
                    <h2>{title}</h2>
                    {canRename && (
                        <button
                            type="button"
                            className={createCvSectionRenameBtnClassName}
                            aria-label={`Rename ${title.toLowerCase()} in CV`}
                            aria-expanded={isTitleOpen}
                            onClick={() => setIsTitleOpen((open) => !open)}
                        >
                            <Icons.PencilLucideIcon />
                        </button>
                    )}
                </div>
                {onAdd && (
                    <button
                        type="button"
                        className="create-cv-section-add-btn"
                        onClick={onAdd}
                        aria-label={`Add ${title.toLowerCase()}`}
                    >
                        <Icons.PlusLucideIcon />
                    </button>
                )}
            </header>
            {isTitleOpen && (
                <label className="create-cv-section-title-editor">
                    <span>Visible title</span>
                    <input value={visibleTitle ?? ""} onChange={(event) => onVisibleTitleChange(event.target.value)} />
                </label>
            )}
            {children}
        </section>
    );
}

function ListHeader({ title, onAdd }) {
    return (
        <div className="create-cv-list-header">
            <h3>{title}</h3>
            <button type="button" onClick={onAdd} aria-label={`Add ${title.toLowerCase()}`}>
                <Icons.PlusLucideIcon />
            </button>
        </div>
    );
}

function DeleteButton({ label, disabled, onClick }) {
    return (
        <button type="button" className="create-cv-delete-btn" aria-label={label} disabled={disabled} onClick={onClick}>
            <Icons.Trash2LucideIcon />
        </button>
    );
}

function BasicsEditor({ basics, onChange }) {
    return (
        <SidebarSection icon={Icons.UserRoundLucideIcon} title="Personal details">
            <div className="create-cv-field-grid">
                <TextField
                    label="First name"
                    value={basics.firstName}
                    onChange={(value) => onChange("firstName", value)}
                />
                <TextField
                    label="Last name"
                    value={basics.lastName}
                    onChange={(value) => onChange("lastName", value)}
                />
                <TextField
                    label="Professional title"
                    value={basics.professionalTitle}
                    onChange={(value) => onChange("professionalTitle", value)}
                    wide
                />
                <TextField
                    label="Email"
                    type="email"
                    value={basics.email}
                    onChange={(value) => onChange("email", value)}
                />
                <TextField label="Phone" value={basics.phone} onChange={(value) => onChange("phone", value)} />
                <TextField label="City" value={basics.city} onChange={(value) => onChange("city", value)} />
                <TextField label="Country" value={basics.country} onChange={(value) => onChange("country", value)} />
                <TextField
                    label="Date of birth"
                    type="date"
                    value={basics.birthDate}
                    onChange={(value) => onChange("birthDate", value)}
                />
                <SelectField
                    label="Gender"
                    value={basics.gender}
                    options={[
                        { value: "", label: "Select gender" },
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                    ]}
                    onChange={(value) => onChange("gender", value)}
                />
            </div>
        </SidebarSection>
    );
}

function AtlasMetricsEditor({ metrics, onChange }) {
    const normalizedMetrics = NormalizeAtlasMetrics(metrics);

    return (
        <SidebarSection icon={Icons.ChartNoAxesCombinedLucideIcon} title="Additional">
            <div className="create-cv-atlas-metrics-editor">
                {normalizedMetrics.map((metric, index) => (
                    <article className="create-cv-atlas-metric" key={`atlas-metric-${index}`}>
                        <div className="create-cv-field-grid">
                            <TextField
                                label="Addition"
                                value={metric.addition}
                                onChange={(value) => onChange(index, "addition", value)}
                                wide
                            />
                            <TextField
                                label="Label"
                                value={metric.label}
                                onChange={(value) => onChange(index, "label", value)}
                                wide
                            />
                        </div>
                    </article>
                ))}
            </div>
        </SidebarSection>
    );
}

function EmploymentEditor({ employment, onAdd, onRemove, onChange }) {
    return (
        <SidebarSection icon={Icons.BriefcaseBusinessLucideIcon} title="Employment history">
            <ListHeader title="Roles" onAdd={onAdd} />
            {employment.map((item, index) => (
                <article className="create-cv-list-item" key={`employment-${index}`}>
                    <div className="create-cv-list-item-top">
                        <span>Role {index + 1}</span>
                        <DeleteButton
                            label={`Delete role ${index + 1}`}
                            disabled={employment.length === 1}
                            onClick={() => onRemove(index)}
                        />
                    </div>
                    <div className="create-cv-field-grid">
                        <TextField
                            label="Role title"
                            value={item.role}
                            onChange={(value) => onChange(index, "role", value)}
                        />
                        <TextField
                            label="Company"
                            value={item.company}
                            onChange={(value) => onChange(index, "company", value)}
                        />
                        <TextField
                            label="Location"
                            value={item.location}
                            onChange={(value) => onChange(index, "location", value)}
                        />
                        <TextField
                            label="Additions"
                            value={item.additions}
                            onChange={(value) => onChange(index, "additions", value)}
                        />
                        <TextField
                            label="Date start"
                            type="date"
                            value={item.startDate}
                            onChange={(value) => onChange(index, "startDate", value)}
                        />
                        <TextField
                            label="Date end"
                            type="date"
                            value={item.endDate}
                            onChange={(value) => onChange(index, "endDate", value)}
                        />
                        <TextAreaField
                            label="Description / bullet lines"
                            value={item.description}
                            onChange={(value) => onChange(index, "description", value)}
                        />
                    </div>
                </article>
            ))}
        </SidebarSection>
    );
}

function EducationEditor({ education, onAdd, onRemove, onChange }) {
    return (
        <SidebarSection icon={Icons.GraduationCapLucideIcon} title="Education" onAdd={onAdd}>
            {education.map((item, index) => (
                <article className="create-cv-list-item" key={`education-${index}`}>
                    <div className="create-cv-list-item-top">
                        <span>Education {index + 1}</span>
                        <DeleteButton
                            label={`Delete education ${index + 1}`}
                            disabled={education.length === 1}
                            onClick={() => onRemove(index)}
                        />
                    </div>
                    <div className="create-cv-field-grid">
                        <TextField
                            label="Degree"
                            value={item.degree}
                            onChange={(value) => onChange(index, "degree", value)}
                        />
                        <TextField
                            label="School"
                            value={item.school}
                            onChange={(value) => onChange(index, "school", value)}
                        />
                        <TextField
                            label="Location"
                            value={item.location}
                            onChange={(value) => onChange(index, "location", value)}
                        />
                        <TextField
                            label="Additions"
                            value={item.additions}
                            onChange={(value) => onChange(index, "additions", value)}
                        />
                        <TextField
                            label="Date start"
                            type="date"
                            value={item.startDate}
                            onChange={(value) => onChange(index, "startDate", value)}
                        />
                        <TextField
                            label="Date end"
                            type="date"
                            value={item.endDate}
                            onChange={(value) => onChange(index, "endDate", value)}
                        />
                    </div>
                </article>
            ))}
        </SidebarSection>
    );
}

function SkillsEditor({ skills, onAdd, onRemove, onChange }) {
    return (
        <SidebarSection icon={Icons.WrenchLucideIcon} title="Skills" onAdd={onAdd}>
            {skills.map((skill, index) => {
                const item = NormalizeSkillData(skill);

                return (
                    <article className="create-cv-list-item create-cv-list-item-compact" key={`skill-${index}`}>
                        <div className="create-cv-list-item-top">
                            <span>Skill {index + 1}</span>
                            <DeleteButton
                                label={`Delete skill ${index + 1}`}
                                disabled={skills.length === 1}
                                onClick={() => onRemove(index)}
                            />
                        </div>
                        <div className="create-cv-field-grid">
                            <TextField
                                label="Skill"
                                value={item.label}
                                onChange={(value) => onChange(index, "label", value)}
                                wide
                            />
                        </div>
                        <RatingControls item={item} onChange={(fieldKey, value) => onChange(index, fieldKey, value)} />
                    </article>
                );
            })}
        </SidebarSection>
    );
}

function LanguagesEditor({ languages, onAdd, onRemove, onChange }) {
    return (
        <SidebarSection icon={Icons.LanguagesLucideIcon} title="Languages" onAdd={onAdd}>
            {languages.map((item, index) => (
                <article className="create-cv-list-item create-cv-list-item-compact" key={`language-${index}`}>
                    <div className="create-cv-list-item-top">
                        <span>Language {index + 1}</span>
                        <DeleteButton
                            label={`Delete language ${index + 1}`}
                            disabled={languages.length === 1}
                            onClick={() => onRemove(index)}
                        />
                    </div>
                    <div className="create-cv-field-grid">
                        <TextField
                            label="Language"
                            value={item.name}
                            onChange={(value) => onChange(index, "name", value)}
                        />
                        <SelectField
                            label="Level"
                            value={item.level}
                            options={LanguageLevelOptions}
                            onChange={(value) => onChange(index, "level", value)}
                        />
                    </div>
                    <RatingControls item={item} onChange={(fieldKey, value) => onChange(index, fieldKey, value)} />
                </article>
            ))}
        </SidebarSection>
    );
}

function LinksEditor({ links, onAdd, onRemove, onChange }) {
    return (
        <SidebarSection icon={Icons.LinkLucideIcon} title="Links" onAdd={onAdd}>
            {links.map((item, index) => (
                <article className="create-cv-list-item create-cv-list-item-compact" key={`link-${index}`}>
                    <div className="create-cv-list-item-top">
                        <span>Link {index + 1}</span>
                        <DeleteButton
                            label={`Delete link ${index + 1}`}
                            disabled={links.length === 1}
                            onClick={() => onRemove(index)}
                        />
                    </div>
                    <div className="create-cv-field-grid">
                        <TextField
                            label="Label"
                            value={item.label}
                            onChange={(value) => onChange(index, "label", value)}
                        />
                        <TextField label="URL" value={item.url} onChange={(value) => onChange(index, "url", value)} />
                    </div>
                </article>
            ))}
        </SidebarSection>
    );
}

function ProjectsEditor({ projects, visibleTitle, onTitleChange, onAdd, onRemove, onChange }) {
    return (
        <SidebarSection
            icon={Icons.SparklesLucideIcon}
            title="Selected Case study"
            visibleTitle={visibleTitle}
            onVisibleTitleChange={onTitleChange}
            onAdd={onAdd}
        >
            {projects.map((item, index) => (
                <article className="create-cv-list-item" key={`project-${index}`}>
                    <div className="create-cv-list-item-top">
                        <span>Project {index + 1}</span>
                        <DeleteButton
                            label={`Delete project ${index + 1}`}
                            disabled={projects.length === 1}
                            onClick={() => onRemove(index)}
                        />
                    </div>
                    <div className="create-cv-field-grid">
                        <TextField
                            label="Name"
                            value={item.name}
                            onChange={(value) => onChange(index, "name", value)}
                        />
                        <TextField
                            label="Subtitle"
                            value={item.subtitle}
                            onChange={(value) => onChange(index, "subtitle", value)}
                        />
                        <TextAreaField
                            label="Description"
                            value={item.description}
                            onChange={(value) => onChange(index, "description", value)}
                        />
                    </div>
                </article>
            ))}
        </SidebarSection>
    );
}

function CustomSectionEditor({ editorTitle, items, visibleTitle, onTitleChange, onAdd, onRemove, onChange }) {
    return (
        <SidebarSection
            icon={Icons.SparklesLucideIcon}
            title={editorTitle}
            visibleTitle={visibleTitle}
            onVisibleTitleChange={onTitleChange}
            onAdd={onAdd}
        >
            {items.map((item, index) => (
                <article className="create-cv-list-item" key={`${editorTitle}-${index}`}>
                    <div className="create-cv-list-item-top">
                        <span>Item {index + 1}</span>
                        <DeleteButton
                            label={`Delete item ${index + 1} from ${editorTitle}`}
                            disabled={items.length === 1}
                            onClick={() => onRemove(index)}
                        />
                    </div>
                    <div className="create-cv-field-grid">
                        <TextField
                            label="Name"
                            value={item.name}
                            onChange={(value) => onChange(index, "name", value)}
                        />
                        <TextField
                            label="Subtitle"
                            value={item.subtitle}
                            onChange={(value) => onChange(index, "subtitle", value)}
                        />
                        <TextAreaField
                            label="Description"
                            value={item.description}
                            onChange={(value) => onChange(index, "description", value)}
                        />
                    </div>
                </article>
            ))}
        </SidebarSection>
    );
}

function CvEditorSidebar({ cv, templateId, actions }) {
    const projectTitle = cv.sectionTitles.projects || GetDefaultProjectTitle(templateId);

    return (
        <aside className="create-cv-editor-sidebar">
            <BasicsEditor basics={cv.basics} onChange={actions.UpdateBasicsField} />

            <SidebarSection icon={Icons.NotebookTextLucideIcon} title="Profile">
                <TextAreaField label="Professional summary" value={cv.profile} onChange={actions.UpdateProfile} />
            </SidebarSection>

            <AtlasMetricsEditor metrics={cv.atlasMetrics} onChange={actions.UpdateAtlasMetricField} />

            <EmploymentEditor
                employment={cv.employment}
                onAdd={actions.AddEmployment}
                onRemove={actions.RemoveEmployment}
                onChange={actions.UpdateEmploymentField}
            />

            <EducationEditor
                education={cv.education}
                onAdd={actions.AddEducation}
                onRemove={actions.RemoveEducation}
                onChange={actions.UpdateEducationField}
            />

            <SkillsEditor
                skills={cv.skills}
                onAdd={actions.AddSkill}
                onRemove={actions.RemoveSkill}
                onChange={actions.UpdateSkillField}
            />

            <LanguagesEditor
                languages={cv.languages}
                onAdd={actions.AddLanguage}
                onRemove={actions.RemoveLanguage}
                onChange={actions.UpdateLanguageField}
            />

            <LinksEditor
                links={cv.links}
                onAdd={actions.AddLink}
                onRemove={actions.RemoveLink}
                onChange={actions.UpdateLinkField}
            />

            <ProjectsEditor
                projects={cv.projects}
                visibleTitle={projectTitle}
                onTitleChange={(value) => actions.UpdateSectionTitle("projects", value)}
                onAdd={actions.AddProject}
                onRemove={actions.RemoveProject}
                onChange={actions.UpdateProjectField}
            />

            <CustomSectionEditor
                editorTitle="Main panel custom field"
                items={cv.mainCustom}
                visibleTitle={cv.sectionTitles.mainCustom}
                onTitleChange={(value) => actions.UpdateSectionTitle("mainCustom", value)}
                onAdd={actions.AddMainCustomItem}
                onRemove={actions.RemoveMainCustomItem}
                onChange={actions.UpdateMainCustomItem}
            />

            <CustomSectionEditor
                editorTitle="Side panel custom field"
                items={cv.sideCustom}
                visibleTitle={cv.sectionTitles.sideCustom}
                onTitleChange={(value) => actions.UpdateSectionTitle("sideCustom", value)}
                onAdd={actions.AddSideCustomItem}
                onRemove={actions.RemoveSideCustomItem}
                onChange={actions.UpdateSideCustomItem}
            />
        </aside>
    );
}

export default CvEditorSidebar;

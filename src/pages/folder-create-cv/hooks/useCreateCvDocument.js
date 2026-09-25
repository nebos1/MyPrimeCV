import { useEffect, useState } from "react";

import {
    CreateEmptyCustomItem,
    CreateEmptyEducation,
    CreateEmptyEmployment,
    CreateEmptyCvData,
    CreateEmptyLanguage,
    CreateEmptyLink,
    CreateEmptyProject,
    CreateEmptySkill,
    DefaultTemplateId,
    NormalizeCvData,
} from "../create-cv-data";
import { GetCreateCvTemplate } from "../create-cv-template-registry";
import { GetStorageErrorMessage } from "../../folder-local-storage/saving-data";
import {
    CreateWorkspaceDocumentDraft,
    GetResumeFromWorkspaceBackup,
    GetWorkspaceDocument,
    SaveWorkspaceDocument,
} from "../../folder-local-storage/workspace-storage";

function GetDocumentFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const documentId = params.get("id");
    if (documentId) {
        const document = GetWorkspaceDocument(documentId);
        if (document) {
            document.data = NormalizeCvData(document.data);
            return document;
        }
    }
    const templateId = params.get("template") || DefaultTemplateId;
    if (!GetCreateCvTemplate(templateId).isImplemented) {
        return null;
    }

    return CreateWorkspaceDocumentDraft({
        type: "resume",
        title: "Untitled CV",
        templateId,
        data: CreateEmptyCvData(),
    });
}

export function useCreateCvDocument() {
    const [document, setDocument] = useState(GetDocumentFromUrl);
    const [saveStatus, setSaveStatus] = useState("Saving...");
    const [saveAttempt, setSaveAttempt] = useState(0);
    const template = GetCreateCvTemplate(document?.templateId || new URLSearchParams(window.location.search).get("template"));

    useEffect(() => {
        if (!document || !template.isImplemented) {
            return;
        }

        try {
            SaveWorkspaceDocument(document);
            setSaveStatus("Saved locally");
            const params = new URLSearchParams(window.location.search);
            if (params.get("id") !== document.id) {
                window.history.replaceState(null, "", `/create-cv?id=${document.id}`);
            }
        } catch (error) {
            setSaveStatus(GetStorageErrorMessage(error));
        }
    }, [document, template.isImplemented, saveAttempt]);

    function UpdateDocument(changes) {
        setDocument((current) => Object.assign({}, current, changes));
    }

    function UpdateCvData(update) {
        setDocument((current) => {
            const next = structuredClone(current);
            update(next.data);
            next.data = NormalizeCvData(next.data);
            return next;
        });
    }

    function ImportWorkspaceBackup(backup) {
        const resume = GetResumeFromWorkspaceBackup(backup);
        UpdateDocument({ title: resume.title, data: NormalizeCvData(resume.data) });
    }

    function UpdateBasicsField(fieldKey, value) {
        UpdateCvData((data) => {
            data.basics[fieldKey] = value;
        });
    }

    function UpdateProfile(value) {
        UpdateCvData((data) => {
            data.profile = value;
        });
    }

    function UpdateAtlasMetricField(index, fieldKey, value) {
        UpdateCvData((data) => {
            data.atlasMetrics[index][fieldKey] = value;
        });
    }

    function UpdateSectionTitle(sectionKey, value) {
        UpdateCvData((data) => {
            data.sectionTitles[sectionKey] = value;
        });
    }

    function AddEmployment() {
        UpdateCvData((data) => {
            data.employment.push(CreateEmptyEmployment());
        });
    }

    function UpdateEmploymentField(index, fieldKey, value) {
        UpdateCvData((data) => {
            data.employment[index][fieldKey] = value;
        });
    }

    function RemoveEmployment(index) {
        UpdateCvData((data) => {
            if (data.employment.length > 1) data.employment.splice(index, 1);
        });
    }

    function AddEducation() {
        UpdateCvData((data) => {
            data.education.push(CreateEmptyEducation());
        });
    }

    function UpdateEducationField(index, fieldKey, value) {
        UpdateCvData((data) => {
            data.education[index][fieldKey] = value;
        });
    }

    function RemoveEducation(index) {
        UpdateCvData((data) => {
            if (data.education.length > 1) data.education.splice(index, 1);
        });
    }

    function AddSkill() {
        UpdateCvData((data) => {
            data.skills.push(CreateEmptySkill());
        });
    }

    function UpdateSkillField(index, fieldKey, value) {
        UpdateCvData((data) => {
            data.skills[index][fieldKey] = value;
        });
    }

    function RemoveSkill(index) {
        UpdateCvData((data) => {
            if (data.skills.length > 1) data.skills.splice(index, 1);
        });
    }

    function AddLanguage() {
        UpdateCvData((data) => {
            data.languages.push(CreateEmptyLanguage());
        });
    }

    function UpdateLanguageField(index, fieldKey, value) {
        UpdateCvData((data) => {
            data.languages[index][fieldKey] = value;
        });
    }

    function RemoveLanguage(index) {
        UpdateCvData((data) => {
            if (data.languages.length > 1) data.languages.splice(index, 1);
        });
    }

    function AddLink() {
        UpdateCvData((data) => {
            data.links.push(CreateEmptyLink());
        });
    }

    function UpdateLinkField(index, fieldKey, value) {
        UpdateCvData((data) => {
            data.links[index][fieldKey] = value;
        });
    }

    function RemoveLink(index) {
        UpdateCvData((data) => {
            if (data.links.length > 1) data.links.splice(index, 1);
        });
    }

    function AddProject() {
        UpdateCvData((data) => {
            data.projects.push(CreateEmptyProject());
        });
    }

    function UpdateProjectField(index, fieldKey, value) {
        UpdateCvData((data) => {
            data.projects[index][fieldKey] = value;
        });
    }

    function RemoveProject(index) {
        UpdateCvData((data) => {
            if (data.projects.length > 1) data.projects.splice(index, 1);
        });
    }

    function AddCustomItem(sectionKey) {
        UpdateCvData((data) => {
            data[sectionKey].push(CreateEmptyCustomItem());
        });
    }

    function UpdateCustomItem(sectionKey, index, fieldKey, value) {
        UpdateCvData((data) => {
            data[sectionKey][index][fieldKey] = value;
        });
    }

    function RemoveCustomItem(sectionKey, index) {
        UpdateCvData((data) => {
            if (data[sectionKey].length > 1) data[sectionKey].splice(index, 1);
        });
    }

    return {
        document,
        template,
        saveStatus,
        RetrySave: () => setSaveAttempt((attempt) => attempt + 1),
        UpdateDocument,
        ImportWorkspaceBackup,
        actions: {
            UpdateBasicsField,
            UpdateProfile,
            UpdateAtlasMetricField,
            UpdateSectionTitle,
            AddEmployment,
            UpdateEmploymentField,
            RemoveEmployment,
            AddEducation,
            UpdateEducationField,
            RemoveEducation,
            AddSkill,
            UpdateSkillField,
            RemoveSkill,
            AddLanguage,
            UpdateLanguageField,
            RemoveLanguage,
            AddLink,
            UpdateLinkField,
            RemoveLink,
            AddProject,
            UpdateProjectField,
            RemoveProject,
            AddMainCustomItem: () => AddCustomItem("mainCustom"),
            UpdateMainCustomItem: (index, fieldKey, value) => UpdateCustomItem("mainCustom", index, fieldKey, value),
            RemoveMainCustomItem: (index) => RemoveCustomItem("mainCustom", index),
            AddSideCustomItem: () => AddCustomItem("sideCustom"),
            UpdateSideCustomItem: (index, fieldKey, value) => UpdateCustomItem("sideCustom", index, fieldKey, value),
            RemoveSideCustomItem: (index) => RemoveCustomItem("sideCustom", index),
        },
    };
}

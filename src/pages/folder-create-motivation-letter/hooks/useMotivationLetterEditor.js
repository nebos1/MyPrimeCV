import { useEffect, useState } from "react";

import { SectionConfig } from "../motivation-letter.config";
import { CreateDefaultStyle } from "../motivation-letter-style";
import { CreateInitialStyles, CreateInitialValues, NormalizeMotivationLetterData } from "../motivation-letter-state";
import { GetStorageErrorMessage } from "../../folder-local-storage/saving-data";
import {
    CreateWorkspaceDocumentDraft,
    GetWorkspaceDocument,
    SaveWorkspaceDocument,
} from "../../folder-local-storage/workspace-storage";

function CreateInitialMotivationLetterDocument() {
    const params = new URLSearchParams(window.location.search);
    const documentId = params.get("id");

    if (documentId) {
        const existingDocument = GetWorkspaceDocument(documentId);

        if (existingDocument?.type === "motivation-letter") {
            return Object.assign({}, existingDocument, {
                data: NormalizeMotivationLetterData(existingDocument.data, SectionConfig),
            });
        }
    }

    const sectionValues = CreateInitialValues(SectionConfig);
    const fieldStyles = CreateInitialStyles(SectionConfig);
    return CreateWorkspaceDocumentDraft({
        type: "motivation-letter",
        title: "Untitled motivation letter",
        data: {
            sectionValues,
            fieldStyles,
        },
    });
}

function CreateOpenSections() {
    const sections = {};
    for (const section of SectionConfig) sections[section.key] = true;
    return sections;
}

export function useMotivationLetterEditor() {
    const [document] = useState(CreateInitialMotivationLetterDocument);
    const [saveStatus, setSaveStatus] = useState("Saving...");
    const [saveAttempt, setSaveAttempt] = useState(0);
    const [title, setTitle] = useState(document.title);
    const [zoom, setZoom] = useState(84);
    const [sectionValues, setSectionValues] = useState(
        () => document.data.sectionValues ?? CreateInitialValues(SectionConfig),
    );
    const [fieldStyles, setFieldStyles] = useState(
        () => document.data.fieldStyles ?? CreateInitialStyles(SectionConfig),
    );
    const [openSections, setOpenSections] = useState(() => CreateOpenSections());

    useEffect(() => {
        try {
            SaveWorkspaceDocument(
                Object.assign({}, document, {
                    title,
                    data: {
                        sectionValues,
                        fieldStyles,
                    },
                }),
            );

            const params = new URLSearchParams(window.location.search);

            if (params.get("id") !== document.id) {
                window.history.replaceState(null, "", `/create-motivation-letter?id=${document.id}`);
            }
            setSaveStatus("Saved locally");
        } catch (error) {
            setSaveStatus(GetStorageErrorMessage(error));
        }
    }, [document, title, sectionValues, fieldStyles, saveAttempt]);

    function UpdateValues(update) {
        setSectionValues((current) => {
            const next = structuredClone(current);
            update(next);
            return next;
        });
    }

    function HandleSectionToggle(sectionKey) {
        setOpenSections((current) => {
            const next = Object.assign({}, current);
            next[sectionKey] = !next[sectionKey];
            return next;
        });
    }

    function HandleFieldChange(sectionKey, fieldKey, value) {
        UpdateValues((values) => {
            values[sectionKey][fieldKey] = value;
        });
    }

    function HandleDateFormatChange(sectionKey, fieldKey, value) {
        UpdateValues((values) => {
            values[sectionKey][fieldKey + "_format"] = value;
        });
    }

    function HandleParagraphChange(index, value) {
        UpdateValues((values) => {
            values.BodyParagraphBlock.paragraphs[index] = value;
        });
    }

    function HandleAddParagraph() {
        UpdateValues((values) => {
            values.BodyParagraphBlock.paragraphs.push("");
        });
        setFieldStyles((current) => {
            const next = structuredClone(current);
            next.BodyParagraphBlock.paragraphs.push(CreateDefaultStyle());
            return next;
        });
    }

    function HandleRemoveParagraph(index) {
        if (sectionValues.BodyParagraphBlock.paragraphs.length === 1) return;
        UpdateValues((values) => {
            values.BodyParagraphBlock.paragraphs.splice(index, 1);
        });
        setFieldStyles((current) => {
            const next = structuredClone(current);
            next.BodyParagraphBlock.paragraphs.splice(index, 1);
            return next;
        });
    }

    return {
        saveStatus,
        RetrySave: () => setSaveAttempt((attempt) => attempt + 1),
        title,
        setTitle,
        zoom,
        setZoom,
        sectionValues,
        fieldStyles,
        openSections,
        HandleSectionToggle,
        HandleFieldChange,
        HandleDateFormatChange,
        HandleParagraphChange,
        HandleAddParagraph,
        HandleRemoveParagraph,
    };
}

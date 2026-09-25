import { CloneCvData, CreateEmptyCvData, CvSchemaVersion, DefaultTemplateId } from "../folder-create-cv/create-cv-data";
import { LoadData, SaveData } from "./saving-data";
import { BackupSchemaVersion, ValidateWorkspaceBackup, WorkspaceBackupFormat } from "./workspace-backup";

const WorkspaceDocumentsKey = "myprimecv.workspace.documents";

function CreateDocumentId(type) {
    const randomPart = Math.random().toString(36).slice(2, 9);

    return `${type}_${Date.now()}_${randomPart}`;
}

function GetNow() {
    return new Date().toISOString();
}

function NormalizeDocument(document) {
    let defaultTitle;
    if (typeof document.title !== "string" || !document.title) {
        if (document.type === "resume") {
            defaultTitle = "Untitled CV";
        } else {
            defaultTitle = "Untitled motivation letter";
        }
    }

    return {
        id: document.id,
        type: document.type,
        title: defaultTitle || document.title,
        templateId: document.templateId || null,
        schemaVersion: document.schemaVersion || CvSchemaVersion,
        data: document.data || CreateEmptyCvData(),
        favorite: Boolean(document.favorite),
        trashed: Boolean(document.trashed),
        trashedAt: document.trashedAt || null,
        createdAt: document.createdAt || GetNow(),
        updatedAt: document.updatedAt || GetNow(),
    };
}

export function GetWorkspaceDocuments(throwOnError = false) {
    const documents = LoadData(WorkspaceDocumentsKey, [], throwOnError);

    if (!Array.isArray(documents)) {
        return [];
    }

    return documents
        .filter((document) => document && typeof document === "object" && !Array.isArray(document))
        .map(NormalizeDocument);
}

function SaveWorkspaceDocuments(documents) {
    SaveData(WorkspaceDocumentsKey, documents.map(NormalizeDocument));
}

export function GetWorkspaceDocument(documentId) {
    return GetWorkspaceDocuments().find((document) => document.id === documentId) ?? null;
}

export function SaveWorkspaceDocument(nextDocument) {
    const documents = GetWorkspaceDocuments(true);
    const normalizedDocument = NormalizeDocument(Object.assign({}, nextDocument, { updatedAt: GetNow() }));
    const existingIndex = documents.findIndex((document) => document.id === normalizedDocument.id);

    if (existingIndex === -1) {
        documents.unshift(normalizedDocument);
        SaveWorkspaceDocuments(documents);
        return normalizedDocument;
    }

    const nextDocuments = documents.map((document, index) => {
        if (index === existingIndex) {
            return normalizedDocument;
        } else {
            return document;
        }
    });

    SaveWorkspaceDocuments(nextDocuments);
    return normalizedDocument;
}

export function MoveWorkspaceDocumentToTrash(documentId) {
    const now = GetNow();
    const nextDocuments = GetWorkspaceDocuments().map((document) => {
        if (document.id === documentId) {
            return Object.assign({}, document, { trashed: true, trashedAt: now, updatedAt: now });
        } else {
            return document;
        }
    });

    SaveWorkspaceDocuments(nextDocuments);
    return nextDocuments;
}

export function RenameWorkspaceDocument(documentId, title) {
    const documents = GetWorkspaceDocuments(true);
    const document = documents.find((item) => item.id === documentId);
    if (!document) {
        throw new Error("This document no longer exists.");
    }
    if (title.trim()) {
        document.title = title.trim();
        document.updatedAt = GetNow();
        SaveWorkspaceDocuments(documents);
    }
    return documents;
}

export function RestoreWorkspaceDocument(documentId) {
    const now = GetNow();
    const nextDocuments = GetWorkspaceDocuments().map((document) => {
        if (document.id === documentId) {
            return Object.assign({}, document, { trashed: false, trashedAt: null, updatedAt: now });
        } else {
            return document;
        }
    });

    SaveWorkspaceDocuments(nextDocuments);
    return nextDocuments;
}

export function ToggleWorkspaceDocumentFavorite(documentId) {
    const nextDocuments = GetWorkspaceDocuments().map((document) => {
        if (document.id === documentId) {
            return Object.assign({}, document, { favorite: !document.favorite });
        } else {
            return document;
        }
    });

    SaveWorkspaceDocuments(nextDocuments);
    return nextDocuments;
}

export function PermanentlyDeleteWorkspaceDocument(documentId) {
    const nextDocuments = GetWorkspaceDocuments().filter((document) => document.id !== documentId);

    SaveWorkspaceDocuments(nextDocuments);
    return nextDocuments;
}

export function CreateWorkspaceDocumentDraft({ type, title, templateId = null, data }) {
    const now = GetNow();

    return NormalizeDocument({
        id: CreateDocumentId(type),
        type,
        title,
        templateId,
        schemaVersion: CvSchemaVersion,
        data,
        favorite: false,
        trashed: false,
        createdAt: now,
        updatedAt: now,
    });
}

function CreateWorkspaceDocument({ type, title, templateId = null, data }) {
    const document = CreateWorkspaceDocumentDraft({
        type,
        title,
        templateId,
        data,
    });

    const documents = GetWorkspaceDocuments();
    documents.unshift(document);
    SaveWorkspaceDocuments(documents);
    return document;
}

export function CreateResumeDocument(templateId = DefaultTemplateId) {
    return CreateWorkspaceDocument({
        type: "resume",
        title: "Untitled CV",
        templateId,
        data: CloneCvData(CreateEmptyCvData()),
    });
}

export function GetWorkspaceCountsFromDocuments(documents) {
    const activeDocuments = documents.filter((document) => !document.trashed);

    return {
        all: activeDocuments.length,
        favorites: activeDocuments.filter((document) => document.favorite).length,
        resumes: activeDocuments.filter((document) => document.type === "resume").length,
        motivationLetters: activeDocuments.filter((document) => document.type === "motivation-letter").length,
        trash: documents.filter((document) => document.trashed).length,
    };
}

export function CreateWorkspaceBackup() {
    const activeDocuments = GetWorkspaceDocuments().filter((document) => !document.trashed);

    return {
        format: WorkspaceBackupFormat,
        product: "MyPrimeCV",
        backupSchemaVersion: BackupSchemaVersion,
        exportedAt: GetNow(),
        documents: activeDocuments,
    };
}

export function GetResumeFromWorkspaceBackup(backup) {
    ValidateWorkspaceBackup(backup);

    const resumes = backup.documents.filter(
        (document) => document?.type === "resume" && document.data && typeof document.data === "object",
    );
    const activeResumes = resumes.filter((document) => !document.trashed);
    let importCandidates;
    if (activeResumes.length > 0) {
        importCandidates = activeResumes;
    } else {
        importCandidates = resumes;
    }

    if (importCandidates.length === 0) {
        throw new Error("The selected MyPrimeCV backup does not contain a CV.");
    }

    const [resume] = importCandidates
        .slice()
        .sort(
            (left, right) =>
                Date.parse(right.updatedAt || right.createdAt || 0) - Date.parse(left.updatedAt || left.createdAt || 0),
        );

    return NormalizeDocument(resume);
}

export function RestoreWorkspaceBackup(backup) {
    ValidateWorkspaceBackup(backup);

    SaveWorkspaceDocuments(backup.documents);
    return GetWorkspaceDocuments();
}

import "./WorkspaceBackupActions.css";
import * as Icons from "../../../folder-lucide-icons/lucide-icons";

import { CreateWorkspaceBackup, RestoreWorkspaceBackup } from "../../folder-local-storage/workspace-storage";

function DownloadWorkspaceBackup() {
    const backup = CreateWorkspaceBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
        type: "application/json",
    });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = `myprimecv-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(objectUrl);
}

function WorkspaceBackupActions({ onRestore, inputRef }) {
    function RestoreFromFile(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            try {
                const backup = JSON.parse(reader.result);
                const restoredDocuments = RestoreWorkspaceBackup(backup);

                onRestore(restoredDocuments);
            } catch (error) {
                window.alert(error.message || "This backup file could not be restored.");
            } finally {
                event.target.value = "";
            }
        };

        reader.onerror = () => {
            window.alert("This backup file could not be read.");
            event.target.value = "";
        };

        reader.readAsText(file);
    }

    return (
        <div className="backup-actions">
            <button type="button" onClick={DownloadWorkspaceBackup}>
                <Icons.DownloadLucideIcon className="workspace-icons" /> Backup workspace (.json)
            </button>
            <button type="button" onClick={() => inputRef.current?.click()}>
                <Icons.UploadLucideIcon className="workspace-icons" /> Restore backup
            </button>
            <input ref={inputRef} type="file" accept="application/json,.json" onChange={RestoreFromFile} hidden />
        </div>
    );
}

export default WorkspaceBackupActions;

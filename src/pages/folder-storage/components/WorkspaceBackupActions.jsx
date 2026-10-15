import "./WorkspaceBackupActions.css";
import * as Icons from "../../../folder-lucide-icons/lucide-icons";
import { useEffect, useRef, useState } from "react";
import { CreateWorkspaceBackup, RestoreWorkspaceBackup } from "../../folder-local-storage/workspace-storage";
import { ValidateWorkspaceBackup } from "../../folder-local-storage/workspace-backup";
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
    const [pendingBackup, setPendingBackup] = useState(null);
    const [backupDownloaded, setBackupDownloaded] = useState(false);
    const dialogRef = useRef(null);
    useEffect(() => {
        if (pendingBackup) {
            dialogRef.current.showModal();
        }
    }, [pendingBackup]);
    function CancelRestore() {
        dialogRef.current.close();
        setPendingBackup(null);
        setBackupDownloaded(false);
    }
    function SaveCurrentBackup() {
        try {
            DownloadWorkspaceBackup();
            setBackupDownloaded(true);
        } catch (error) {
            window.alert("The current workspace could not be backed up. " + error.message);
        }
    }
    function ConfirmRestore() {
        if (!pendingBackup) {
            return;
        }
        try {
            const restoredDocuments = RestoreWorkspaceBackup(pendingBackup);
            onRestore(restoredDocuments);
            CancelRestore();
        } catch (error) {
            window.alert(error.message || "This backup file could not be restored.");
        }
    }
    function RestoreFromFile(event) {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const backup = JSON.parse(reader.result);
                ValidateWorkspaceBackup(backup);
                setBackupDownloaded(false);
                setPendingBackup(backup);
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
        <>
            <div className="workspace-backup-actions">
                <button type="button" onClick={SaveCurrentBackup}>
                    <Icons.DownloadLucideIcon className="workspace-icons" /> Backup workspace (.json)
                </button>
                <button type="button" onClick={() => inputRef.current?.click()}>
                    <Icons.UploadLucideIcon className="workspace-icons" /> Restore backup
                </button>
                <input ref={inputRef} type="file" accept="application/json,.json" onChange={RestoreFromFile} hidden />
            </div>
            <dialog
                className="workspace-restore-dialog"
                ref={dialogRef}
                onCancel={CancelRestore}
                aria-labelledby="restore-backup-title"
            >
                <h2 id="restore-backup-title">Replace current documents?</h2>
                <p>
                    This will replace every document in this browser, including favorites and trash, with the selected
                    backup.
                </p>
                <p>
                    Documents missing from that backup will be removed. Download a backup of your current workspace
                    first if you want to keep them.
                </p>
                {pendingBackup && <p>The selected backup contains {pendingBackup.documents.length} documents.</p>}
                {backupDownloaded && (
                    <p role="status">
                        Backup download started. Check that the file is saved before replacing your documents.
                    </p>
                )}
                <div className="workspace-restore-buttons">
                    <button type="button" autoFocus onClick={CancelRestore}>
                        Cancel
                    </button>
                    <button type="button" onClick={SaveCurrentBackup}>
                        Download current backup
                    </button>
                    <button type="button" className="workspace-restore-confirm" onClick={ConfirmRestore}>
                        Replace documents
                    </button>
                </div>
            </dialog>
        </>
    );
}
export default WorkspaceBackupActions;

# MyPrimeCV

A React app for creating CVs and motivation letters. Documents are saved in the browser. You can download a PDF or save a JSON backup.

## Run locally

Install Node.js, open this folder in a terminal, and run:

```sh
npm install
npm run dev
```

Open the address shown in the terminal.

To check the production build:

```sh
npm run build
npm run preview
```

## Where to edit

- `src/App.jsx` selects the page from the URL.
- `src/pages/folder-cv-templates/templates` contains each CV design and its CSS.
- `src/pages/folder-create-cv` contains the CV forms, data and save actions.
- `src/pages/folder-create-motivation-letter` contains the letter form and preview.
- `src/pages/folder-storage` contains the workspace, favorites and trash pages.
- `src/pages/folder-local-storage` reads, saves and checks document backups.
- `src/components/folder-document-preview` handles A4 pages and PDF export.

Meadow, Atlas, North, Linen, Studio and Ribbon have working editors. The other gallery designs are previews.

## Code style

Use direct JSX, short functions and clear names. Write fields and buttons directly in their form. Repeated markup is fine. Keep component inputs at the page, editor and preview boundaries.

Use classes that name the part they style, such as `letter-editor-sidebar` or `create-cv-field-grid`. Keep CSS rules flat, with ordinary values and explicit spacing classes. Avoid CSS comments, CSS variables and positional or sibling selectors.

## Try a backup

Use **Restore backup** in the workspace to load a workspace JSON file. Use **Import** in a CV editor to load CV data into the selected template.

Restore replaces the documents in that browser. Use a separate browser profile when testing with sample data.

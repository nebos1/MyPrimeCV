import { readFile, writeFile, mkdir } from "node:fs/promises";
import { PageMetadata, GetPageMetadata } from "../src/page-metadata.mjs";

// Give each route its own metadata before the browser runs React.
const template = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
function EscapeHtml(value) {
    return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

for (const path of Object.keys(PageMetadata)) {
    const page = GetPageMetadata(path);
    let html = template.replace(/<title>.*?<\/title>/, `<title>${EscapeHtml(page.title)}</title>`);
    const tags = {
        description: page.description,
        robots: page.robots,
        "og:title": page.title,
        "og:description": page.description,
        "og:url": page.canonical,
        "twitter:title": page.title,
        "twitter:description": page.description,
    };
    for (const [name, value] of Object.entries(tags)) {
        html = html.replace(new RegExp(`(<meta (?:name|property)="${name}" content=")[^"]*(")`), `$1${EscapeHtml(value)}$2`);
    }
    html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${EscapeHtml(page.canonical)}$2`);
    const directory = new URL(`../dist${path === "/" ? "" : path}/`, import.meta.url);
    await mkdir(directory, { recursive: true });
    await writeFile(new URL("index.html", directory), html);
}

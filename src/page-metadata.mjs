export const SiteUrl = "https://myprimecv.com";

export const PageMetadata = {
    "/": {
        title: "MyPrimeCV | Free CV and Motivation Letter Builder",
        description: "Create professional CVs and motivation letters for free. Choose a template, edit with a live preview, and download your PDF. No registration or watermarks.",
        index: true,
    },
    "/cv-templates": {
        title: "Free CV Templates | MyPrimeCV",
        description: "Explore MyPrimeCV templates, choose a layout for your resume, and customize your CV with a live preview. Download your finished CV as a PDF for free.",
        index: true,
    },
    "/workspace": { title: "My Workspace | MyPrimeCV" },
    "/dashboard": { title: "My Workspace | MyPrimeCV" },
    "/favorites": { title: "Favorites | MyPrimeCV" },
    "/resumes": { title: "My CVs | MyPrimeCV" },
    "/motivation-letters": { title: "My Motivation Letters | MyPrimeCV" },
    "/trash": { title: "Trash | MyPrimeCV" },
    "/create-cv": { title: "CV Editor | MyPrimeCV" },
    "/create-motivation-letter": { title: "Motivation Letter Editor | MyPrimeCV" },
};

export function GetPageMetadata(pathname, hash = "") {
    const workspaceHashes = ["#dashboard", "#favorites", "#resumes", "#motivation-letters", "#trash"];
    let path = pathname.replace(/\/+$/, "") || "/";
    if (workspaceHashes.includes(hash)) path = "/" + hash.slice(1);
    const page = PageMetadata[path] || { title: "Page Not Found | MyPrimeCV" };
    return {
        title: page.title,
        description: page.description || "Create and manage your CVs and motivation letters in your browser with MyPrimeCV.",
        robots: page.index ? "index, follow, max-image-preview:large" : "noindex, follow",
        canonical: SiteUrl + (path === "/dashboard" ? "/workspace" : path),
    };
}

export function ApplyPageMetadata() {
    const page = GetPageMetadata(window.location.pathname, window.location.hash);
    document.title = page.title;
    document.querySelector('link[rel="canonical"]').href = page.canonical;
    for (const [selector, value] of [
        ['meta[name="description"]', page.description],
        ['meta[name="robots"]', page.robots],
        ['meta[property="og:title"]', page.title],
        ['meta[property="og:description"]', page.description],
        ['meta[property="og:url"]', page.canonical],
        ['meta[name="twitter:title"]', page.title],
        ['meta[name="twitter:description"]', page.description],
    ]) {
        document.querySelector(selector).content = value;
    }
}

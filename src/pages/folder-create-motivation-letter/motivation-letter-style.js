export function CreateDefaultStyle() {
    return {
        bold: false,
        italic: false,
        underline: false,
        fontFamily: "Arial",
        listStyle: "none",
        size: 100,
        color: {
            r: 24,
            g: 37,
            b: 40,
        },
    };
}

export function MakeTextStyle(style) {
    let fontFallback;
    if (style.fontFamily === "Times New Roman" || style.fontFamily === "Garamond") {
        fontFallback = "serif";
    } else {
        fontFallback = "sans-serif";
    }

    let fontStyle;
    if (style.italic) {
        fontStyle = "italic";
    } else {
        fontStyle = "normal";
    }

    let fontWeight;
    if (style.bold) {
        fontWeight = 800;
    } else {
        fontWeight = 400;
    }

    let textDecoration;
    if (style.underline) {
        textDecoration = "underline";
    } else {
        textDecoration = "none";
    }

    return {
        color: `rgb(${style.color.r}, ${style.color.g}, ${style.color.b})`,
        fontFamily: `${style.fontFamily}, ${fontFallback}`,
        fontSize: `${style.size}%`,
        fontStyle,
        fontWeight,
        textDecoration,
    };
}

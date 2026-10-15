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
    let fontFamily;
    if (style.fontFamily === "Times New Roman" || style.fontFamily === "Garamond" || style.fontFamily === "Georgia") {
        fontFamily = '"MyPrimeCV Serif", serif';
    } else {
        fontFamily = '"MyPrimeCV Sans", sans-serif';
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
        fontFamily: fontFamily,
        fontSize: `${style.size}%`,
        fontStyle,
        fontWeight,
        textDecoration,
    };
}

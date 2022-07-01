export const stringToCapital = (text: string) => {
    if (text && text.length > 1) {
        text = text
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()
            .split(" ")
            .map((el: string) => {
                return el?.charAt(0).toUpperCase() + el?.slice(1);
            })
            .join(" ");
        return text;
    }
    return text;
};

export const convertToCoordinates = (num: string) => {
    return num.indexOf('.') >= 0 ? num : `${num}.0`
}
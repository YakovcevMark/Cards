export const stringLengthHandler = (name: string) => {
    return name.length > 23 ? name.substring(0, 23).concat("...") : name;
}
export const camelize = (s: string) => {
    return s.toLowerCase()
        .replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
}
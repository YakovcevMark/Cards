export const camelize = (s: string) => {
    return s.toLowerCase()
        .replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
}
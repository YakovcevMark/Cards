export const handleStringLength = (name: string) => {
    return name.length > 23 ? name.substring(0, 23).concat("...") : name;
}
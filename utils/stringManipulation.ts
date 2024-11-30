export function capitalizeFirstLetter(str: string) {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function cleanTitleForURL(title: string) {
    return title
        .toLowerCase() // Convert to lowercase for uniformity
        .replace(/['"“”‘’]/g, '') // Remove single and double quotes
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^a-z0-9\-]/g, '') // Remove non-alphanumeric characters except hyphens
        .replace(/--+/g, '-') // Remove consecutive hyphens
        .replace(/^-+/, '') // Remove leading hyphen
        .replace(/-+$/, ''); // Remove trailing hyphen
}
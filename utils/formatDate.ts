// export function formatDate(inputDate: string | Date): string {
//     const date = new Date(inputDate);
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     const year = date.getFullYear().toString();

//     return `${month}/${day}/${year}`;
// }

export function formatDate(date: Date | undefined): string {
    if (!date) return ''; // Return an empty string if date is undefined

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
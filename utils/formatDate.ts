// export function formatDate(inputDate: string | Date): string {
//     const date = new Date(inputDate);
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     const year = date.getFullYear().toString();

//     return `${month}/${day}/${year}`;
// }

export function formatDate(date: Date | undefined): string {
    // if (!date) return ''; // Return an empty string if date is undefined

    // return date.toLocaleDateString('en-US', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    // });
    if (!date) return ''; // Return an empty string if date is undefined

    const newDate = new Date(date)
    const year = newDate.getFullYear();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[newDate.getMonth()]; // Get month name from the array
    const day = newDate.getDate();

    return `${month} ${day}, ${year}`;
}
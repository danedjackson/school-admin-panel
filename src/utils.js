export const capitalizeFirstLetter = (msg) => {
    if (msg.length === 0) {
        return msg[0].toUpperCase();
    }
    
    const firstLetter = msg[0].toUpperCase();
    const restOfTheString = msg.slice(1);
    
    return `${firstLetter}${restOfTheString}`;
}
export function getImages(context) {
    return context.keys().map(context);
}

export function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
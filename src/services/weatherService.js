export function getInfo(url, resolve, reject) {
    fetch(url)
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch(reject);
}
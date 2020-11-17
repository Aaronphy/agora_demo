function getQueryString(name: string) {
    let result = location.search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'));
    if (result == null || result.length < 1) {
        return '';
    }
    return result[1];
}

export { getQueryString };

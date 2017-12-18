export function createContentPreview(queryText, content) {
    let sanitizedContent = content
        .replace(new RegExp('(<([^>]+)>)', 'ig'), ' ')
        .replace(new RegExp('(<pre>[\\s\\S]*?</pre>)', 'ig'), '')
        .toLowerCase()
    ;
    let wordIndex = sanitizedContent
        .indexOf(queryText.toLowerCase())
    ;
    if (wordIndex < 53) {
        return null;
    }

    let trimmedContent = sanitizedContent
        .slice(
            wordIndex - 50,
            wordIndex + 50
        )
    ;

    return highlightString( queryText, '...' + trimmedContent + '...');
}

export function highlightString(currentQueryText, string) {
    let regex = new RegExp(`(${currentQueryText})`, 'gi');
    let highlightedSuggestion = string.replace(regex, "<em>$1</em>");
    let sanitizedSpaces = highlightedSuggestion.split(' ');

    return sanitizedSpaces.join('&nbsp;');
}
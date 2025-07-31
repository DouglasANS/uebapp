export function formatarPrimeiraPalavra(texto) {
    if (typeof texto !== 'string' || !texto.trim()) {
        return '';
    }

    const primeiraPalavra = texto.trim().split(/\s+/)[0];

    if (!primeiraPalavra) {
        return '';
    }

    return (
        primeiraPalavra.charAt(0).toUpperCase() +
        primeiraPalavra.slice(1).toLowerCase()
    );
}

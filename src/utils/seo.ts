export function getRotatingTitle(baseTitle: string, type: 'match' | 'hub' | 'brand'): string {
    const suffixes = [
        'EN VIVO',
        'GRATIS',
        'HOY',
        'SIN REGISTRO',
        'ONLINE HD',
        'PIRLO TV',
        'TARJETA ROJA'
    ];

    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % suffixes.length;
    const suffix = suffixes[index];

    if (type === 'match') {
        return `${baseTitle} ${suffix} - Roja Directa`;
    }

    return `${baseTitle} - ${suffix}`;
}

export interface Match {
    title: string;
    time: string;
    league: string;
    channels: { name: string; url: string }[];
    id: string;
    slug: string;
    isLive: boolean;
    timestamp: number;
}

function customSlugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export async function getMatches(): Promise<Match[]> {
    const response = await fetch('https://raw.githubusercontent.com/albinchristo04/blogger-autopost/refs/heads/main/rojadirecta_events.json');
    const root = await response.json();
    const data = root.events || [];

    return data.map((item: any) => {
        const title = item.description || 'Partido sin título';
        const league = item.country || 'Varios';
        const slug = customSlugify(title);

        // Parse time and date
        const [hours, minutes] = item.time.split(':').map(Number);
        const [year, month, day] = item.date.split('-').map(Number);
        const matchDate = new Date(year, month - 1, day, hours, minutes);

        const now = new Date();
        const isLive = Math.abs(now.getTime() - matchDate.getTime()) < 2 * 60 * 60 * 1000; // Within 2 hours

        return {
            id: item.id.toString(),
            title,
            time: item.time.substring(0, 5),
            league,
            channels: item.channels || [],
            slug,
            isLive,
            timestamp: matchDate.getTime()
        };
    });
}

export function groupMatchesByLeague(matches: Match[]) {
    return matches.reduce((acc, match) => {
        if (!acc[match.league]) {
            acc[match.league] = [];
        }
        acc[match.league].push(match);
        return acc;
    }, {} as Record<string, Match[]>);
}

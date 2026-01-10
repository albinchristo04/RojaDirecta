import { getMatches } from './src/utils/data.js';

async function test() {
    try {
        const matches = await getMatches();
        console.log('Matches found:', matches.length);
        if (matches.length > 0) {
            console.log('First match slug:', matches[0].slug);
        }
    } catch (e) {
        console.error('Error fetching matches:', e);
    }
}

test();

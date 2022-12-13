import db from '../db.js';
const genres = [
    { name: 'romance', description: 'will they, or wont they meet cute?' },
    { name: 'horror', description: 'stories that go bump in the night' },
    { name: 'sci-fi', description: 'lasers, space ships, aliens and our descendants simulating us on their powerful computers.' },
    { name: 'fantasy', description: 'the only limit is your mind.' },
    { name: 'dystopian', description: 'a guilty pleasure for pessimists.' },
    { name: 'thriller', description: 'pure, textual adrenaline.' },
    { name: 'lgbtq+', description: 'because these stories deserves as much airplay as everything else.' },
    { name: 'historical fiction', description: 'abraham lincoln versus vampires, anyone?' },
    { name: 'young adult', description: 'and now, there are no faults in our stars. or something like that. abnegation?' },
    { name: 'fiction for children', description: 'the mind of a child is the cauldron of infinite worlds.' },
    { name: 'adventure', description: 'it begins, obviously, with a literal phone call. from someone named ad. ad venture.' },
    { name: 'detective & mystery', description: 'elementary, my dear holmes!' },
];
genres.forEach(genre => {
    db.run(`INSERT OR IGNORE INTO genres (name, description) VALUES('${genre.name}', '${genre.description}')`, function (error) {
        if (error)
            throw new Error(error.message);
        else {
            console.log(`Inserted new genre ${genre.name} with id: ${this.lastID}`);
        }
    });
});
//# sourceMappingURL=genreSeed.js.map
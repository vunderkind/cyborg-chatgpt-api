import db from '../db.js';
const genres = [
    { name: 'romance', description: 'will they, or wont they meet cute?' },
    { name: 'horror', description: 'stories that go bump in the night' },
    { name: 'sci-fi', description: 'lasers, space ships, aliens and our descendants simulating us on their powerful computers.' },
];
genres.forEach(genre => {
    db.run(`INSERT OR IGNORE INTO genres (name, description) VALUES('${genre.name}', '${genre.description}')`, function (error) {
        console.log(error);
    });
});
//# sourceMappingURL=genreSeed.js.map
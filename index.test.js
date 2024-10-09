const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        const band = await Band.create({ name: 'The Beatles', genre: 'Rock' });
        expect(band.name).toBe('The Beatles');
        expect(band.genre).toBe('Rock');
    })

    test('can create a Musician', async () => {
        const musician = await Musician.create({ name: 'John Lennon', instrument: 'Guitar' });
        expect(musician.name).toBe('John Lennon');
        expect(musician.instrument).toBe('Guitar');
    })

    test('can create a Song', async () => {
        const song = await Song.create({ title: 'Hey Jude', year: 1968, length: 431 });
        expect(song.title).toBe('Hey Jude');
        expect(song.year).toBe(1968);
        expect(song.length).toBe(431);
    })

    test('can update a Band', async () => {
        const band = await Band.create({ name: 'The Rolling Stones', genre: 'Rock' });
        await band.update({ genre: 'Rock and Roll' });
        expect(band.genre).toBe('Rock and Roll');
    })

    test('can update a Musician', async () => {
        const musician = await Musician.create({ name: 'Paul McCartney', instrument: 'Bass' });
        await musician.update({ instrument: 'Bass Guitar' });
        expect(musician.instrument).toBe('Bass Guitar');
    })

    test('can update a Song', async () => {
        const song = await Song.create({ title: 'Yesterday', year: 1965, length: 125 });
        await song.update({ year: 1966 });
        expect(song.year).toBe(1966);
    })

    test('can delete a Band', async () => {
        const band = await Band.create({ name: 'Queen', genre: 'Rock' });
        await band.destroy();
        const foundBand = await Band.findOne({ where: { name: 'Queen' } });
        expect(foundBand).toBeNull();
    })

    test('can delete a Musician', async () => {
        const musician = await Musician.create({ name: 'Freddie Mercury', instrument: 'Vocals' });
        await musician.destroy();
        const foundMusician = await Musician.findOne({ where: { name: 'Freddie Mercury' } });
        expect(foundMusician).toBeNull();
    })

    test('can delete a Song', async () => {
        const song = await Song.create({ title: 'Bohemian Rhapsody', year: 1975, length: 355 });
        await song.destroy();
        const foundSong = await Song.findOne({ where: { title: 'Bohemian Rhapsody' } });
        expect(foundSong).toBeNull();
    })
})
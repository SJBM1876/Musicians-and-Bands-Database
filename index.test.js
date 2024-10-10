const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
    beforeAll(async () => {
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

    test('can associate Band and Song', async () => {
        // Create bands
        const band1 = await Band.create({ name: 'The Beatles', genre: 'Rock' });
        const band2 = await Band.create({ name: 'Queen', genre: 'Rock' });

        // Create songs
        const song1 = await Song.create({ title: 'Hey Jude', year: 1968, length: 431 });
        const song2 = await Song.create({ title: 'Bohemian Rhapsody', year: 1975, length: 355 });

        // Associate songs with bands
        await band1.addSong(song1);
        await band1.addSong(song2);
        await band2.addSong(song2);

        // Check associations for band1 (The Beatles)
        const beatlesSongs = await band1.getSongs();
        expect(beatlesSongs.length).toBe(2);
        expect(beatlesSongs.map(s => s.title).sort()).toEqual(['Hey Jude', 'Bohemian Rhapsody'].sort());

        // Check associations for band2 (Queen)
        const queenSongs = await band2.getSongs();
        expect(queenSongs.length).toBe(1);
        expect(queenSongs[0].title).toBe('Bohemian Rhapsody');

        // Check associations for song2 (Bohemian Rhapsody)
        const bohemianRhapsodyBands = await song2.getBands();
        expect(bohemianRhapsodyBands.length).toBe(2);
        expect(bohemianRhapsodyBands.map(b => b.name).sort()).toEqual(['The Beatles', 'Queen'].sort());
    });

    test('can add multiple musicians to a band', async () => {
        // Create a band
        const band = await Band.create({ name: 'Led Zeppelin', genre: 'Rock' });

        // Create musicians
        const musician1 = await Musician.create({ name: 'Robert Plant', instrument: 'Vocals' });
        const musician2 = await Musician.create({ name: 'Jimmy Page', instrument: 'Guitar' });
        const musician3 = await Musician.create({ name: 'John Bonham', instrument: 'Drums' });

        // Add musicians to the band
        await band.addMusicians([musician1, musician2, musician3]);

        // Check that musicians were added correctly
        const bandMusicians = await band.getMusicians();
        expect(bandMusicians.length).toBe(3);
        expect(bandMusicians.map(m => m.name).sort()).toEqual(['Robert Plant', 'Jimmy Page', 'John Bonham'].sort());

        // Create songs
        const song1 = await Song.create({ title: 'Stairway to Heaven', year: 1971, length: 482 });
        const song2 = await Song.create({ title: 'Kashmir', year: 1975, length: 508 });

        // Add songs to the band
        await band.addSongs([song1, song2]);

        // Check that songs were added correctly
        const bandSongs = await band.getSongs();
        expect(bandSongs.length).toBe(2);
        expect(bandSongs.map(s => s.title).sort()).toEqual(['Stairway to Heaven', 'Kashmir'].sort());
    });
})
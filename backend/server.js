import express from 'express';
import { pool } from '../db/connect.js';

const db = pool();
const port = 3002;
const server = express();
server.use(express.static('frontend'));
server.use(onEachRequest);
server.get('/api/artist/:id', onGetArtistById);
server.get('/api/albumsByReleaseDate', onGetAlbumsByReleaseDate);
server.get('/api/artist/:artist/albums', onGetAlbumsForArtist);
server.get('/api/album/:album/tracks', onGetTracksForAlbum);
server.get('/api/artist/:artist/tracks', onGetTracksForArtist);
server.get('/api/artist/:artist/tracksWithGenre', onGetTracksWithGenreForArtist);
server.get('/api/playlist/:playlist/nationality/:nationality/mediaTypes', onGetMediaTypesForPlaylistAndNationality);
server.get('/api/user/:user/genre/:genre/nationalities', onGetNationalitiesForUserAndGenre);
server.get('/api/albumCountByArtist', onGetAlbumCountByArtist);
server.listen(port, onServerReady);

async function onGetAlbumCountByArtist(request, response) {
    const limit = request.query.limit;
    const dbResult = await db.query(`
        select   stage_name, count(*) as album_count
        from     artists
        join     albums using (artist_id)
        group by stage_name
        order by album_count desc
        limit    $1`, [limit]);
    response.json(dbResult.rows);
}

function onServerReady() {
    console.log('Webserver running on port', port);
}

function onEachRequest(request, response, next) {
    console.log(new Date(), request.method, request.url);
    next();
}
import { v4 as uuidv4 } from 'uuid';

const loadAnimeCollection = () => {
    const rawAnimeCollection = localStorage.getItem('anime-collection');
    const animeCollection = rawAnimeCollection ? JSON.parse(rawAnimeCollection) : [];

    return animeCollection;
}

const createCollection = (collection, collectionName: string) => {
    collection.push(
        {
            key: uuidv4(),
            label: collectionName,
            animes: []
        }
    )

    localStorage.setItem('anime-collection', JSON.stringify(collection));
}

const addAnime = (animeID: number, collectionID: string) => {
    const myAnimeRaw = localStorage.getItem('anime-collection');
    const storedAnimes = myAnimeRaw ? JSON.parse(myAnimeRaw) : [];

    const selectedCollection = storedAnimes.find(item => item.key === collectionID)
    const selectedArray = selectedCollection.animes

    if (!selectedArray.includes(animeID)) {
        selectedArray.push(animeID)
        localStorage.setItem('anime-collection', JSON.stringify(storedAnimes));
    } else {
        console.log("Anime ID exists");
    }
};

const removeAnime = (animeID: number, collectionID: string) => {
    const myAnimeRaw = localStorage.getItem('anime-collection');
    const storedAnimes = myAnimeRaw ? JSON.parse(myAnimeRaw) : [];

    const selectedCollection = storedAnimes.find(item => item.key === collectionID)
    const selectedArray = selectedCollection.animes;

    const selectedAnimeIndex = selectedArray.indexOf(animeID);
    selectedArray.splice(selectedAnimeIndex, 1);
    
    localStorage.setItem('anime-collection', JSON.stringify(storedAnimes));
};

export { loadAnimeCollection, createCollection, removeAnime, addAnime };  
import { v4 as uuidv4 } from 'uuid';

const loadAnimeCollection = () => {
    const rawAnimeCollection = localStorage.getItem('anime-collection');
    const animeCollection = rawAnimeCollection ? JSON.parse(rawAnimeCollection) : [];

    return animeCollection;
}

const createCollection = (collection, collectionName: string) => {
    const isCollectionNameExist = collection.some(item => item.label === collectionName);

    if (!isCollectionNameExist) {
        collection.push(
            {
                key: uuidv4(),
                label: collectionName,
                animes: []
            }
        )

        localStorage.setItem('anime-collection', JSON.stringify(collection));

        return { "response": 0, "msg": null }
    } else {
        return { "response": -1, "msg": `Collection ${collectionName} is already exist.` };
    }
}

const addAnime = (animeID: number, collectionID: string) => {
    const myAnimeRaw = localStorage.getItem('anime-collection');
    const storedAnimes = myAnimeRaw ? JSON.parse(myAnimeRaw) : [];

    const selectedCollection = storedAnimes.find(item => item.key === collectionID)
    const selectedArray = selectedCollection.animes

    if (!selectedArray.includes(animeID)) {
        selectedArray.push(animeID)
        localStorage.setItem('anime-collection', JSON.stringify(storedAnimes));

        return { "response": 0, "msg": null }
    } else {
        return { "response": -1, "msg": `Anime already exist on ${selectedCollection.label}.` };
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
// only 100 character fetched at 1 time and api not working for fetching through name So looping and fetching all and stored in data.json
const axios = require("axios");
const fs = require("fs/promises");
const md5 = require("md5");

const fetchAllCharacters = async () => {
  const allCharacters: any = [];
  let offset = 0;
  const limit = 100;

  try {
    while (true) {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?ts=1707322660300&apikey=231f022c73683d147e236bc7b08b0e2e&hash=96b67778bff155dde9b3925272711297&limit=${limit}&offset=${offset}`
      );
      const data = response.data.data.results;

      data.forEach((character: any) => {
        const { id, name, description, thumbnail } = character;
        allCharacters.push({ id, name, description, thumbnail: thumbnail });
      });

      offset += limit;

      if (data.length < limit) break;
    }

    return allCharacters;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

const saveDataToFile = async (data: object, fileName: string) => {
  try {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${fileName}`);
  } catch (error) {
    console.error("Error saving data to file:", error);
  }
};

(async () => {
  const characters = await fetchAllCharacters();
  await saveDataToFile(characters, "data.json");
})();

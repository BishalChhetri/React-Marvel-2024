import axios from "axios";
import md5 from "md5";

interface getAllCharactersApiProps {
  characterId: string;
}

const getSingleCharacterApi = async ({
  characterId,
}: getAllCharactersApiProps): Promise<any> => {
  const url = process.env.MARVEL_URL;
  const publicKey = process.env.MARVEL_PUBLIC_KEY;
  const timestamp = new Date().getTime();

  let URL = "";
  let hash = "";

  if (publicKey && process.env.MARVEL_PRIVATE_KEY) {
    hash = md5(timestamp + process.env.MARVEL_PRIVATE_KEY + publicKey);
  }

  URL = `${url}/${characterId}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

  try {
    const result = await axios.get(URL);
    if (result) {
      return result;
    }
  } catch (error: any) {
    return {
      APIFailed: true,
      error: error.response,
    };
  }
};

export default getSingleCharacterApi;

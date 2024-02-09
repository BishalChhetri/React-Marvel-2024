import md5 from "md5";
import axios from "axios";
import { getFilterCharacterApi } from "./getFilterCharacterApi";

interface getApiResponseProps {
  limit?: number;
  offset?: number;
  nameStartWith?: string;
}

const getApiResponse = async ({
  limit = 20,
  offset = 0,
  nameStartWith,
}: getApiResponseProps): Promise<any> => {
  const url = process.env.MARVEL_URL;
  const publicKey = process.env.MARVEL_PUBLIC_KEY;
  const timestamp = new Date().getTime();

  let URL = "";
  let hash = "";

  if (publicKey && process.env.MARVEL_PRIVATE_KEY) {
    hash = md5(timestamp + process.env.MARVEL_PRIVATE_KEY + publicKey);
  }

  if (nameStartWith && nameStartWith.length > 0) {
    const response = await getFilterCharacterApi(nameStartWith, limit, offset);
    return response;
  } else {
    URL = `${url}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
  }

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

export default getApiResponse;

import data from "../data.json";
import { Character, ApiResponse } from "../types/type";

export function getFilterCharacterApi(
  nameStartWith: string,
  limit: number,
  offset: number
): any {
  const filteredCharacters = data.filter((character) =>
    character.name.toLowerCase().startsWith(nameStartWith.toLowerCase())
  );

  const startIndex = offset;
  const endIndex = Math.min(startIndex + limit, filteredCharacters.length);

  const results = filteredCharacters.slice(startIndex, endIndex);

  return {
    status: 200,
    data: {
      code: 200,
      data: {
        offset: startIndex,
        limit: limit,
        total: filteredCharacters.length,
        count: results.length,
        results: results,
      },
    },
  };
}

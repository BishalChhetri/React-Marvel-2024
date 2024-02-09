import React from "react";
import getApiResponse from ".";

interface getAllCharactersApiProps {
  limit?: number;
  offset?: number;
  nameStartWith?: string;
}

const getAllCharactersApi = async ({
  limit,
  offset,
  nameStartWith,
}: getAllCharactersApiProps): Promise<any> => {
  const response = await getApiResponse({ limit, offset, nameStartWith });

  if (response.APIFailed) return null;
  return response;
};

export default getAllCharactersApi;

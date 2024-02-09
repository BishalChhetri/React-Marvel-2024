import getSingleCharacterApi from "../api/getSingleCharacterApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import CharacterComp from "../components/CharacterComp";

const Character = () => {
  const { characterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [characterData, setCharacterData] = useState([]);

  const fetchData = async () => {
    if (!characterId) return;
    const response = await getSingleCharacterApi({ characterId });
    if (response && response.status === 200) {
      setCharacterData(response?.data?.data?.results);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [characterId]);

  return (
    <div>
      {isLoading ? (
        <div className="h-[90vh] flex flex-col justify-center items-center">
          <PuffLoader size={50} color="red" />
        </div>
      ) : (
        <CharacterComp data={characterData} />
      )}
    </div>
  );
};

export default Character;

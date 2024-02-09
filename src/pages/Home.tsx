import React, { useEffect, useState } from "react";
import DataTableBase from "../reusable/DataTableBase";
import getAllCharactersApi from "../api/getAllCharactersApi";
import { ApiResponse } from "../types/type.d";
import useDebounce from "../hooks/useDebounce";
import { Filter } from "../types/type.d";

const Home = () => {
  const [data, setData] = useState<ApiResponse>({
    offset: 0,
    limit: 0,
    total: 0,
    count: 0,
    results: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchCharacter, setSearchCharacter] = useState<string>();
  const searchByCharacter = useDebounce(searchCharacter, 1000);
  const [filter, setFilter] = useState<Filter>({ page: 1, rowsPerPage: 20 });

  const responseData = async () => {
    const response = await getAllCharactersApi({
      limit: filter.rowsPerPage,
      offset: filter.page ? (filter.page - 1) * filter.rowsPerPage : 0,
      nameStartWith: searchByCharacter ? searchByCharacter : "",
    });

    if (response && response.status === 200) {
      setData(response?.data?.data);
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page) {
      setFilter((prev) => ({ ...prev, page }));
    }
  };

  const handleRowsPageChange = (currentRowsPerPage: number) => {
    if (currentRowsPerPage) {
      setFilter((prev) => ({ ...prev, rowsPerPage: currentRowsPerPage }));
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCharacter(event.target.value);
    setFilter({ page: 1, rowsPerPage: 20 });
  };

  useEffect(() => {
    responseData();
  }, [searchByCharacter, filter]);

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pb-20 pt-28">
      <DataTableBase
        data={data}
        progressPending={isLoading}
        handlePageChange={handlePageChange}
        handleRowsPageChange={handleRowsPageChange}
        handleSearchChange={handleSearchChange}
        currentPage={filter.page}
      />
    </div>
  );
};

export default Home;

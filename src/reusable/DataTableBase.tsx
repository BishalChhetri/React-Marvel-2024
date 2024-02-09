import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { PuffLoader } from "react-spinners";
import { ApiResponse } from "../types/type.d";
import { columns } from "./TableColumns";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

interface DataTableBaseProps {
  data: ApiResponse;
  progressPending: boolean;
  handlePageChange: (page: number) => void;
  handleRowsPageChange: (currentRowsPerPage: number) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentPage: number;
}

const DataTableBase: React.FC<DataTableBaseProps> = ({
  data,
  progressPending,
  handlePageChange,
  handleRowsPageChange,
  handleSearchChange,
  currentPage,
}) => {
  const navigate = useNavigate();

  const tableCustomStyles = {
    headCells: {
      style: {
        color: "white",
        fontSize: "15px",
        backgroundColor: "black",
      },
    },
    subHeader: {
      style: {
        margin: 0,
        padding: 0,
      },
    },
  };

  const handlePaginationChange = (selectedPage: number) => {
    handlePageChange(selectedPage);
  };

  const CustomPagination = () => {
    return (
      <Pagination
        data={data}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
      />
    );
  };
  return (
    <div className="max-h-[65vh] pe-2">
      <DataTable
        className="cursor-pointer mb-1"
        customStyles={tableCustomStyles}
        columns={columns}
        data={data?.results}
        progressPending={progressPending}
        fixedHeader
        fixedHeaderScrollHeight="65vh"
        progressComponent={
          <div className="h-[65vh] flex flex-col justify-center items-center">
            <PuffLoader size={50} color="red" />
          </div>
        }
        onRowClicked={(row) => navigate(`/${row?.id}`)}
        pagination
        paginationServer
        paginationPerPage={20}
        paginationComponent={CustomPagination}
        // paginationTotalRows={data?.total}
        // paginationComponentOptions={{ rowsPerPageText: "" }}
        // paginationRowsPerPageOptions={[20, 40, 60]}
        // onChangePage={handlePageChange}
        // onChangeRowsPerPage={handleRowsPageChange}
        subHeader
        highlightOnHover
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search by Character name"
            className={`peer ps-2 py-1 pe-0 pt-1 font-light bg-white border-2 rounded-md outline-none transition me-0 md:w-1/3 lg:w-1/3`}
            onChange={handleSearchChange}
          />
        }
      />
    </div>
  );
};

export default DataTableBase;

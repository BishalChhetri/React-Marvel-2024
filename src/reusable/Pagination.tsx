import React from "react";
import ReactPaginate from "react-paginate";
import { ApiResponse, PageChangeEventData } from "../types/type.d";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface PaginationProps {
  data: ApiResponse;
  handlePaginationChange: (page: number) => void;
  currentPage: number;
}
const Pagination: React.FC<PaginationProps> = ({
  data,
  handlePaginationChange,
  currentPage,
}) => {
  return (
    <ReactPaginate
      activeClassName={"item active"}
      breakClassName={"item break-me "}
      breakLabel={"..."}
      containerClassName={"pagination"}
      disabledClassName={"disabled-page"}
      marginPagesDisplayed={1}
      nextClassName={"item next "}
      forcePage={currentPage - 1}
      nextLabel={
        currentPage !== Math.ceil(data.total / 20) && (
          <IoIosArrowForward size={25} />
        )
      }
      previousLabel={currentPage !== 1 && <IoIosArrowBack size={25} />}
      onPageChange={(event: PageChangeEventData) =>
        handlePaginationChange(event.selected + 1)
      }
      pageCount={Math.ceil(data.total / 20)}
      pageClassName={"item pagination-page "}
      pageRangeDisplayed={2}
      previousClassName={"item previous"}
    />
  );
};

export default Pagination;

import React from "react";
import { TableColumn } from "../types/type";
import { useNavigate } from "react-router-dom";

export const columns: TableColumn[] = [
  {
    name: <b>Id</b>,
    selector: (row: any) => row.id,
    width: "100px",
    sortable: true,
    cell: (row: any) => {
      const navigate = useNavigate();
      return (
        <div
          className="flex text-start"
          onClick={() => {
            navigate(`/${row.id}`);
          }}
        >
          {row.id}
        </div>
      );
    },
  },
  {
    name: <b>Thumbnails</b>,
    selector: (row: any) => row.id,
    width: "118px",
    cell: (row: any) => {
      const navigate = useNavigate();
      return (
        <div
          className="flex justify-center"
          onClick={() => navigate(`/${row.id}`)}
        >
          <img
            src={row.thumbnail.path + "." + row.thumbnail.extension}
            height={40}
            width={40}
          />
        </div>
      );
    },
  },
  {
    name: <b>Name</b>,
    selector: (row: any) => row.id,
    sortable: true,
    cell: (row: any) => {
      const navigate = useNavigate();
      return <div onClick={() => navigate(`/${row.id}`)}>{row.name}</div>;
    },
  },
  {
    name: <b>Descriptions</b>,
    selector: (row: any) => row.id,
    cell: (row: any) => {
      const navigate = useNavigate();
      return (
        <div className="py-1" onClick={() => navigate(`/${row.id}`)}>
          {row.description || "No description"}
        </div>
      );
    },
  },
];

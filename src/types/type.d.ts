import { Selector } from "react-data-table-component";

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface ApiResponse {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Character[];
}

export interface TableColumn {
  name: string | JSX.Element;
  selector?: Selector<object>;
  width?: string;
  sortable?: boolean;
  cell?: (row: any) => JSX.Element;
}

export type Filter = {
  page: number;
  rowsPerPage: number;
};

export interface CheckedItems {
  [key: string]: boolean;
}

export interface ChartData {
  labels: string[];
  chartData: string[];
}

export interface PageChangeEventData {
  selected: number;
}

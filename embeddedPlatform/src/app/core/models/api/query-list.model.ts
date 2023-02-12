import { QueryModel } from "./query.model";

export class QueryListModel<T> extends QueryModel {
    items: T[];
    totalRows: number;
    totalPages: number;
    currentPage: number;
}

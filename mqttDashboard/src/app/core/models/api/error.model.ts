export class ErrorModel {
    status: number;
    type: string;
    title: string;
    detail: string;
    errors: Dictionary<string[]>;
}

interface Dictionary<T> {
    [Key: string]: T;
}
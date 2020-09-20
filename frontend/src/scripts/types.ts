export type ApiHeader = {
    key: string,
    value: string
};

export type KeyValue<T, U> = {
    key: T,
    value: U
};

export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiResult = "success" | "failure";

export type ApiError = {
    ErrorCode: number,
    Description: string
};

export type ApiResponse<T> = {
    success: boolean,
    Code: number
    Description: string,
    Response: T
};

export type Video = {
    id: string,
    name: string,
    description: string,
    dateUpdated?: Date
}
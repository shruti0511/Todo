export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
}


export const successResponse = <T>(message: string, data: T): ApiResponse<T> => ({
    success: true,
    message,
    data,
});

export const errorResponse = <T>(message: string, error?: any): ApiResponse<T> => ({
    success: false,
    message,
    error,
});
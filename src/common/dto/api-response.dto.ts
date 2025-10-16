export class ApiResponse<T = any> {
    message: string;
    success: boolean;
    data?: T;
  
    constructor(init?: Partial<ApiResponse<T>>) {
      Object.assign(this, init);
    }
  }
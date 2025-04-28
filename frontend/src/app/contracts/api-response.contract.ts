export interface IApiResponseContract<T> {
  status: 'error' | 'success';
  message: string;
  data?: T;
  error?: unknown;
}

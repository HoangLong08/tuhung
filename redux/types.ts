export interface Error {
  errorCode: string;
  errorMessage: string;
}
export interface ResponseError {
  HttpStatusCode: number;
  errors?: Error[];
}

export interface BaseState {
  loading: boolean;
  errors?: Error[];
}

export interface Action<T> {
  type: string;
  payload: T;
}

export enum AppActionType {
  RESET_STATE_ACTION_TYPE = 'RESET_STATE_ACTION_TYPE',
}

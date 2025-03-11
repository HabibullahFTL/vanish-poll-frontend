export interface IResponse<T = undefined> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: { page: number; limit: number };
  stack?: string;
  errorSources?: { path: string; message: string }[];
}

export type IErrorResponse<T = undefined> = Omit<IResponse<T>, 'data'>;

export interface IPoll {
  _id: string;
  question: string;
  options: IPollOption[];
  votes: { [key: string]: number };
  expiresIn: Date;
  isPrivate: boolean;
  hideResults: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPollOption {
  id: string;
  text: string;
}

export interface IComment {
  _id: string;
  comment: string;
  pollId: string;
  createdAt: Date;
  updatedAt: Date;
}

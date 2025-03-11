import { ICreatePoll } from '@/app/poll/create/page';
import { IComment, IPoll, IResponse } from '@/types';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPolls = async (url: string) => {
  const response = await fetch(baseURL + url);
  const data: IResponse<IPoll[]> = await response.json();

  return data;
};

export const fetchSinglePoll = async (url: string) => {
  const response = await fetch(baseURL + url);
  const data: IResponse<IPoll> = await response.json();

  return data;
};

export const fetchAllComments = async (url: string) => {
  const response = await fetch(baseURL + url);
  const data: IResponse<IComment[]> = await response.json();

  return data;
};

export const voteToPoll = async (data: {
  pollId: string;
  optionId: string;
}) => {
  const finalURL = baseURL + '/polls/vote';

  const response = await fetch(finalURL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  const updatedData = await response.json();

  if (!response.ok) {
    throw new Error(updatedData?.message);
  }

  return updatedData as IResponse<IPoll>;
};

export const addComment = async (data: { pollId: string; comment: string }) => {
  const finalURL = baseURL + '/comments/add-comment';

  const response = await fetch(finalURL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  const updatedData = await response.json();

  if (!response.ok) {
    throw new Error(updatedData?.message);
  }

  return updatedData as IResponse<IComment>;
};

export const createPoll = async (data: ICreatePoll) => {
  const finalURL = baseURL + '/polls/create';

  const response = await fetch(finalURL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  const updatedData = await response.json();

  if (!response.ok) {
    throw new Error(updatedData?.message);
  }

  return updatedData as IResponse<IComment>;
};

export const addReactionToPoll = async (data: {
  pollId: string;
  reaction: string;
}) => {
  const finalURL = baseURL + '/polls/add-reaction';

  const response = await fetch(finalURL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  const updatedData = await response.json();

  if (!response.ok) {
    throw new Error(updatedData?.message);
  }

  return updatedData as IResponse<IPoll>;
};

import baseURL from '../baseUrl';

interface IRequest {
  projectId: string;
  name: string;
  user: string;
  shouldBeCompletedAt: Date;
}

export const create = async ({
  projectId,
  name,
  user,
  shouldBeCompletedAt,
}: IRequest) => {
  let data;
  let error;
  let status;

  const headers = {
    'Content-Type': 'application/json',
  };

  const body = {
    name,
    user,
    shouldBeCompletedAt,
  };

  try {
    const res = await baseURL.post(`/tasks/${projectId}`, body, {
      headers,
    });
    data = res.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error = err.response.data;
    status = err.response.status;
  }

  return { data, error, status };
};

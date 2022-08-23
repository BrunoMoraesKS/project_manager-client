import baseURL from '../baseUrl';

interface IRequest {
  taskId: string;
}

export const complete = async ({ taskId }: IRequest) => {
  let data;
  let error;
  let status;

  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const res = await baseURL.patch(`/tasks/complete/${taskId}`, {
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

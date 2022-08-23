import baseURL from '../baseUrl';

interface IRequest {
  name: string;
  projectId: string;
}

export const update = async ({ name, projectId }: IRequest) => {
  let data;
  let error;
  let status;

  const headers = {
    'Content-Type': 'application/json',
  };

  const body = {
    name,
  };

  try {
    const res = await baseURL.patch(`/projects/${projectId}`, body, {
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

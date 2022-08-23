import baseURL from '../baseUrl';

export const restoreAll = async () => {
  let data;
  let error;
  let status;

  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const res = await baseURL.patch(`/projects/restore`, {
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

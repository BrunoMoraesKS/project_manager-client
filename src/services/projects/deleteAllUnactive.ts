import baseURL from '../baseUrl';

export const deleteAllUnactive = async () => {
  let data;
  let error;
  let status;

  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const res = await baseURL.delete(`/projects/trashCan`, {
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

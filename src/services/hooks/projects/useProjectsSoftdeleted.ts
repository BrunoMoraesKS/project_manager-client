import { useQuery } from 'react-query';
import { IProject } from '../../../interfaces/project';
import { readSoftdeleted } from '../../projects/readSoftdeleted';

const getProjectsSoftdeleted = async () => {
  const { data } = await readSoftdeleted();

  return data;
};

const useProjectsSoftdeleted = () => {
  return useQuery<IProject[]>('softdeleted-projects', getProjectsSoftdeleted);
};

export default useProjectsSoftdeleted;

import { useQuery } from 'react-query';
import { IProject } from '../../../interfaces/project';
import { readOne } from '../../projects/readOne';

interface IRequest {
  projectId: string;
}

const useProject = ({ projectId }: IRequest) => {
  return useQuery<IProject>('tasks', async () => {
    const { data } = await readOne({ projectId });

    return data;
  });
};

export default useProject;

import React from 'react';
import { useQuery } from 'react-query';
import { IProject } from '../../../interfaces/project';
import { read } from '../../projects/read';

const getProjects = async () => {
  const { data } = await read();

  return data;
};

const useProjects = () => {
  return useQuery<IProject[]>('projects', getProjects);
};

export default useProjects;

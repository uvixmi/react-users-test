import { api } from '../../../shared/api/axios';
import { User } from '../../../entities/user/model/types';

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>('/users');
  return data;
};

export const createUser = async (
  user: Omit<User, 'id' | 'createdAt'>
): Promise<User> => {
  const { data } = await api.post<User>('/users', user);
  return data;
};

export const updateUser = async (
  user: User
): Promise<User> => {
  const { data } = await api.put<User>(`/users/${user.id}`, user);
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

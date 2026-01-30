import React from 'react';
import styled from 'styled-components';
import { Button, List, Avatar, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../features/user/api/users';
import { removeToken } from '../../shared/lib/auth';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { User } from '../../entities/user/model/types';
import { CreateUserModal } from '../../features/user/ui/CreateUserModal';
import { EditUserModal } from '../../features/user/ui/EditUserModal';
import { useAuth } from '../../shared/lib/authContext';


const PageWrapper = styled.div`
  max-width: 600px;
  margin: 40px auto;
  position: relative; 
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: flex-end; /* кнопка справа */
  margin-bottom: 16px; /* расстояние до списка */
`;


const CreateButtonWrapper = styled.div`
  margin-top: 16px;
  text-align: start;
`;

export const UsersPage = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [createOpen, setCreateOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <Spin style={{ display: 'block', margin: '100px auto' }} />;
  }

  return (
    <PageWrapper>

      <HeaderRow>
        <Button
          type="primary"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Выход
        </Button>
      </HeaderRow>

      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(user: User) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={user.avatar} onClick={() => setSelectedUser(user)} />}
              title={user.name}
              description={`Зарегистрирован ${dayjs(user.createdAt).format('DD.MM.YYYY')}`}
            />
          </List.Item>
        )}
      />

      <CreateButtonWrapper>
        <Button type="primary" onClick={() => setCreateOpen(true)}>
          Создать пользователя
        </Button>
      </CreateButtonWrapper>

      <CreateUserModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <EditUserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </PageWrapper>
  );
};

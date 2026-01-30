import React from 'react';
import { Button, List, Avatar, Typography, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../features/user/api/users';
import { removeToken } from '../../shared/lib/auth';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { User } from '../../entities/user/model/types';
import { CreateUserModal } from '../../features/user/ui/CreateUserModal';
import { EditUserModal } from '../../features/user/ui/EditUserModal';


export const UsersPage = () => {
  const navigate = useNavigate();

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
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <Button
        type="primary"
        onClick={() => {
          removeToken();
          navigate('/login');
        }}
        style={{ marginBottom: 16 }}
      >
        Выход
      </Button>
      <Button type="primary" onClick={() => setCreateOpen(true)}>
        Создать пользователя
      </Button>

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
      <CreateUserModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <EditUserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};


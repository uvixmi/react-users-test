import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { User } from '../../../entities/user/model/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser, deleteUser } from '../api/users';

interface Props {
  user: User | null;
  onClose: () => void;
}

export const EditUserModal: React.FC<Props> = ({ user, onClose }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      onClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      onClose();
    },
  });

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user]);

  return (
    <Modal
      title="Редактирование пользователя"
      open={!!user}
      onOk={() => form.submit()}
      onCancel={onClose}
      confirmLoading={updateMutation.isLoading}

      closable={!updateMutation.isLoading}
      footer={[
        <Button
          key="delete"
          danger
          loading={deleteMutation.isLoading}
          onClick={() => deleteMutation.mutate(user!.id)}
        >
          Удалить
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Отмена
        </Button>,
        <Button
          key="save"
          type="primary"
          loading={updateMutation.isLoading}
          onClick={() => form.submit()}
        >
          Сохранить
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={(values) =>
        updateMutation.mutate({ ...user!, ...values })
      }>
        <Form.Item label="id" name="id">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ссылка на аватарку"
          name="avatar"
          rules={[
            { required: true },
            { type: 'url', message: 'Некорректная ссылка' },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api/users';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateUserModal: React.FC<Props> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      onClose();
      form.resetFields();
    },
  });

  return (
    <Modal
      title="Создание пользователя"
      open={open}
      onCancel={onClose}
      maskClosable={false}
      closable={!isLoading}
      getContainer={false}
      footer={[
        <Button
          key="create"
          type="primary"
          onClick={() => form.submit()}
          disabled={isLoading}
        >
          {isLoading ? 'Создаем...' : 'Создать'}
        </Button>,
        <Button
          key="cancel"
          type="primary"
          onClick={onClose}
          disabled={isLoading}
        >
          Отмена
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => mutate(values)}
      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Input disabled={isLoading} />
        </Form.Item>

        <Form.Item
          label="Ссылка на аватарку"
          name="avatar"
          rules={[
            { required: true, message: 'Обязательное поле' },
            { type: 'url', message: 'Некорректная ссылка' },
          ]}
        >
          <Input disabled={isLoading} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

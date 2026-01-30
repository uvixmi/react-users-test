import React from 'react';
import { Modal, Form, Input } from 'antd';
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
      onOk={() => form.submit()}
      onCancel={onClose}
      confirmLoading={isLoading}
      maskClosable={false}
      closable={!isLoading}
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Ссылка на аватарку"
          name="avatar"
          rules={[
            { required: true, message: 'Обязательное поле' },
            { type: 'url', message: 'Некорректная ссылка' },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

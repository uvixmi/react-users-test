import React from 'react';
import styled from 'styled-components';
import { Modal, Form, Input, Button } from 'antd';
import { User } from '../../../entities/user/model/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser, deleteUser } from '../api/users';


const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LeftGroup = styled.div``;

const RightGroup = styled.div`
  display: flex;
  gap: 8px;
`;

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
      onCancel={onClose}
      getContainer={false}
      closable={!updateMutation.isLoading}
      maskClosable={false}
      footer={
        <FooterWrapper>
          <LeftGroup>
            <Button
              type="primary"
              loading={deleteMutation.isLoading}
              disabled={updateMutation.isLoading}
              onClick={() => deleteMutation.mutate(user!.id)}
            >
              Удалить
            </Button>
          </LeftGroup>
          <RightGroup>
            <Button
              type="primary"
              loading={updateMutation.isLoading}
              onClick={() => form.submit()}
            >
              Сохранить
            </Button>
            <Button disabled={updateMutation.isLoading} type="primary" onClick={onClose}>
              Отмена
            </Button>
          </RightGroup>
        </FooterWrapper>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => updateMutation.mutate({ ...user!, ...values })}
      >
        <Form.Item label="id" name="id">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Input disabled={updateMutation.isLoading} />
        </Form.Item>

        <Form.Item
          label="Ссылка на аватарку"
          name="avatar"
          rules={[
            { required: true, message: 'Обязательное поле' },
            { type: 'url', message: 'Некорректная ссылка' },
          ]}
        >
          <Input disabled={updateMutation.isLoading} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

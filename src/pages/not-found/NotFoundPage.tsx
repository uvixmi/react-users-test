import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Извините, такой страницы не существует"
            extra={
                <Button type="primary" onClick={() => navigate('/users')}>
                    На страницу пользователей
                </Button>
            }
        />
    );
};

export const loginRequest = async (
  login: string,
  password: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (login === 'admin' && password === 'admin') {
        resolve('fake-jwt-token');
      } else {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 2000);
  });
};

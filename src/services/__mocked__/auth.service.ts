const getUserData = () => {
  return Promise.resolve({
    email: 'example@example.com',
    name: 'name',
    surname: 'surname',
    id: 0,
    token: 'mocked__token',
    birthdayDate: new Date(),
  });
};

const logout = () => {
  return Promise.resolve();
};

export { getUserData, logout };

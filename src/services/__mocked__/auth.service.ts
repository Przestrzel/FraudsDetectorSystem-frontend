const getUserData = () => {
  return Promise.resolve({
    email: 'example@example.com',
    name: 'name',
    surname: 'surname',
    id: 0,
    birthdayDate: 'dasda',
  });
};

const logout = () => {
  return Promise.resolve();
};

export { getUserData, logout };

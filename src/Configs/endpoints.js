/* eslint-disable max-len */
export const URL = process.env.REACT_APP_ENDPOINT_URL;

export const endpoints = {
  getToken: () => ['POST', `${URL}login`],
  register: () => ['POST', `${URL}signup`],
  getUsers: (searchParams) => ['GET', `${URL}api/users?search=${searchParams}`],
  createUser: () => ['POST', `${URL}api/user`],
  updateUser: (id) => ['POST', `${URL}api/user/${id}`],
  getProfile: () => ['GET', `${URL}api/user`],
  deleteUser: (id) => ['DELETE', `${URL}api/user/${id}`],
  requestTokenToResetPassword: () => ['POST', `${URL}forgot-password`],
  verifyResetPasswordToken: () => ['POST', `${URL}verify-reset-password-token`],
  resetPassword: () => ['POST', `${URL}reset-password`],
};

import { toast } from 'react-toastify';

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
global.toast = (type, message) => {
  if (type && message) toast[type](message, toastConfig);
};

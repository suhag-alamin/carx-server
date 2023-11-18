import config from '../config';

const getServiceAccount = () => {
  const serviceAccount = JSON.parse(config.firebase.serviceAccount as string);
  return serviceAccount;
};

export default getServiceAccount;

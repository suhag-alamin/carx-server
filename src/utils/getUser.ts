import { IUser } from '../app/modules/user/user.interface';
import { User } from '../app/modules/user/user.model';

const getUser = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({
    email,
  });
  return user;
};

export default getUser;

import { User } from '../../types/types';

interface AccountInfoProps {
  user: User | null;
}

export const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <div>
      <h3>Account Information</h3>
      <div>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>
    </div>
  );
};

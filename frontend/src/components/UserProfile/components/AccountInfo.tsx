import { User } from '../../../types/types';

interface AccountInfoProps {
  user: User | null;
}

export const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <div>
      <div>
        <p>
          <strong>Name:</strong> {user?.name || 'N/A'}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>
    </div>
  );
};

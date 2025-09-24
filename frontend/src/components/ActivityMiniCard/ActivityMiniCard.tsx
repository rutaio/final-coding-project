import { Activity } from '../../types/types';

interface ActivityMiniCardProps {
  activity: Activity;
}

export const ActivityMiniCard = ({ activity }: ActivityMiniCardProps) => {
  return (
    <div className="activity-mini-card">
      <img
        src={activity.image}
        alt="Activity cover image"
        className="activity-mini-card-image"
      />
      <h5> {activity.title}</h5>
      {/* Later: link to activity details page */}
    </div>
  );
};

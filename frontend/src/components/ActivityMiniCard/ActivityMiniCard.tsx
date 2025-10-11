import { Activity } from '../../types/types';
import './activity-mini-card.css';

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
      <h4 className="activity-mini-card-title">
        <a href={`/activities/${activity.slug}`}>{activity.title}</a>
      </h4>
    </div>
  );
};

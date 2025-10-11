import { Activity } from '../../types/types';
import './activity-mini-card.css';
import { Link } from 'react-router-dom';

interface ActivityMiniCardProps {
  activity: Activity;
}

// fix the link: make the whole card clickable
export const ActivityMiniCard = ({ activity }: ActivityMiniCardProps) => {
  return (
    <Link to={`/activities/${activity.slug}`} className="activity-mini-card">
      <img
        src={activity.image}
        alt="Activity cover image"
        className="activity-mini-card-image"
      />
      <h4 className="activity-mini-card-title">{activity.title}</h4>
    </Link>
  );
};

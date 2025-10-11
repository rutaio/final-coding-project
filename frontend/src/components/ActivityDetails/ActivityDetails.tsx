import '../ProductDetails/product-details.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../constants/global';
import axios from 'axios';
import { Activity } from '../../types/types';

export const ActivityDetails = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activityResponse = await axios.get(
          `${API_URL}/activities/slug/${slug}`
        );
        const productData = activityResponse.data;
        setActivity(productData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [slug]);

  if (loading) {
    return <div>Loading activity details..</div>;
  }

  if (!activity) {
    return <div>No such activity in our museum.</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-detail-hero">
          <img
            src={activity?.image}
            alt="Activity cover image"
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-text">
          <div className="product-header">
            <h2>{activity?.title}</h2>
          </div>
          <div className="product-description">
            <p>{activity?.description}</p>
          </div>
          <div>
            <h5>
              Source:{' '}
              <a href={activity?.wiki.url}>
                {activity?.wiki.title} on Wikipedia
              </a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

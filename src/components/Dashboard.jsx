import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import DataCard from './DataCard';
// import Details from './Details';

const Dashboard = () => {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
        console.log(userInfo);
        console.log(history);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  // Current placeholder to fill out UI
  const cards = [];
  const data = {
    img: 'https://i.pinimg.com/originals/32/e2/41/32e2413585f1d2e0333c7dee3c4808bf.jpg',
    name: 'My Sign-in Design',
    meta: 'Created by Mark Vong',
    description: 'This design was inspired by all things fluffy and cute.',
    link: '#',
  };
  for (let i = 0; i < 20; i += 1) {
    cards.push(
      //   <Router>
      <Link to={`/${i}/details`}>
        <DataCard data={data} />
      </Link>,
      //   </Router>,
    );
  }

  // Inline styling
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '0',
    padding: '0',
  };

  // If user is being authenticated...
  if (authState.isPending) return <div>Loading...</div>;

  // TODO: Add auth and make /dashboard a secureroute
  return (
    authState.isAuthenticated && (
      <div style={style} className="dashboard">
        {cards}
      </div>
    )
  );
};

export default Dashboard;

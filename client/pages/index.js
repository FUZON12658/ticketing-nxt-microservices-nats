import React from 'react';
import buildClient from '../api/buildClient';


const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  // axios.get('/api/users/currentuser');
  return currentUser? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
};


LandingPage.getInitialProps = async (context) => {
  console.log('Landing page ');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
 


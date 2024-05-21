import axios from 'axios';
import React, { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({ 
    url: '/api/users/signup',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => router.push('/')
  });
  
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
    
    // router.push('/');
  };

  return (
    <form className='container' onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
      </div>
      {errors}
      <button className='btn btn-primary'>Sign Up</button>
    </form>
  );
}

export default SignUp;

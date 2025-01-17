import mongoose from 'mongoose';
import { DatabaseConnectionError } from '@aagamantickets/common';
import { app } from './app';

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY undefined');
  }
  try{    
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('connected to mongodb');
  }catch(err)
  {
    throw new DatabaseConnectionError();
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}

start();


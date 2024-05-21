import mongoose, { model } from 'mongoose';
import { Password } from '../services/password';


// An interface that describes the properties
// that are required to create a new user. 
interface UserAttrs {
  email: string;
  password: string;
}

//An interface that describes the properties 
//that a user model has
interface UserModel extends mongoose.Model<UserDoc>{
  build(attrs: UserAttrs): UserDoc;
}


//An interface that describes the properties that a user-document has
interface UserDoc extends mongoose.Document{
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    requried: true
  },
  password:{
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret){
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

//
userSchema.pre('save', async function(done){
  if(this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'));
    this.set('password',hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) =>{
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
//The angle bracket syntax we see here is the genertic syntax inside typescript.
//You can really think of these generic things as essentially being function or types.
//


// const user = User.build({
//   email: 'ste@st.com',
//   password: 'asdfasfw'
// });

// console.log(user.email);
// console.log(user.password);
// console.log(user.updatedAt);

export { User };
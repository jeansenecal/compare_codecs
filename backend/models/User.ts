import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  email: string;
  userName: string;
  password: string;
  setups: Setup[];
}

export interface Setup {
  headphone: string;
  dac: string;
  amp: string;
}

export interface UserDocument extends IUser, Document{
  comparePassword(candidatePassword: string, callback: any): void
}

const UserSchema = new mongoose.Schema<IUser>({
    email: { 
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    setups: new mongoose.Schema<Setup[]>([{ headphone: String, dac: String, amp: String }])
});

// Password hash middleware.

UserSchema.pre<UserDocument>("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  });
  
  // Helper method for validating user's password.
  
  UserSchema.methods.comparePassword = function comparePassword(
    candidatePassword: string,
    cb: any
  ) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
  };

export default mongoose.model<UserDocument>("User", UserSchema);
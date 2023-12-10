// update here with same from User object schema
type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export interface CustomRequest extends Request {
  user: User;
}

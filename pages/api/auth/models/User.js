import Adapters from "next-auth/adapters";

export default class User extends Adapters.TypeORM.Models.User.model {
  constructor(name, email, image, emailVerified) {
    super(name, email, image, emailVerified);
    this.email = email;
    this.role = "user";
    this.interests = [];
  }
}

export const UserSchema = {
  name: "User",
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    role: {
      type: "varchar",
      nullable: false,
    },
    interests: {
      type: "varchar[]",
      nullable: true,
    },
  },
};

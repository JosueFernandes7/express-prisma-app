import { validate } from "email-validator";

class User {
  constructor(name, email, password, role) {
    this.name = name || null;
    this.email = email || null;
    this.password = password || null;
    this.role = role || null;
  }

  validateEmail() {  
    return validate(this.email);
  }

}

export default User;

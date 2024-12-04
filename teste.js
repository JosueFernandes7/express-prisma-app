import User from "./src/models/User.js";
const data = {
  name: "Test-Chatbot",
  email: "teste232@gmail.com",
  password: "123",
  role: "USER",
};

const { name, email, password, role } = data;
const user = new User(name, email, password, role)
console.log(user);

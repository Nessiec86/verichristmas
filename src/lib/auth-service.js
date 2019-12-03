import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_PUBLIC_DOMAIN_2,
      withCredentials: true
    });
  }

  signup(user) {
    const { username, surname, password } = user;
    return this.auth
      .post("/auth/signup", { username, surname, password })
      .then(({ data }) => data);
  }

  login(user) {
    const { username, password } = user;
      return this.auth
      .post("/auth/login", { username, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth
      .post("/auth/logout", {})
      .then(response => response.data);
  }

  me() {
    return this.auth.get("/auth/me").then(response => response.data);
  }

  updateTrip (state) {
    return this.auth
      .put(`auth/ticket/update/`, state )
      .then(({ data }) => data);
  }

  read () {
    return this.auth
      .get('/auth/profile/')
      .then(({data}) => data);
  }

  update (user) {
    return this.auth
      .put('/auth/profile/edit', user)
      .then(({data}) => data);
  }
}

const auth = new Auth();

export default auth;
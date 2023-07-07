function isLoggedIn() {
  return !!localStorage.getItem('email');
}

export default isLoggedIn;

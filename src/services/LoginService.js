
export default function LoginService() {
  return {
    saveUserToLocalStorage: (data) => {
      return localStorage.setItem('user', JSON.stringify(data));
    },
    getUserFromLocalStorage: () => {
      return JSON.parse(localStorage.getItem('user'));
    },
    saveTokenToLocalStorage: (data) => {
      return localStorage.setItem('token', JSON.stringify(data));
    },
    deleteTokenFromLocalStorage: () => {
      return localStorage.removeItem('token');
    },
    deleteUserFromLocalStorage: () => {
      return localStorage.removeItem('user');
    }
  }
}

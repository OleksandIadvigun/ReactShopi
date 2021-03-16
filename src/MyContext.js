import React from "react";

const MyContext = React.createContext(JSON.parse(localStorage.getItem('user'))?.username);

export default MyContext;

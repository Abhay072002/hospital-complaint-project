import { createContext, useState, useContext } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
       const [user,setUser] = useState(
       JSON.parse(localStorage.getItem("user")) || null
       );

       const handleSetUser = (userData) =>{
        setUser(userData);
        if(userData){
            localStorage.setItem("user", JSON.stringify(userData));
        } else {
            localStorage.removeItem("user");
        }
       }

       return(
        <AuthContext.Provider value = {{user, setUser:handleSetUser}}>
            {children}
        </AuthContext.Provider>
       );
};

export const useAuth = ()=>{
    return useContext(AuthContext);
}
import { createContext, useContext, useEffect, useState } from "react";
import { signInRequest, User, recoverUserInformation } from '../services/auth';
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { apiServer } from "../services/api";

interface AuthContextType {
    isAutenticated: boolean;
    user: User,
    signIn: (data: SignInData) => Promise<void>
}

export type SignInData = {
    email: string;
    password: string;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const isAutenticated: boolean = !!user;

    async function signIn({email, password}: SignInData): Promise<void>{
        const { token, user } = await signInRequest({email, password});

        setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 1,// 1 hour
        });

        apiServer.defaults.headers['Autorization'] = `Bearer ${token}`

        setUser(user);
        Router.push('/dashboard')
    }

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies();

        if(token){
            recoverUserInformation()
            .then(response => 
                setUser(response.user)
            )
        }

    }, [])

    return (
      <AuthContext.Provider value={{isAutenticated, user, signIn}}>
        {children}
      </AuthContext.Provider>
    )
}

export const useStoreContext = (): AuthContextType => {
    const context = useContext(AuthContext)
    return context
  }
  
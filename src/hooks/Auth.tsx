import React, { createContext, useCallback, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface CredentialsProps {
    email: string;
    password: string;
}

interface userCredentials {
    token: string;
    user: Object;
}

interface AuthContextData {
    user: Object;
    loading: Boolean;
    singIn(credentials: CredentialsProps): Promise<void>;
    singOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('Context must be used within an AuthProvider');
    } else {
        return context;
    }

}

export const AuthProvider: React.FC = ({ children }) => {

    const [credentials, setCredentials] = React.useState<userCredentials>({} as userCredentials);
    const [loading, setLoading] = React.useState<Boolean>(true)
    


        useEffect(() => {
            
            async function getAsyncStorageInfo(): Promise<void> {
                setLoading(true);
                await AsyncStorage.multiGet(['@GoBarber-user', '@GoBarber-token']);
                    const [user, token] = await AsyncStorage.multiGet(
                        ['@GoBarber:user', '@GoBarber:token']
                    );

                    if(user[1] && token[1]){
                        setCredentials({token:token[1], user:user[1]})
                    }
                setLoading(false);
                }
            getAsyncStorageInfo();
        }, []);





    const singIn = useCallback(async ({ email, password }: CredentialsProps) => {
        const response = await api.post<userCredentials>('/sessions', { email, password });

        const { user, token } = response.data;

        await AsyncStorage.multiSet([['@GoBarber:user', JSON.stringify(user)], ['@GoBarber:token', token]]);

        setCredentials({ token, user });

    }, []);

    const singOut = useCallback(async (): Promise<void> => {

        await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);


        setCredentials({} as userCredentials);
    }, []);

    return (
        <AuthContext.Provider value={{ user: credentials.user, singIn, singOut, loading }} >
            {children}
        </AuthContext.Provider>
    );
}


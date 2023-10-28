import React, { useContext, useEffect } from 'react';
import MainAppBar from './component/MainAppBar.tsx';
import { UserContext } from './provider/UserProvider.tsx';
const App: React.FC = () => {
    // get user from provider
    const userContext = useContext(UserContext);

    useEffect(() => {
        userContext?.loadLocalStorage();
    }, []);

    return (
        <>
            <MainAppBar />
        </>
    );
};

export default App;

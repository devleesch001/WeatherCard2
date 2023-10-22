import React from 'react';
import MainAppBar from './component/MainAppBar.tsx';
import LoginForm from './user/LoginForm.tsx';
const App: React.FC = () => {
    return (
        <>
            <MainAppBar />
            <LoginForm />
        </>
    );
};

export default App;

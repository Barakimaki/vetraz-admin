import './App.css';
import {Route, Routes} from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useState} from "react";
import Navbar from "./components/navbar/Navbar.component";
import Header from "./components/header/Header.component";
import {privateRoutes} from "./routes/routes";


function App() {

    const [pageTitle, setPageTitle] = useState('Курсы')

    return (
        <div className="App">
            <Box sx={{display: 'flex'}}>
                <Header
                    pageTitle={pageTitle}
                />
                <Box
                    component="nav"
                    sx={{width: {sm: 240}, flexShrink: {sm: 0}}}
                    aria-label="mailbox folders"
                >
                    <Navbar
                        setPageTitle={setPageTitle}
                    />
                </Box>
                <Box
                    component="main"
                    sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${240}px)`}}}
                >
                    <Toolbar/>
                    <Routes>
                        {privateRoutes.map(route => <Route path={route.path} element={route.component}
                                                           key={route.path}/>)}
                    </Routes>
                </Box>
            </Box>
        </div>
    );
}

export default App;
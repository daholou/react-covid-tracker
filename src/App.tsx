import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {CovidTracker} from "./components/CovidTracker";
import Header from "./components/Header";

export default function App()
{
    return (
        <div className="app-frame">
            <Header/>
            <CovidTracker/>
        </div>
    );
}


import Canvas from "./components/Canvas";
import './styles/app.scss'
import Toollbar from "./components/Toollbar";
import SettingBar from "./components/SettingBar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="app">

                <Routes>
                    <Route path='/:id' element={<><Toollbar/><SettingBar/> <Canvas/></>}/>
                    <Route path='/'
                           element={
                               <>
                                   <Toollbar/>
                                   <SettingBar/>
                                   <Canvas/>
                                   <Navigate to={`f${(+new Date).toString(16)}`}
                                             replace/>
                               </>
                           }
                    />
                </Routes>


            </div>
        </BrowserRouter>
    );
}

export default App;

import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Scene } from './components/Scene/Scene';
import { NavBar } from './components/NavBar/NavBar';
import { NotFound } from './components/NotFound/NotFound';
import { Chat } from './components/Chat/Chat';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route index element={<Scene />} />
        <Route path="chat" element={<Chat />}>
          <Route path=":chatID" element={<Chat />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
      
    </Routes>
    </>
    
  );
}

export default App;

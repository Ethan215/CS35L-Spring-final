import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages and components
import Home from './pages/Home';
import Feed from './pages/Feed';
import Inbox from './pages/Inbox';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/feed" element={<Feed/>} />
            <Route path="/inbox" element={<Inbox/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </BrowserRouter>      
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';
import Profilpage from './pages/Profilpage';
import Page404 from './pages/Page404';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/profil" element={<Profilpage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;

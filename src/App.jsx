import { Routes, Route } from 'react-router-dom';
import "./assets/css/index.css";
import { Home } from "./pages/home/Home";
import { Header } from "./components/layout/header/Header";
import { Footer } from "./components/layout/Footer";

import { RecipesPage } from "./pages/Recipes/RecipesPage";
import { Favorites } from "./pages/favorites/Favorites";
import { Books } from "./pages/books/Books";
import { Blog } from "./pages/blog/Blog";
import { Users } from "./pages/users/Users";
import { Create } from "./pages/create/create";
import { Profil } from "./pages/profil/Profil";
import { Auth } from "./pages/auth/Auth";
import { Focus } from "./pages/focus/Focus";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import { isUserConnected } from './services/auth';
import { UpdateMenu } from './pages/focus/update/UpdateMenu';
import { ChatMenu } from "./components/layout/chat/ChatMenu";


function App() {

  const { state, dispatch } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    const resUser = await isUserConnected();
    if (resUser.ok && resUser.data.isUser) {
      dispatch({ type: "SET_USER", payload: true });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }


  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/books" element={<Books />} />
          <Route path="/blog" element={<Blog />} />
          {state.isConnected && <Route path="/users" element={<Users />} />}
          {state.isConnected && <Route path="/create" element={<Create />} />}
          <Route path="/profil" element={<Profil />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/focus" element={<Focus />} />
          {state.isConnected && <Route path="/update" element={<UpdateMenu />} />}
        </Routes>
      </main>
      <Footer />
      {state.isConnected && <ChatMenu />}
    </div>
  )
};

export default App

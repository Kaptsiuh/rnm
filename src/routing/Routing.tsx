import { Character } from "@/pages/Character";
import { Favorites } from "@/pages/Favorites";
import { History } from "@/pages/History";
import { Home } from "@/pages/Home";
import { SignInPage } from "@/pages/SignInPage";
import { NotFound } from "@/pages/NotFound";
import { SignUpPage } from "@/pages/SignUpPage";
import { Route, Routes } from "react-router";

const Path = {
  Main: "/",
  Login: "/login",
  Registration: "/registration",
  Character: "/character/:id",
  History: "/history",
  Favorites: "/favorites",
  NotFound: "*",
};

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<Home />} />
    <Route path={Path.Login} element={<SignInPage />} />
    <Route path={Path.Registration} element={<SignUpPage />} />
    <Route path={Path.Character} element={<Character />} />
    <Route path={Path.History} element={<History />} />
    <Route path={Path.Favorites} element={<Favorites />} />
    <Route path={Path.NotFound} element={<NotFound />} />
  </Routes>
);

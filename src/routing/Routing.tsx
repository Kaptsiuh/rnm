import { Character } from "@/pages/Character";
import { Favorites } from "@/pages/Favorites";
import { History } from "@/pages/History";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import { Route, Routes } from "react-router";

export const Path = {
  Main: "/",
  Login: "/login",
  Character: "/character/:id",
  History: "/history",
  Favorites: "/favorites",
  NotFound: "*",
};

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<Home />} />
    <Route path={Path.Login} element={<Login />} />
    <Route path={Path.Character} element={<Character />} />
    <Route path={Path.History} element={<History />} />
    <Route path={Path.Favorites} element={<Favorites />} />
    <Route path={Path.NotFound} element={<NotFound />} />
  </Routes>
);

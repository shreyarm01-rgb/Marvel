import React, { useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { GlobalStyle } from "./components/GlobalStyle.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { BlogPage } from "./pages/BlogPage.jsx";
import { ArticlePage } from "./pages/ArticlePage.jsx";

function AppContent() {
  const navigate = useNavigate();
  const phaseRefs = useRef({});

  const handleOpenItem = (item) => {
    navigate(`/article/${item.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mcv-root">
      <GlobalStyle />
      <Header onOpen={handleOpenItem} />

      <Routes>
        <Route path="/" element={<HomePage onOpen={handleOpenItem} phaseRefs={phaseRefs} />} />
        <Route path="/blog" element={<BlogPage onOpen={handleOpenItem} />} />
        <Route path="/article/:id" element={<ArticlePage onOpen={handleOpenItem} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";         
import BlogsPage from "@/pages/BlogsPage";      
import BlogDetailPage from "@/pages/BlogDetailPage";  
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

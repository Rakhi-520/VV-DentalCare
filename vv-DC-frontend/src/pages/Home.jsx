import React from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero/Hero";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Services from "../components/Services/Services";
import CaseCarousel from "../components/CaseGallery/CaseCarousel";
import Technology from "../components/Technology/Technology";
import Doctors from "../components/Doctors/Doctors";
import Testimonials from "../components/Testimonials/Testimonials";
import BlogSection from "@/components/Blog/BlogSection";
import blogs from "@/utils/blogs";
import FAQ from "../components/FAQ/FAQ";

export default function Home() {
  return (
    <main>
     
      <Hero />

      <section className="container mx-auto px-4 py-10 text-center">
       <h1 className="text-3xl sm:text-4xl font-bold"></h1>
        <p className="mt-2 text-gray-600">
        
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link
            to="/blogs"
            className="rounded-full bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700"
          > 
         

          </Link>
        </div>
      </section>
      <WhyChooseUs />
      <Services />
      <CaseCarousel />
      <Technology />
      <Doctors />
       <BlogSection blogs={blogs} />
      <Testimonials />
      <FAQ />
    </main>
  );
}

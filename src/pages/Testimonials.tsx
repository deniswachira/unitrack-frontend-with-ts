import Navbar from "../components/Navbar";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Testimonial from "../components/Testimonial";
import BlogSection from "../components/BlogSection";

const Testimonials = () => {  

  return (
    <div>
      <Container className="bg-base-200 flex flex-col gap-6">
        <Navbar />
        <Testimonial />
        <BlogSection />
        <Footer />
      </Container>
    </div>
  );
};

export default Testimonials;

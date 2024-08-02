
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import Footer from "../components/Footer";
import FeatureHighlights from "../components/FeaturesHighlights";
import CallToAction from "../components/CallToAction";

const Home = () => {  

  return (
    <div>
      <Container className="bg-base-200 flex flex-col gap-6">
        <Navbar />
        <Hero />    
        <FeatureHighlights />   
        <CallToAction /> 
        <Footer />
      </Container>
    </div>
  );
};

export default Home;

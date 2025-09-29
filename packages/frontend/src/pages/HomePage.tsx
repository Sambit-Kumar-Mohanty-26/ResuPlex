import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection'; 
import PopularTemplates from '../components/PopularTemplates';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import PricingSection from '../components/PricingSection';
import CtaSection from '../components/CtaSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection /> 
      <PopularTemplates />
      <SuccessStoriesSection />
      <PricingSection />
       <CtaSection />
    </div>
  );
};

export default HomePage;
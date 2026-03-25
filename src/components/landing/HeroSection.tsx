import { BGPattern } from "../pattern/HeroBackgroundPattern";

const HeroSection = () => {
  return (
    <div className="w-full text-center">
      <div className="w-full h-225 relative flex aspect-video flex-col items-center justify-center">
        <BGPattern variant="grid" mask="fade-edges" />
        
      </div>
    </div>
  );
};

export default HeroSection;

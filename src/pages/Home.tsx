import { Hero } from "../components/Hero";
import { Partners } from "../components/Partners";
import { Manifesto } from "../components/Manifesto";
import { DropShowcase } from "../components/DropShowcase";
import { Lifestyle } from "../components/Lifestyle";
import { SocialProof } from "../components/SocialProof";
import { BrandValues } from "../components/BrandValues";

export const Home = () => {
  return (
    <>
      <Hero />
      <Partners />
      <Manifesto />
      <DropShowcase />
      <SocialProof />
      <BrandValues />
      <Lifestyle />
    </>
  );
};

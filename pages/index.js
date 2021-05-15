import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureSection from "../components/FeatureSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureSection />
    </>
  );
}

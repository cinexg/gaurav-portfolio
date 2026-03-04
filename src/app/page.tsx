import Hero from "../components/Hero";
import About from "../components/About";
import Pinboard from "../components/Pinboard";
import ProjectsGrid from "../components/ProjectsGrid";
import TechStack from "../components/TechStack";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <About />
      <Pinboard />
      <ProjectsGrid />
      <TechStack />
    </main>
  );
}
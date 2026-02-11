import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background3D from './components/Background3D';

function App() {
  return (
    <div className="bg-primary min-h-screen text-white selection:bg-accent selection:text-primary relative">
      <Background3D />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Contact />

        <footer className="bg-primary/80 backdrop-blur-sm py-6 sm:py-8 border-t border-white/5 text-center text-gray-500 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Siddharth Srivastav. All rights reserved.</p>
          <p className="mt-1 sm:mt-2">Built with React, Three.js, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

import Layout from "./layout/Layout";
import { useEffect } from "react";
import { useContext } from "react";
import { MyContext } from './lib/MyStore'

import "./App.css";

function App() {
  const { state ,updateState } = useContext(MyContext)


    // resize logic 
    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 1024px)");
    
      const handleMediaQueryChange = (event) => {
        console.log('event ran just now')
        if (event.matches) {
          updateState('isShown', true); // Show sidebar on lg+
        } else {
          updateState('isShown', false); // Hide sidebar on smaller
        }
      };
    
      // Initial check
      handleMediaQueryChange({ matches: mediaQuery.matches });
    
      // Listen for changes
      mediaQuery.addEventListener("change", handleMediaQueryChange);
    
      return () => {
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };
    }, []);
  return (
    <div>
      <Layout />
    </div>
  );
}

export default App;

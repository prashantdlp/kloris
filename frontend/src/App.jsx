import leaf from "./assets/leaf.svg";
import Home from "./Home";

function App() {
  return (
    <div className="relative min-h-screen">
      
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `url(${leaf})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div className="relative z-10">
        <Home />
      </div>
    </div>
  );
}

export default App;
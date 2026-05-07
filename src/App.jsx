import './App.css'
import Header from './components/header'
import Summary from './components/summary'
import Widget from "./components/widget";

function App() {
  return (
    <>
      {/* <ShootingStarsBackground /> */}
      <Header />

      <Widget
        title="Summary"
        defaultPosition={{ x: 40, y: 120 }}
        defaultSize={{ width: 420, height: 260 }}
      >
        <Summary />
      </Widget>
    </>
  );
}

export default App

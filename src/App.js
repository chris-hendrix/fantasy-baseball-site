import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Contact, Draft, Rules, Keepers, History, Stats } from "./Components/Pages";
import "bootswatch/dist/simplex/bootstrap.min.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/draft" exact component={() => <Draft />} />
          <Route path="/keepers" exact component={() => <Keepers />} />
          <Route path="/stats" exact component={() => <Stats />} />
          <Route path="/history" exact component={() => <History />} />
          <Route path="/rules" exact component={() => <Rules />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
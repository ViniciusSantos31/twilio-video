import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ParticipantsProvider from "./contexts/Participants";
import { RoomProvider } from "./contexts/Room";
import Home from "./pages/home";
import Meet from "./pages/meet";
import Room from "./pages/room";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/room">
          <ParticipantsProvider>
            <RoomProvider>
              <Room />
            </RoomProvider>
          </ParticipantsProvider>
        </Route>
        <Route path="/meet">
          <Meet />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

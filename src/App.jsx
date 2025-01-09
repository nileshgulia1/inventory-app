import React, { useState } from "react";
import { Container, Menu, Checkbox } from "semantic-ui-react";

import AdminView from "./components/AdminView";
import useFetchInventory from "./hooks/useFetchInventory";
import "./styles.css";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const { inventory } = useFetchInventory();

  return (
    <Container fluid>
      <Menu inverted>
        <Menu.Item header attached as="h1" color="#bbb">
          Inventory Stats
        </Menu.Item>
        <Menu.Item position="right">
          <Checkbox
            inverted
            toggle
            onClick={() => setIsAdmin(!isAdmin)}
            label={`Switch to ${isAdmin ? "User" : "Admin"} View`}
          ></Checkbox>
        </Menu.Item>
      </Menu>
      <AdminView inventory={inventory} isAdmin={isAdmin} />
    </Container>
  );
};

export default App;

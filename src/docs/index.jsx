import React from "react";
import { render } from "react-dom";
import "./styles.css";
import Tabs from "../../components/tabs"
import Tab from "../../components/tabs"

function Demo() {
  return (
    <Tabs tabActive={2}>
      <Tab title='Tab #1'>
        <h2>Content #1</h2>
      </Tab>
      <Tab title='Tab #2'>
        <h2>Content #2</h2>
      </Tab>
      <Tab title='Tab #3'>
        <h2>Content #3</h2>
      </Tab>
    </Tabs>
  );
}

render(<Demo />, document.getElementById("app"));

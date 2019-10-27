import { AppBar, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import React, { useState } from "react";
import Table from "./components/Table";
import Search from "./components/SearchForm";
import "./App.css";

function App() {
  const [numberHistoy, setNumbersHistory] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [disableVerify, setDisablerify] = useState(false);
  const [currenValue, setCurrentValue] = useState(null);
  const [Loading, setLoading] = useState(false);
  console.log(phoneNumber);
  if (phoneNumber === "" && !disableVerify) {
    setDisablerify(true);
  } else if (phoneNumber.length > 6 && disableVerify && !Loading) {
    setDisablerify(false);
  }
  // todo verify on keypress
  return (
    <>
      <AppBar position="static">
        <Typography variant="h3" className="py-3 text-center">
          Phone verify
        </Typography>
      </AppBar>
      <div className="App  pt-3 ">
        <main>
          <Search
            {...{
              setNumbersHistory,
              disableVerify,
              setCurrentValue,
              setPhoneNumber,
              numberHistoy,
              phoneNumber,
              setDisablerify,
              setLoading
            }}
          />
          <Divider className="m-5" />
          {currenValue ? (
            <Card
              style={{
                maxWidth: "94%",
                margin: "auto",
                overflow: "auto"
              }}
            >
              <Typography
                variant="subtitle1"
                className="text-center p-2"
                component="h3"
              >
                Verification result
              </Typography>
              <Table rows={[currenValue]} />
            </Card>
          ) : (
            <Typography component="h3" variant="subtitle1">
              Search results go here
            </Typography>
          )}
          <Divider className="m-5" />
          {numberHistoy.length > 0 ? (
            <Card
              style={{
                maxWidth: "94%",
                margin: "auto",
                overflow: "auto"
              }}
            >
              <Typography
                variant="subtitle1"
                className="text-center p-2"
                component="h3"
              >
                Full history list
              </Typography>
              <Table rows={numberHistoy} />
            </Card>
          ) : (
            <Typography component="h3" variant="subtitle1">
              There is no result history for this session
            </Typography>
          )}
          <Divider className="m-5" />
        </main>
      </div>
    </>
  );
}

export default App;

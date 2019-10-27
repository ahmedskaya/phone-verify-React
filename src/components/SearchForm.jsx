import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const SearchForm = ({
  setNumbersHistory,
  setCurrentValue,
  setLoading,
  setPhoneNumber,
  numberHistoy,
  phoneNumber,
  disableVerify,
  setDisablerify
}) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div
        style={{
          minWidth: 200
        }}
      >
        <TextField
          value={phoneNumber}
          select
          fullWidth
          variant="outlined"
          style={{
            borderRadius: "0px !important"
          }}
          onChange={event => {
            setPhoneNumber(event.target.value);
          }}
          label="Select from history"
        >
          {numberHistoy.map(({ number, valid }) => (
            <MenuItem key={number} value={number}>
              {number}
              {valid ? " ✅" : " ❌"}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <form
        style={{
          minWidth: 400,
          display: "flex"
        }}
        onSubmit={async e => {
          e.preventDefault();
          if (disableVerify) return;

          try {
            setDisablerify(true);
            setLoading(true);
            const req = await fetch(
              `http://apilayer.net/api/validate?access_key=${process.env
                .REACT_APP_API_KEY || 90809890900}&number=+${phoneNumber}`
            );
            if (!req.ok) {
              throw new Error("failed to verify the number");
            }
            const res = await req.json();
            if (res) {
              console.log(res);
              setNumbersHistory([
                ...numberHistoy.filter(i => i.number !== phoneNumber),
                {
                  ...res,
                  number: res["intl_format"] || phoneNumber,
                  valid: res.valid
                }
              ]);
            }

            setCurrentValue(res);
          } catch (e) {
            console.log(e);
          } finally {
            setDisablerify(false);
            setLoading(false);
          }
        }}
      >
        <TextField
          variant="outlined"
          label="Phone number"
          fullWidth
          type="number"
          style={{
            borderRadius: "0px !important"
          }}
          value={phoneNumber}
          onChange={e => {
            setPhoneNumber(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={disableVerify}
          type="submit"
        >
          verify
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;

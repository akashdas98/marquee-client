import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../services/api";
import StyledButton from "../components/UI/StyledButton";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleChangeValue = (e) => {
    setSelected(null);
    setValue(e.target.value);
  };

  const handleAddCompany = (el) => {
    setList([]);
    setSelected(el);
  };

  const handleSubmit = async () => {
    if (!selected) return;
    try {
      await axios.post(
        baseURL + "/addcompany",
        {
          ...selected,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      navigate("/view");
    } catch (err) {
      console.log(err);
    }
  };

  const getCIN = (str) => {
    str = str.split("").reverse();
    let CIN = "";
    for (let char of str) {
      if (char === "/") break;
      CIN += char;
    }
    return CIN.split("").reverse().join("");
  };

  const fetchCompanies = async () => {
    if (!value.trim()) {
      setList([]);
      return;
    }
    try {
      let data = (
        await axios.get(baseURL + "/fetchcompanies", {
          params: {
            query: value,
          },
          headers: {
            "content-type": "text/html; charset=UTF-8",
          },
        })
      ).data;

      data = new DOMParser().parseFromString(data, "text/html");
      data = Array.from(data.getElementsByClassName("show")).map((el) => ({
        name: el.innerText,
        cin: getCIN(el.id),
      }));
      setList(data);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [value]);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          marginTop: "25px",
        }}
      >
        <StyledButton onClick={() => navigate("/view")}>
          View Companies
        </StyledButton>
        <input
          value={selected?.name || value}
          onChange={handleChangeValue}
          style={{
            width: "100%",
            height: "45px",
            paddingLeft: "10px",
            paddingRight: "10px",
            marginTop: "25px",
          }}
        />
        {list.length ? (
          <div
            style={{
              width: "100%",
              border: "1px solid #000000",
              borderTop: "none",
              padding: "5px 10px",
              overflow: "auto",
              maxHeight: "150px",
            }}
          >
            {list.map((el, i) => (
              <button
                key={i}
                style={{
                  margin: 0,
                  padding: "5px 0",
                  textAlign: "left",
                  display: "block",
                  border: "none",
                  background: "initial",
                  cursor: "pointer",
                  width: "100%",
                }}
                onClick={() => handleAddCompany(el)}
              >
                {el.name}
              </button>
            ))}
          </div>
        ) : null}
        <div style={{ width: "100%" }}>
          <StyledButton onClick={handleSubmit}>Submit</StyledButton>
        </div>
      </div>
    </div>
  );
};

export default Search;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledButton from "../components/UI/StyledButton";
import { baseURL } from "../services/api";

function View() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  const fetchAddedCompanies = async () => {
    try {
      const companies = (await axios.get(baseURL + "/fetchaddedcompanies"))
        .data;
      setCompanies(companies);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAddedCompanies();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: "25px",
        }}
      >
        <StyledButton onClick={() => navigate("/search")}>
          Add Companies
        </StyledButton>
        <h2>Companies</h2>
        <div
          style={{
            display: "flex",
          }}
        >
          <h4
            style={{
              width: "500px",
              marginRight: "25px",
            }}
          >
            CIN
          </h4>
          <h4
            style={{
              width: "500px",
            }}
          >
            Name
          </h4>
        </div>
        <div>
          {companies.map((company, i) => (
            <div
              key={company.company_id}
              style={{
                display: "flex",
              }}
            >
              <p
                style={{
                  width: "500px",
                  marginRight: "25px",
                  overflowWrap: "break-word",
                }}
              >
                {company.cin}
              </p>
              <p
                style={{
                  width: "500px",
                  overflowWrap: "break-word",
                }}
              >
                {company.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default View;

import React, { useEffect, useState } from "react";
import { useAuthContext } from "../auth";
import Button from "@mui/material/Button";
import DashboardCard from "./DashboardCard";

const Dashboard = () => {
  const { currentUser, setCurrentUser, signOut } = useAuthContext();
  const [pending, setPending] = useState(false);
  const [data, setData] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut();
      setCurrentUser();
    } catch (error) {
      console.log("There was an error");
    }
  };
  // if there is no current user put on loading state
  const fetchData = async () => {
    console.log("HEEY");
  };
  useEffect(() => {
    // will be fetching the api here
    fetchData();
  }, []);
  if (pending) {
    return <div>Loading</div>;
  }
  let responses;
  console.log(currentUser);
  return (
    <div className="dashboard-wrapper">
      <button onClick={handleLogout}>Logout</button>
      <div className="dashboard-main">
        <div className="left-dashboard-wrapper">
          <p>Workspaces and Responses</p>
        </div>
        <div className="right-dashboard-wrapper">
          <div className="right-dashboard">
            <div className="right-dashboard-menu">
              <div className="dashboard-settings">
                <div>My Dropforms</div>
                <div>Share</div>
              </div>
              <div className="dashboard-general">
                <div className="centre-div">
                  <div className="menu-svg">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#737373"
                        d="M4 4h4v4H4zM4 10h4v4H4zM4 16h4v4H4zM10 4h4v4h-4zM10 10h4v4h-4zM10 16h4v4h-4zM16 4h4v4h-4zM16 10h4v4h-4zM16 16h4v4h-4z"
                      ></path>
                    </svg>
                  </div>
                  <Button
                    variant="contained"
                    className="dashboard-create secondary-button"
                    style={{ padding: "6px 12px" }}
                  >
                    <span className="plus-svg">
                      <svg
                        class="SVGInline-svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 6c0-1.10457.89543-2 2-2h8c0 1.10457-.89543 2-2 2H0z"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6 0v8c0 1.10457-.89543 2-2 2V2c0-1.104569.89543-2 2-2z"
                        ></path>
                      </svg>
                    </span>
                    Create dropform
                  </Button>
                </div>
                <div>date created</div>
              </div>
            </div>
            <div className="dashboard-card-wrapper">
              <div className="form-cards">
                {/* show all cards here */}
                <DashboardCard />
                <DashboardCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard };

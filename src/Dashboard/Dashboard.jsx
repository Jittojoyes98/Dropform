import React, { useEffect, useState } from "react";
import { useAuthContext } from "../auth";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { currentUser, setCurrentUser,signOut } = useAuthContext()
    const [pending,setPending]=useState(false)
    const [data,setData]=useState(null)

    const handleLogout=async()=>{
      try {
        await signOut()
        setCurrentUser()
      } catch (error) {
        console.log("There was an error");
      }
    }
    // if there is no current user put on loading state
    const fetchData=async()=>{
      console.log("HEEY");
    }
    useEffect(()=>{
      // will be fetching the api here
      fetchData()
    },[])
    if (pending){
      return (
        <div>Loading</div>
      )
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
                <div>My Dropforms</div>
                <div className="dashboard-general">
                  <div className="">
                    <Button variant='contained' className='secondary-button redirect-button'>
                    <span className="plus-svg">
                      <svg class="SVGInline-svg" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6c0-1.10457.89543-2 2-2h8c0 1.10457-.89543 2-2 2H0z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6 0v8c0 1.10457-.89543 2-2 2V2c0-1.104569.89543-2 2-2z"></path>
                      </svg>
                    </span>
                    Create dropform
                    </Button>
                  </div>
                  <div>
                    date created
                  </div>
                </div>
              </div>
              <div className="dashboard-card-wrapper">
                {/* show all cards here */}
                <div className="form-cards">
                  <Box className="form-card">
                    <Link className="form-card-link" to={"/whiteboard"}>
                      <div className="form-name">
                        <p>My Dropform</p>
                      </div>
                      {
                        responses ? <div> 1 response</div> : <div> response</div>
                      }
                    </Link>
                  </Box>
                </div>
                
              </div>
            </div>
          </div>
        </div> 
      </div>
    )
};

export {Dashboard};

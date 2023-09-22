import React from "react";
import { useAuthContext } from "../auth";
import Box from "@mui/material/Box";
import DashboardCard from "./DashboardCard";
import CreateForm from "../_ui/CreateFormModal/CreateForm";
import { useCreateFormStore } from "../_services/CreateFormService";
import CreateButton from "../_ui/CreateButton/CreateButton";

const Dashboard = () => {
  const { currentUser, setCurrentUser, signOut } = useAuthContext();
  const { fetchForms, loading, data, error } = useCreateFormStore();
  const [pending, setPending] = React.useState(false);
  const firstRender = React.useRef(true);
  const [open, setOpen] = React.useState(false);

  // if there is no current user put on loading state

  React.useEffect(() => {
    if (currentUser?.id && firstRender.current) {
      firstRender.current = false;
      fetchForms(currentUser.id);
    }
  }, [currentUser]);

  const handleOpenCreate = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseCreate = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className="dashboard-wrapper">
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
                  <CreateButton handleOpenCreate={handleOpenCreate} />
                </div>
                <div>date created</div>
              </div>
            </div>
            <div className="dashboard-card-wrapper">
              {data?.length > 0 ? (
                <div className="form-cards">
                  {/* show all cards here */}
                  {data.map((form, id) => {
                    return <DashboardCard key={id} formData={form} />;
                  })}
                </div>
              ) : (
                <Box className="form-empty">
                  <p>Nothing here</p>
                  <CreateButton handleOpenCreate={handleOpenCreate} />
                </Box>
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateForm open={open} handleClose={handleCloseCreate} />
    </div>
  );
};

export { Dashboard };

import React from "react";
import { useAuthContext } from "../auth";
import DashboardCard from "./DashboardCard";
import CreateForm from "../_ui/CreateFormModal/CreateForm";
import { useCreateFormStore } from "../_services/CreateFormService";
import CreateButton from "../_ui/CreateButton/CreateButton";
import dropDownSvg from "../../assets/empty.svg";
import { CircularProgressLoader } from "../_ui/Loader/CircularProgress";
import { addToLocalStorage, getDataFromLocalStorage } from "../_helpers/utils";
import DashboardStats from "./DashboardStats";

const Dashboard = () => {
  const { currentUser } = useAuthContext();
  const { fetchForms, data, loading } = useCreateFormStore();
  const firstRender = React.useRef(true);
  const [open, setOpen] = React.useState(false);
  const [fetchFormsAgain] = useCreateFormStore((state) => {
    return [state.fetchFormsAgain];
  });

  React.useEffect(() => {
    if (currentUser?.id && firstRender.current) {
      firstRender.current = false;
      fetchForms(currentUser.id);
      if (getDataFromLocalStorage("walkthroughCompleted") == undefined) {
        addToLocalStorage({ key: "walkthroughCompleted", value: false });
      }
    }
  }, [currentUser, fetchFormsAgain]);

  React.useEffect(() => {
    if (currentUser?.id) {
      fetchForms(currentUser.id);
    }
  }, [fetchFormsAgain]);

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
          <DashboardStats />
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

            {loading && !data ? (
              <div className="progress-wrapper">
                <CircularProgressLoader />
              </div>
            ) : data?.length > 0 ? (
              <div className="dashboard-card-wrapper ">
                <div className="form-cards">
                  {data?.map((form, id) => {
                    return <DashboardCard key={id} formData={form} />;
                  })}
                </div>
              </div>
            ) : (
              <div className="dashboard-card-wrapper dashboard-card">
                <div className="form-empty">
                  <img src={dropDownSvg} alt="dog" />
                  <p className="form-empty-text">
                    Come on in, {currentUser?.email?.split("@")[0]}
                  </p>
                  <CreateButton handleOpenCreate={handleOpenCreate} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CreateForm open={open} handleClose={handleCloseCreate} />
    </div>
  );
};

export { Dashboard };

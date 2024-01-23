import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { addToLocalStorage, getDataFromLocalStorage } from "./utils";

export const initEditorWalkThrough = () => {
  var isWalkthroughCompleted =
    getDataFromLocalStorage("walkthroughCompleted") === "true";
  if (
    getDataFromLocalStorage("walkthroughCompleted") == undefined ||
    !isWalkthroughCompleted
  ) {
    const steps = [
      {
        element: ".widget-text",
        popover: {
          title: "Drag and drop components",
          description:
            "From the component sidebar, drag and drop components to the editor.",
          position: "left",
          closeBtnText: "Skip (1/6)",
        },
      },
      {
        element: ".editor-drop",
        popover: {
          title: "Editor",
          description:
            "Editor lets you drop the components, and add to the list.",
          position: "bottom",
          closeBtnText: "Skip (2/6)",
        },
      },
      {
        element: ".sortable ",
        popover: {
          title: "Rearrange components",
          description: "Drag around to rearrange the form components.",
          position: "top",
          closeBtnText: "Skip (3/6)",
        },
      },
      {
        element: ".dropform-name-input",
        popover: {
          title: "Edit form name",
          description: "Click here to edit the form name.",
          position: "top",
          closeBtnText: "Skip (4/6)",
        },
      },
      //   save and publish is left
      //   {
      //     element: ".promote-release-btn",
      //     popover: {
      //       title: "Release",
      //       description:
      //         " Release the editing version to make the changes live. Released versions cannot be modified, you will have to create another version to make more changes.",
      //       position: "left",
      //       closeBtnText: "Skip (5/6)",
      //     },
      //   },
      //   {
      //     element: ".sidebar-comments",
      //     popover: {
      //       title: "Collaborate",
      //       description:
      //         "Add comments on canvas and tag your team members to collaborate.",
      //       position: "top",
      //       closeBtnText: "Skip (6/6)",
      //     },
      //   },
    ];
    const config = {
      allowClose: true,
      nextBtnText: "Next",
      prevBtnText: "Previous",
      padding: 2,
      onDestroyed: () => {
        // Here we need to write the logic to update walkthroughCompleted column of the current user.
        addToLocalStorage({ key: "walkthroughCompleted", value: true });
      },
      popoverClass: `walkthrough-base`,
      steps: steps,
    };

    const driverObj = driver({
      ...config,
    });

    driverObj.drive();
  }
};

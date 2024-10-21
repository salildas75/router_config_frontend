import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastNotify = (type, msg) =>
  toast[type](msg, {
    autoClose: 1600,
    draggable: true,
    transition: Zoom,
  });

export const AlertError = (error) => {
  if (error?.response?.data?.errorMessage) {
    toastNotify("error", error.response.data.errorMessage);
  } else if (error?.response?.data?.message) {
    toastNotify("error", error.response.data.message);
  } else if (error?.response?.message) {
    toastNotify("error", error.reponse.message);
  } else {
    toastNotify("error", "Server Down! Call admin");
  }
};

export const SuccessMsg = (status) => {
  if (status === 201) {
    toastNotify("success", "Successfully created");
  }
  if (status === 200) {
    toastNotify("success", "Successfully updated");
  }
  if (status === 204) {
    toastNotify("success", "Successfully deleted");
  }
};

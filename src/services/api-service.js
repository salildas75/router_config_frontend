// noinspection EqualityComparisonWithCoercionJS

import axios from "axios";
import { AlertError, SuccessMsg } from "../helpers/alert-msg";
import { setRecoil } from "recoil-nexus";
import { globalSpinner } from "../recoil/atoms";
import { API } from "./api-config";

// if api call is successfull then refresh function will be called
export function postApiCallDynamic({
  data = {},
  refresh = () => {
    // Nothing
  },
  path = "",
  header = "create",
}) {
  setRecoil(globalSpinner, true);
  return axios
    .post(path, data, {
      headers: { "XTR-API-Action": header },
    })
    .then((res) => {
      if (
        res &&
        (res.status === 200 ||
          res.status === 201 ||
          res.status === 202 ||
          res.status === 203 ||
          res.status === 204)
      ) {
        return refresh({ ...res, requestData: data });
      }
    })
    .catch((error) => AlertError(error))
    .finally(() => {
      setRecoil(globalSpinner, false); // Set the spinner to false after the API call is done
    });
}
export function getApiCallDynamic({
  path = "",
  param = {},
  serverMsg = false,
}) {
  setRecoil(globalSpinner, true);
  return axios
    .get(path, {
      params: param,
      headers: { "XTR-API-Action": "read" },
    })
    .then((res) => {
      // serverMsg;

      return res;
    })
    .catch((error) => AlertError(error))
    .finally(() => {
      setRecoil(globalSpinner, false); // Set the spinner to false after the API call is done
    });
}

export function postApiCallDynamicWithOutReturn({
  data = {},
  refresh = () => {
    // Nothing
  },
  path = "",
  header = "create",
}) {
  setRecoil(globalSpinner, true);
  return axios
    .post(path, data, {
      headers: { "XTR-API-Action": header },
    })
    .then((res) => {
      if (
        res &&
        (res.status === 200 ||
          res.status === 201 ||
          res.status === 202 ||
          res.status === 203 ||
          res.status === 204)
      ) {
        SuccessMsg(res.status);
        refresh();
      }
    })
    .catch((error) => AlertError(error))
    .finally(() => {
      setRecoil(globalSpinner, false); // Set the spinner to false after the API call is done
    });
}

export function customUploadFile({
  customerId,
  docCode,
  folderType,
  folderName,
  file,
  fileToUpload,
  path,
}) {
  let formData = new FormData();

  file && formData.append("file", file);
  fileToUpload && formData.append("fileToUpload", fileToUpload);
  customerId && formData.append("customerId", customerId);
  docCode && formData.append("docCode", docCode);
  folderType && formData.append("folderType", folderType);
  folderName && formData.append("folderName", folderName);

  return axios.post(path, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Xtr-Api-Action": "update",
    },
  });
}

export const getFileUrl = (fileName, attachmentViewType) => {
  return (
    process.env.REACT_APP_BASE_URL +
    API.customerDocumentGet +
    `?attachmentViewType=${attachmentViewType}&&fileName=${fileName}`
  );
};

export const downloadReportFromServer = (url, data) => {
  let params = {};
  if (data) {
    params = data;
  }
  return axios
    .get(
      url,
      {
        params: params,
        responseType: "blob",
      }

      // important
    )
    .then((response) => {
      let filename = "";
      let blob = new Blob([response.data]),
        downloadUrl = window.URL.createObjectURL(blob),
        disposition = response.headers["content-disposition"];
      console.log("disposition", disposition);

      if (disposition && disposition.indexOf("attachment") !== -1) {
        let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
          matches = filenameRegex.exec(disposition);

        if (matches[1]) {
          filename = matches[1].replace(/['"]/g, "");
        }
      }

      let a = document.createElement("a");
      if (typeof a.download === "undefined") {
        window.location.href = downloadUrl;
      } else {
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
      }
    })
    .catch((error) => AlertError(error));
};

import responseHistory from "../mock/response";
import { API_BASE_URL } from "../utl/url";

export const getResponseHistory = async (params) => {
  let body = {
    brand: params.brand,
    log: params.log,
    value: params.value,
  };

  console.log("call api with body:", body);

  /*   const response = await fetch(`${API_BASE_URL}/api/v1/getlog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.text();
  return data; */

  const response = await fetch("https://meowfacts.herokuapp.com", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.text();
  console.log(data);

  console.log(responseHistory);

  return responseHistory;
};

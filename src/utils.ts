import axios from "axios";

export const axiosCall = async (
  url: string,
  method: string,
  data?: object | []
) => {
  let returnedData = [];
  const options = {
    method: method,
    url: `http://localhost:3000${url}`,
    data: data,
    headers: {},
    params: {},
  };
  if (method.toLowerCase() === "get" && data) {
    if (Object.keys(data).length > 0) {
      options.params = data;
    }
  }

  const request = await axios(options);
  returnedData = request.data;

  return returnedData;
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 0,
});
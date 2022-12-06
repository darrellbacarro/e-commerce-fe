import {APICustomResponse} from './types';
export interface ISetCookie {
  cookieName: string;
  value: string;
}

export interface IDeleteCookie {
  cookieName: string;
  path: string;
  domain: string;
}


/**
 * Get cookie in the browser
 * @param {string} name
 * @returns {boolean | string}
 */
 export const getCookie = (name: string): boolean | string => {
  const match: RegExpMatchArray | null = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  if (match) {
    return match[2];
  } else {
    return false;
  }
};

/**
 * Sets cookie in the browser after login
 * @param {string} cookieName
 * @param {string} value
 * @returns {void}
 */
export const setCookie = ({ cookieName, value }: ISetCookie): void => {
  const cookieDuration = 21600;
  document.cookie = `${cookieName}=${value};max-age=${cookieDuration}; path=/`;
};

/**
 * Deletes cookie in the browser after logout
 * @param {string} cookieName
 * @param {string} path
 * @param {string} domain
 * @returns {void}
 */
 export const deleteCookie = ({
  cookieName,
  path,
  domain,
}: IDeleteCookie): void => {
  if (getCookie(cookieName)) {
    document.cookie =
      cookieName +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
};

/**
 * Return message and show notification if an error from the api request occurs
 * @param {unknown} error
 * @param {string} title
 * @returns {number}
 */
export const isError = (error: any, title: string): string => {
  const message: string =
    (error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message) ||
    error.message ||
    error.toString();
  alert({
    title: title,
    message: message,
    autoClose: 3000,
    color: "red",
  });
  return message;
};


export const throwError = (payload: APICustomResponse<{}>) => {
  if (payload.status === "fail") throw new Error(payload.message);
  return true;
};

/**
 * Checks if a given field is empty
 * @param {string} text
 * @param {string} field
 * @returns {boolean}
 */
export const isNotEmpty = (text: string, field: string): boolean => {
  if (!text) throw new Error(`Please add ${field}.`);
  return true;
};
export const isNotNull = (text: string, field: string): boolean => {
  if (text.trim() === '')
    throw new Error(`Field ${field} should not be empty.`);
  return true;
};

export const randomString = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let  output = "";

  for(let x = 0; x < 8; x++) {
   const i = Math.floor(Math.random() * 62);
    output += chars.charAt(i);
  }

  return output;
};
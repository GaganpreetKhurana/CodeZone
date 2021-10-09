import { HOME_MESSAGE } from "./actionTypes";

function getFormBody(params) {
  let FormBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    FormBody.push(encodedKey + "=" + encodedValue);
  }
  return FormBody.join("&");
}

export function home() {
  console.log("function also called");
  return (dispatcher) => {
    const url = "127.0.0.1:8000/";
    fetch(url)
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
      });
  };
}

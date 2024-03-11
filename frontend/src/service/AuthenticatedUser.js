import axios from "axios";
function ApplyingToken(token) {
  if (token) {
    axios.defaults.headers = {
      Authorization: `${token}`,
    };
  }
}

export default { ApplyingToken };

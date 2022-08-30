export default function validator(metod, data) {
  let status;
  switch (metod) {
    case "isRequired":
      status = data.trim() === "";
      break;
    case "isNumber":
      status = !/^\d+$/.test(data);
      break;
    default:
      break;
  }
  return status;
}

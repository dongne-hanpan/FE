export const isValidUsername = (idValue) => {
  var regExp = /^[a-z0-9_]{6,12}$/ 
  return regExp.test(idValue);
}
export const isValidNickname = (asValue) => {
  var regExp = /^[가-힣a-z0-9_-]{2,8}$/;
  return regExp.test(asValue);
}
export const isValidPw = (pwValue) => {
  var regExp = /^(?=.*[a-z])(?=.*[0-9])(?!.*[^a-zA-z0-9]).{8,20}$/;
  return regExp.test(pwValue);
}
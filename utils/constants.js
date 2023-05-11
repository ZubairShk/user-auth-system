const openPaths = ["/api/login-user", "api/register-user"];
function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}
module.exports = { openPaths, AddMinutesToDate };

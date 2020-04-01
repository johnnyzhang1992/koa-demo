const path = require("path");
const filePath = path.join(__dirname, "static/uploads/");

module.exports = {
    mongoURI:"mongodb://localhost:27017",
    tokenSecret: "secret",
    uploadPath: filePath,
    filePath: '/uploads',
    tencentAppId: "",
	tencentSecrectId: "",
	tencentSecretKey: ""
}
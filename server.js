const { initialize } = require("./initialize");
const Port = process.env.PORT || 8080;

initialize().listen(Port, () => {
  console.log(`Server running on port:${Port}`);
});

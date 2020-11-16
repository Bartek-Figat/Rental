const { initialize } = require("./initialize");
const db = require("./db/db.client");
const Port = process.env.PORT || 8080;

initialize().listen(Port, () => {
  db();
  console.log(`Server running on port:${Port}`);
});

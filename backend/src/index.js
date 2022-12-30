const app = require("./app");
const config = require("./web.config");
require("./database");

app.listen(config.PORT, () => console.log(`Run server on port ${config.PORT}`));

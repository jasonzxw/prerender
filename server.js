/*
 * @author: jason_zuo
 * @LastEditors: jason_zuo
 * @LastEditTime: 2023-08-30 12:14:15
 * @FilePath: \prerender\server.js
 */
const path = require("path"),
  port = 3000,
  express = require("express"),
  app = express();
config = require("./config");

console.log(path.join(__dirname + config.ouputdir, "_index.html"));
app.use(express.static(path.join(__dirname + config.ouputdir)));

app.get("*", function (request, response) {
  const spath = path.join(__dirname, config.outputDir, "index.html");
  console.log(spath)
  if (!fs.existsSync(spath)) {
    console.log(
      "file not exist " +
        spath +
        " url:" +
        request.url +
        " referer:" +
        request.headers.referer
    );
    response.sendStatus(404);
  } else {
    response.sendFile(spath, (error) => {
      console.error(
        "Error :" + request.url + " referer:" + request.headers.referer,
        error
      );
    });
  }
});

module.exports = app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

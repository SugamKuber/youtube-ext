const http = require("http");
const ytdl = require("ytdl-core");
const url = require("url");

const app = http
  .createServer((req, res) => {
    const realURL = req.url;
    const mainurl = realURL.split("/");
    const format = mainurl[mainurl.length - 1];
    currentURL = realURL.slice(0, -4);
    const pathname = url.parse(currentURL, true).pathname;
    const queryData = url.parse(currentURL, true).query;
    const videoUrl = queryData.videoUrl;

    console.log("running...");
    if (pathname === "/") {
      res.writeHead(200);
      res.end("hello");
    } else if (pathname === "/download_chrome_ex") {
      if (!videoUrl.includes("www.youtube.com/watch")) {
        res.writeHead(200);
        res.end("This is not a YouTube website");
      } else {
        res.writeHead(200, {
          "Content-Disposition": `attachment; filename="video.${format}"`,
        });
        ytdl(videoUrl, {
          format: format,
        }).pipe(res);
      }
    } else {
      console.log("404");
      res.writeHead(404);
      res.end("404 Not Found");
    }
  })
  .listen(8080);

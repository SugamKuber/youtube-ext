import React from "react";
const URL = "http://127.0.0.1:8080";

function Download() {
  const [value, setValue] = React.useState("mp4");
  const [showDownload, setShowDownload] = React.useState(false);
  const [sucess, setSucess] = React.useState(false);

  const handleFLVChange = () => {
    setValue("flv");
  };
  const handleMP4Change = () => {
    setValue("mp4");
  };
  const handleMOVChange = () => {
    setValue("mov");
  };

  const Downloader = () => {
    setShowDownload(true);
    chrome.notifications.create(
      "Your Download has started",
      {
        type: "basic",
        iconUrl: "...",
        title: "Youtube video downloader",
        message: "Youtube video downloader started, please check downloads",
        buttons: [{ title: "Mark" }, { title: "Ignore" }],
      },
      function callback() {}
    );
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      (tabs) => {
        const url = tabs[0].url;
        const downloadUrl = `${URL}/download_chrome_ex?videoUrl=${url}/${value}`;
        chrome.tabs.create({ url: downloadUrl });
      }
    );

    setSucess(true);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-y-1 gap-x-4">
        <div className="text-center font-extralight text-red-700">
          Choose any file format
        </div>
        <label className="bg-red-400 p-1 rounded-xl w-[60px]">
          <input
            type="radio"
            checked={value === "mp4"}
            onChange={handleMP4Change}
          />
          mp4
        </label>
        <label className="bg-red-400 p-1 rounded-xl w-[60px]">
          <input
            type="radio"
            checked={value === "flv"}
            onChange={handleFLVChange}
          />
          flv
        </label>
        <label className="bg-red-400 p-1 rounded-xl w-[60px]">
          <input
            type="radio"
            checked={value === "mov"}
            onChange={handleMOVChange}
          />
          mov
        </label>
        {!showDownload ? (
          <button
            className="bg-red-400 mt-8 px-4 py-2 rounded-xl text-lg"
            onClick={Downloader}
          >
            Download
          </button>
        ) : (
          <div className="bg-green-400 p-1 rounded-xl">
            Downloading video...
          </div>
        )}
      </div>
      {sucess && (
        <div className="bg-green-400 p-1 rounded-xl">
          {" "}
          Video Downloaded sucessfully
        </div>
      )}
    </>
  );
}

export default Download;

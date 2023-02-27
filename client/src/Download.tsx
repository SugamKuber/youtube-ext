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
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      (tabs) => {
        const url = tabs[0].url;
        const downloadUrl = `${URL}/download_chrome_ex?videoUrl=${url}/${value}`;
        chrome.tabs.create({ url: downloadUrl });
      }
    );
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
    setSucess(true);
  };

  return (
    <>
      <div className="flex justify-center">
        <label>
          <input
            type="radio"
            checked={value === "mp4"}
            onChange={handleMP4Change}
          />
          mp4
        </label>
        <label>
          <label>
            <input
              type="radio"
              checked={value === "flv"}
              onChange={handleFLVChange}
            />
            flv
          </label>
          <input
            type="radio"
            checked={value === "mov"}
            onChange={handleMOVChange}
          />
          mov
        </label>
        {!showDownload ? (
          <button onClick={Downloader}>Download</button>
        ) : (
          <div>Downloading video...</div>
        )}
      </div>
      {sucess && <div> Video Downloaded sucessfully</div>}
    </>
  );
}

export default Download;

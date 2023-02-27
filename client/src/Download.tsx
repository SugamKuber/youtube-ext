import React from "react";
const URL = "http://127.0.0.1:8080";

function Download() {
  const [value, setValue] = React.useState("mp4");

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
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      (tabs) => {
        const url = tabs[0].url;
        const downloadUrl = `${URL}/download_chrome_ex?videoUrl=${url}/${value}`;
        chrome.tabs.create({ url: downloadUrl });
      }
    );
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
        <button onClick={Downloader}>Download</button>
      </div>
    </>
  );
}

export default Download;

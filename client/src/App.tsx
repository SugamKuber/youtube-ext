const URL = "http://127.0.0.1:8080";

function App() {
  const Downloader = () => {
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      (tabs) => {
        const url = tabs[0].url;
        const downloadUrl = `${URL}/download_chrome_ex?videoUrl=${url}`;
        chrome.tabs.create({ url: downloadUrl });
      }
    );
  };
  return (
    <>
      <div>You Tube Dowonloader</div>
      <div className="flex justify-center">
        <button onClick={Downloader}>Download</button>
      </div>
    </>
  );
}

export default App;

const TARGET_URL = "http://localhost:5500";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab?.url?.includes(TARGET_URL)) {
    chrome.cookies.get({ url: "https://velog.io", name: "access_token" }, ({ value: access }) => {
      chrome.cookies.get(
        { url: "https://velog.io", name: "refresh_token" },
        ({ value: refresh }) => {
          chrome.tabs.sendMessage(tabId, { access, refresh });
        }
      );
    });
  }
});

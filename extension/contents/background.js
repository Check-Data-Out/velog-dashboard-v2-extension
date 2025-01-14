const VD_URL = "http://localhost:3000";
const V_URL = "https://velog.io";

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab?.url) {
    const page = {};
    tab?.url
      .replace(/^https?:\/\//, "")
      .split("/")
      .forEach((i, j) => {
        if (j === 0) page["domain"] = i;
        else if (i !== "") page[j] = i;
      });
    console.log(tabId, page);
    const { value: access } = await chrome.cookies.get({ url: V_URL, name: "access_token" });
    const { value: refresh } = await chrome.cookies.get({ url: V_URL, name: "refresh_token" });
    switch (page?.domain) {
      case "velog.io":
        chrome.tabs.sendMessage(tabId, { page, access, refresh });
        break;
      case "localhost:3000":
        chrome.tabs.sendMessage(tabId, { access, refresh });
        break;
    }
  }
});

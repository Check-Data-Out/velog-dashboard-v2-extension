import { createRoot } from "react-dom/client";
import { Analytics, Profile } from "./views";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// CSS 파일 삽입
const link = document.createElement("link");
link.href = chrome.runtime.getURL("velog.css");
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);
const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });

chrome.runtime.onMessage.addListener((props) => {
  const status = document.querySelector("div.UserProfile_followInfo__6z4sT") as HTMLElement;

  if (props.page[1] === "post-stats" && !document.querySelector(".chart")) {
    const root = document.querySelector("div#root")?.childNodes[1];
    const chart = document.createElement("div");
    chart.className = "chart";
    root?.appendChild(chart);
    createRoot(chart).render(
      <div>
        <QueryClientProvider client={client}>
          <Analytics {...props} />
        </QueryClientProvider>
      </div>
    );
  } else if (status && !status.querySelector(".velog-extension")) {
    const item = document.createElement("div");
    item.className = "velog-extension";
    status.appendChild(item);
    const followInfo = document.createElement("div");
    document.querySelectorAll(".UserProfile_info__MFcK0").forEach((i) => {
      followInfo.appendChild(i);
    });
    status.appendChild(followInfo);

    createRoot(item).render(
      <>
        <QueryClientProvider client={client}>
          <Profile {...props} />
        </QueryClientProvider>
      </>
    );
  }
});

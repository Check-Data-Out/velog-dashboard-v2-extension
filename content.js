chrome.runtime.onMessage.addListener(({ access, refresh }) => {
  if (access && refresh) {
    const accessInput = document.querySelector("#access");
    const refreshInput = document.querySelector("#refresh");
    if (accessInput && refreshInput) {
      accessInput.value = access;
      refreshInput.value = refresh;
    }

    const loginButton = document.querySelector("#login");
    if (loginButton) {
      loginButton.click();
    }
  }
});

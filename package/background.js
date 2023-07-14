// Copyright 2022-2023 GlitchyByte
// SPDX-License-Identifier: MIT-0

// Background script.

const actionListener = tab => {
  const tabId = tab.id

  const click = () => {
    chrome.tabs.sendMessage(tabId, { message: "toggle" }, null, response => {
      if (response.iconOn) {
        setIconOn()
      } else {
        setIconOff()
      }
    })
  }

  const setIconOn = () => {
    chrome.action.setIcon({
      path: {
        "16": "/images/iconp16.png",
        "32": "/images/iconp32.png",
        "48": "/images/iconp48.png",
        "128": "/images/iconp128.png"
      },
      tabId: tabId
    })
  }

  const setIconOff = () => {
    chrome.action.setIcon({
      path: {
        "16": "/images/icon16.png",
        "32": "/images/icon32.png",
        "48": "/images/icon48.png",
        "128": "/images/icon128.png"
      },
      tabId: tabId
    })
  }

  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: [ "setup.js" ]
  }).then(click)
}

chrome.action.onClicked.addListener(actionListener)

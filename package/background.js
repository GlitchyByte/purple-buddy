// Copyright 2022 GlitchyByte
// SPDX-License-Identifier: MIT-0

// Background script.

class ClickScript {

    constructor(tabId) {
        this.tabId = tabId
    }

    setup() {
        return new Promise((resolve, reject) => {
            chrome.scripting.executeScript({
                target: { tabId: this.tabId },
                files: [ "setup.js" ]
            }, results => {
                resolve()
            })
        })
    }

    click() {
        chrome.tabs.sendMessage(this.tabId, { message: "toggle" }, null, (response => {
            if (response.iconOn) {
                this.setIconOn()
            } else {
                this.setIconOff()
            }
        }).bind(this))
    }

    setIconOn() {
        chrome.action.setIcon({
            path: {
                "16": "/images/iconp16.png",
                "32": "/images/iconp32.png",
                "48": "/images/iconp48.png",
                "128": "/images/iconp128.png"
            },
            tabId: this.tabId
        })
    }

    setIconOff() {
        chrome.action.setIcon({
            path: {
                "16": "/images/icon16.png",
                "32": "/images/icon32.png",
                "48": "/images/icon48.png",
                "128": "/images/icon128.png"
            },
            tabId: this.tabId
        })
    }
}

chrome.action.onClicked.addListener(tab => {
    const script = new ClickScript(tab.id)
    script.setup().then(() => {
        script.click()
    })
})

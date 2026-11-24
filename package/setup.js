// Copyright 2022-2026 GlitchyByte
// SPDX-License-Identifier: MIT-0

// Embedded setup.

if (location.hostname === "www.twitch.tv" && !window.glitchyBytePurpleBuddyContext) {
  window.glitchyBytePurpleBuddyContext = {
    timerId: null
  }
  const listener = (request, sender, sendResponse) => {
    const context = window.glitchyBytePurpleBuddyContext
    const selectors = [
        // Channel points
        "button[aria-label='Claim Bonus']",
        // Reload player #2000
        "button[aria-label='Play']"
    ]
    if (request.message === "toggle") {
      if (context.timerId === null) {
        context.timerId = setInterval(() => {
          for (const selector of selectors) {
            const element = document.querySelector(selector)
            if (element) {
                element.click()
            }
          }
        }, 3000)
        sendResponse({ iconOn: true })
      } else {
        clearInterval(context.timerId)
        context.timerId = null
        sendResponse({ iconOn: false })
      }
    }
  }
  chrome.runtime.onMessage.addListener(listener)
}

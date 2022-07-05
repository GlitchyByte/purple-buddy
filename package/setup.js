// Copyright 2022 GlitchyByte
// SPDX-License-Identifier: MIT-0

// Embedded setup.

if (document.querySelector(".tw-animated-glitch-logo") && !window.glitchyByteMainFrameContext) {
    // Define.
    class GlitchyByteMainFrameContext {

        constructor() {
            this.timerId = null
            const listener = (request, sender, sendResponse) => {
                switch (request.message) {
                    case "toggle": return this.toggle(request, sendResponse)
                }
            }
            chrome.runtime.onMessage.addListener(listener.bind(this))
        }

        toggle(request, sendResponse) {
            if (this.timerId == null) {
                this.timerId = setInterval(() => {
                    const b = document.querySelector("button[aria-label='Claim Bonus']")
                    if (b) b.click()
                    const r = document.querySelector("button.ScCoreButton-sc-1qn4ixc-0.ScCoreButtonDestructive-sc-1qn4ixc-4")
                    if (r) r.click()
                    const p = document.querySelector("button[aria-label='Play']")
                    if (p) p.click()
                }, 3000)
                sendResponse({ iconOn: true })
            } else {
                clearInterval(this.timerId)
                this.timerId = null
                sendResponse({ iconOn: false })
            }
        }
    }
    // Initialize.
    window.glitchyByteMainFrameContext = new GlitchyByteMainFrameContext()
}

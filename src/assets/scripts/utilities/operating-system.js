const { detect: detectBrowser } = require('detect-browser')

class OperatingSystem {
  static getBrowser() {
    const browser = detectBrowser()

    if (!browser) return "Unknown Browser"

    return browser.name.charAt(0).toUpperCase() + browser.name.slice(1)
  }

  static getName() {
    let OSName = "Unknown OS"
    if (OperatingSystem.isWindows()) OSName = "Windows"
    if (OperatingSystem.isMac()) OSName = "macOS"
    if (OperatingSystem.isUnix()) OSName = "UNIX"
    if (OperatingSystem.isLinux()) OSName = "Linux"
    if (OperatingSystem.isIos()) OSName = "iOS"

    return OSName
  }

  static isMobileDevice() {
    return (
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1
    )
  }

  static isLinux() {
    return navigator.appVersion.indexOf("Linux") != -1
  }

  static isUnix() {
    return navigator.appVersion.indexOf("X11") != -1
  }

  static isMac() {
    return navigator.appVersion.indexOf("Mac") != -1
  }

  static isWindows() {
    return navigator.appVersion.indexOf("Win") != -1
  }

  static isIos() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }
}

export { OperatingSystem }
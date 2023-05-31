const { UAParser } = require('ua-parser-js')

const uaParser = new UAParser(navigator.userAgent)

class OperatingSystem {
  static getBrowser() {
    const browser = uaParser.getBrowser()

    if (!browser) return "Unknown Browser"

    const strBrowser = `${browser.name} ${browser.version}`

    return strBrowser
  }

  static getDevice() {
    const device = uaParser.getDevice()
    if (device.type != undefined)
      return `${device.vendor} ${device.model}`
    
    return this.isMobileDevice() ? "Mobile" : "Desktop"
  }

  static getName() {
    const os = uaParser.getOS()
    return `${os.name} ${os.version}`
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
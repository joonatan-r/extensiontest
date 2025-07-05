
about:debugging#/runtime/this-firefox

REG ADD "HKEY_CURRENT_USER\SOFTWARE\Mozilla\NativeMessagingHosts\<extension name>" /ve /t REG_SZ /d "C:\Users\something\manifest.json" /f

REG ADD "HKEY_CURRENT_USER\SOFTWARE\Mozilla\ManagedStorage\<extension name>" /ve /t REG_SZ /d "C:\Users\something\manifest.json" /f

REG ADD "HKEY_CURRENT_USER\SOFTWARE\Mozilla\PKCS11Modules\<extension name>" /ve /t REG_SZ /d "C:\Users\something\manifest.json" /f

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging

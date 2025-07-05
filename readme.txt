
about:debugging#/runtime/this-firefox

REG ADD "HKEY_CURRENT_USER\SOFTWARE\Mozilla\NativeMessagingHosts\extensiontest" /ve /t REG_SZ /d "C:\Users\something" /f

REG ADD "HKEY_CURRENT_USER\SOFTWARE\Mozilla\ManagedStorage\extensiontest" /ve /t REG_SZ /d "C:\Users\something" /f

REG ADD "HKEY_CURRENT_USER\SOFTWARE\Mozilla\PKCS11Modules\extensiontest" /ve /t REG_SZ /d "C:\Users\something" /f

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging

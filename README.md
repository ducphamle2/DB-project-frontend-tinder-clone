# react-native-chatappSE-mobile
a chatapp school project using react-native as frontend.

The official documentation for react-native installation
https://facebook.github.io/react-native/docs/getting-started.html

Below is what i have collected to be able to fully install and run successfully a react-native application on Android (IOS needs MacOS):
## 1. Install Nodejs + npm. 
  **a) Linux users:** 
  
    ```sudo apt-get install curl / sudo apt install curl ```
    
    ```curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash ``` -
    
    ```sudo apt-get install -y nodejs ```
  the installation source for node is: https://github.com/nodesource/distributions/blob/master/README.md, try to install the latest or the most reliable version
  **b) Window users:**
  
    Download the .exe file and install.
  **check if npm has been installed successfully or not: 
  
  ``` npm --version ```

## 2. Install react-native (for both - after you have installed npm. Check ):

  ```npm install -g react-native-cli```
  
## 3. Install Android Studio :

  **a) Linux users:**
    Install the package then unzip it. Next, enter the **bin** folder through terminal, then run: 
    
    ```./studio.sh```
    
    for installation. Remember to tick Android SDK, Android SDK platform. còn Android Virtual Device for installation.
    
    After finishing, a panel will apprear with a sentence like _Start a new Android Studio project_. Hit configure in the right corner and enter SDK manager. Inside, hit **show package details** and tick important SDK platforms like 28, 27, 26 and 23. Tick SDK tools 23.0.1, 26.0.2, 27.0.1, 27.0.3, 28.0.3 also. Lastly, tick GPU debugging tools, Android SDK Platform-tools, Android SDK tools, Google USB Driver, Android Emulator, Google USB Drive, Intel x86 / Google APIs, Android Support Repository & Google Repository and install all of them.
    
    configure ANDROID_HOME: copy cụm dưới vào $HOME/.profile
    
    ```  export ANDROID_HOME=$HOME/Android/Sdk
      export PATH=$PATH:$ANDROID_HOME/emulator
      export PATH=$PATH:$ANDROID_HOME/tools
      export PATH=$PATH:$ANDROID_HOME/tools/bin
      export PATH=$PATH:$ANDROID_HOME/platform-tools
      
    ```
    => check: 
    
    ``` echo $PATH ```
    
   **b) Cho Windows:**
    It is similar but we need to use .exe file instead of terminal. 
    for ANDROID_HOME configuration in Windows:
    
    https://facebook.github.io/react-native/docs/getting-started.html
    
## 4. chạy react-native project:
    Mỗi project đều có các node modules riêng của nó (node modules kiểu các libraries import vào) thì mỗi lần add modules (ví dụ add module react-native-i18n) thì sẽ npm install module đó. Còn với 1 project pull từ git về sẽ k có node modules và phải install qua: npm install (vào thư mục project). Ngoai ra phai link cac modules vao project qua: react-native link. Neu add them thi type: react-native link <module-name-here>. Possible error: add them 1 module nhung lai dung react-native link => ez to get error.
    
    Để chạy thì cần cắm đt vào or tạo 1 máy ảo (emulator). Cái này tôi suggest tải genymotion về để tạo và chạy máy ảo, vì cái android emulator rất tù và hay lỗi, và giật tung đít nên đừng dùng =)).
    Để connect emulator với app, thì cần install 'adb'. Cách cài trong này: https://www.how2shout.com/how-to/install-adb-on-windows-108-7-linux-command-line.html
    
    để check xem adb đã có chưa với có máy nào connect chưa thì check: adb --version và adb devices. Nếu hiện ra connect rồi thì ngon, còn lỗi thì ggl thôi vì cái này cx phò lắm ...
    
    Đối với Windows, thì cứ react-native run-android / run-ios thì sẽ hiện ra 1 cái nodejs, đợi nó build xong (nếu lỗi thì thử build lại, còn lỗi nữa thì báo tôi vì cái này hay lỗi nhất). Nếu build xong thì nodejs sẽ load, và nếu load được thì sẽ render thành công ở trên máy ảo.
     Đối với Linux, nếu nodejs không hiện ra như của tôi, thì mở 1 terminal nữa ra và chạy: npm start để start server thay cho thg nodejs, và sau đó tương tự
     
# NOTE: react-native run-android / run-ios chỉ chạy được khi đã bật máy ảo / cắm máy vào, node modules đã được install (npm install) 
    

# react-native-chatappSE-mobile
a chatapp school project using react-native as frontend.

The official documentation for react-native installation
https://facebook.github.io/react-native/docs/getting-started.html

Below is what i have collected to be able to fully install and run successfully a react-native application on Android (IOS needs MacOS):
## 1. Install Nodejs + npm. 
  **a) Linux users:**
  
  ```sudo apt-get install curl / sudo apt install curl``` 
  
  ```curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash``` 
  
  ```sudo apt-get install -y nodejs``` 
  
  the installation source for node is: https://github.com/nodesource/distributions/blob/master/README.md, try to install the latest or the most reliable version
  
  **b) Window users:**
  
  Download the .exe file and install.
  **check if npm has been installed successfully or not: ** 
  
  ``` npm --version ```

## 2. Install react-native (for both - after you have installed npm)

  ```npm install -g react-native-cli```
  
## 3. Install Android Studio :

  **a) Linux users:**
  Install the package then unzip it. Next, enter the bin folder through terminal, then run:
  ```./studio.sh```
    
  for installation. Remember to tick Android SDK, Android SDK platform. còn Android Virtual Device for installation.
    
  After finishing, a panel will apprear with a sentence like _Start a new Android Studio project_. Hit configure in the right corner and enter SDK manager. Inside, hit **show package details** and tick important SDK platforms like 28, 27, 26 and 23. Tick SDK tools 23.0.1, 26.0.2, 27.0.1, 27.0.3, 28.0.3 also. Lastly, tick GPU debugging tools, Android SDK Platform-tools, Android SDK tools, Google USB Driver, Android Emulator, Google USB Drive, Intel x86 / Google APIs, Android Support Repository & Google Repository and install all of them.
    
  configure ANDROID_HOME: copy cụm dưới vào $HOME/.profile
    
      export ANDROID_HOME=$HOME/Android/Sdk
      export PATH=$PATH:$ANDROID_HOME/emulator
      export PATH=$PATH:$ANDROID_HOME/tools
      export PATH=$PATH:$ANDROID_HOME/tools/bin
      export PATH=$PATH:$ANDROID_HOME/platform-tools
 
  => check: 
    
  ``` echo $PATH ```
    
    
   **b) Cho Windows:**
    It is similar but we need to use .exe file instead of terminal. 
    for ANDROID_HOME configuration in Windows:
    
    https://facebook.github.io/react-native/docs/getting-started.html
    
## 4. chạy react-native project:
  In order to initate a project. Type command: 
  
  ```react-native init name_of_your_project```
  
**Note: All the steps and commands below must be run inside the folder where you init your react-native project.**

  Each project has its own node modules (dependencies that we can use as components) from the sources outside (github, etc, ...). When pulling a project from github, or adding modules or initiating a project => we need:
  
  ```npm install```
  
  We may also need to link our dependencies with the app, so type: 
  
  ```react-native link```
    
  The app needs a device - an Android mobile phone or an emulator. One suggestion would be installing **Genymotion** for creating an emulator
  
  For connecting our app with the device or the emulator, we need to install **adb**. 
  
  How to install: 
  
  https://www.how2shout.com/how-to/install-adb-on-windows-108-7-linux-command-line.html
  
  Check adb version after installation: 
  
  ```adb --version```
  
  Check if the device or emulator has connected or not: 
  
  ```adb devices```
  
  Lastly, type command: 
  
  ```react-native run-android``` 
  
  to run the project. For **Windows** and **Ubuntu**, a nodejs panel should appear. If not, type: 
  
  ```npm start```
  
  In order to physically install a react-native app on a mobile device, follow this instruction: 
  
  https://facebook.github.io/react-native/docs/signed-apk-android
     
## NOTE: react-native run-android / run-ios chỉ chạy được khi đã bật máy ảo / cắm máy vào, node modules đã được install (npm install) 

# IF YOU ARE TOO LAZY, JUST COME TO ME, I WILL DIRECTLY INSTALL THE APP INTO YOUR PHONE IMMEDIATELY !!

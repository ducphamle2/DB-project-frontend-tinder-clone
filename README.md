# react-native-chatappSE-mobile
a chatapp school project using react-native as frontend.

Nếu các bác muốn tài liệu cài đặt official thì đây và skip readme này lol
https://facebook.github.io/react-native/docs/getting-started.html

Còn không thì đọc bên dưới:
## 1. Cài Nodejs + npm. 
  **a) Cho Linux thì:** 
    ```sudo apt-get install curl / sudo apt install curl ```
    ```curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash ``` -
    ```sudo apt-get install -y nodejs ```
  Tôi copy ở https://github.com/nodesource/distributions/blob/master/README.md, có thể cái 11.x sẽ thay cho version hiện tại
  b) Cho Windows thì:
    Cứ download file xong install .exe như bình thường lol là có npm và node

## 2. Cài react-native (cho cả 2):
  npm install -g react-native-cli
  
## 3. Cài Android Studio (bước mệt mỏi nhất =))):
  a) Cho Linux: 
    Tải package xong unzip ra, vào folder bin bên trong rồi mở terminal trong đó lên, chạy ./studio.sh để install. 
    Có mấy cái qtrong như Android SDK, Android SDK platform. còn Android Virtual Device thì chắc không cần nhưng cứ cài cho chắc.
    Cài xong sẽ ra 1 cái bảng trong đấy có phần 'Start a new Android Studio project' các thứ. Thì ấn vào configure vào SDK manager
    Trong đó, vào SDK Platforms, ấn show package details và tick mấy cái SDK platform chủ chốt như 28, 27, 26, 23 để cài
    Sang đến SDK Tools, tick 23.0.1, 26.0.2, 27.0.1, 27.0.3, 28.0.3. Lí do cài nhiều vì react-native dễ lỗi lắm vì quá nhiều version chồng chéo nhau lol. Tick cả GPU debugging tools, Android SDK Platform-tools, Android SDK tools, Google USB Driver, Android Emulator, Google USB Drive, Intel x86 / Google APIs, Android Support Repository & Google Repository. 
    configure ANDROID_HOME: copy cụm dưới vào $HOME/.profile
      export ANDROID_HOME=$HOME/Android/Sdk
      export PATH=$PATH:$ANDROID_HOME/emulator
      export PATH=$PATH:$ANDROID_HOME/tools
      export PATH=$PATH:$ANDROID_HOME/tools/bin
      export PATH=$PATH:$ANDROID_HOME/platform-tools
      => check xem setup đc chưa = cách echo $PATH
    
   b) Cho Windows:
    Same shit nhưng mà có file .exe thay vì phải dùng terminal. 
    Configure ANDROID_HOME thì đọc trong này là ez https://facebook.github.io/react-native/docs/getting-started.html
    
## 4. chạy react-native project:
    Mỗi project đều có các node modules riêng của nó (node modules kiểu các libraries import vào) thì mỗi lần add modules (ví dụ add module react-native-i18n) thì sẽ npm install module đó. Còn với 1 project pull từ git về sẽ k có node modules và phải install qua: npm install (vào thư mục project). Ngoai ra phai link cac modules vao project qua: react-native link. Neu add them thi type: react-native link <module-name-here>. Possible error: add them 1 module nhung lai dung react-native link => ez to get error.
    
    Để chạy thì cần cắm đt vào or tạo 1 máy ảo (emulator). Cái này tôi suggest tải genymotion về để tạo và chạy máy ảo, vì cái android emulator rất tù và hay lỗi, và giật tung đít nên đừng dùng =)).
    Để connect emulator với app, thì cần install 'adb'. Cách cài trong này: https://www.how2shout.com/how-to/install-adb-on-windows-108-7-linux-command-line.html
    
    để check xem adb đã có chưa với có máy nào connect chưa thì check: adb --version và adb devices. Nếu hiện ra connect rồi thì ngon, còn lỗi thì ggl thôi vì cái này cx phò lắm ...
    
    Đối với Windows, thì cứ react-native run-android / run-ios thì sẽ hiện ra 1 cái nodejs, đợi nó build xong (nếu lỗi thì thử build lại, còn lỗi nữa thì báo tôi vì cái này hay lỗi nhất). Nếu build xong thì nodejs sẽ load, và nếu load được thì sẽ render thành công ở trên máy ảo.
     Đối với Linux, nếu nodejs không hiện ra như của tôi, thì mở 1 terminal nữa ra và chạy: npm start để start server thay cho thg nodejs, và sau đó tương tự
     
# NOTE: react-native run-android / run-ios chỉ chạy được khi đã bật máy ảo / cắm máy vào, node modules đã được install (npm install) 
    

let app = {
    initialize(cb) {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this, cb), false);
    },
    onDeviceReady(cb) {
        screen.orientation.lock('portrait');
        this.initScannerService(cb);
        this.initJPushService();
    },
    initScannerService(cb){
        cordova.plugins.Scanner.setScanCallback(cb);
    },
    initJPushService(){
        try {
            window.JPush.init();
            window.JPush.setDebugMode(true);
            window.setTimeout(this.getRegistrationID, 1000);

            if (device.platform != "Android") {
                window.JPush.setApplicationIconBadgeNumber(0);
            }
            document.addEventListener("jpush.openNotification", this.onOpenNotification, false);
            document.addEventListener("jpush.receiveNotification", this.onReceiveNotification, false);
            document.addEventListener("jpush.receiveMessage", this.onReceiveMessage, false);
        } catch (exception) {
            console.log(exception);
        }
    },
    getRegistrationID() {
        window.JPush.getRegistrationID(function (data) {
            try {
                console.log("JPushPlugin:registrationID is " + data);
            } catch (exception) {
                console.log(exception);
            }
        });
    },
    onOpenNotification(event) {
        try {
            let alertContent;
            if (device.platform == "Android") {
                alertContent = event.alert;
            } else {
                alertContent = event.aps.alert;
            }
            alert("open Notification:" + alertContent);
        } catch (exception) {
            console.log("JPushPlugin:onOpenNotification" + exception);
        }
    },
    onReceiveNotification(event) {
        try {
            let alertContent;
            if (device.platform == "Android") {
                alertContent = event.alert;
            } else {
                alertContent = event.aps.alert;
            }
            $("#notificationResult").html(alertContent);
        } catch (exception) {
            console.log(exception)
        }
    },
    onReceiveMessage(event) {
        try {
            let message;
            if (device.platform == "Android") {
                message = event.message;
            } else {
                message = event.content;
            }
            $("#messageResult").html(message);
        } catch (exception) {
            console.log("JPushPlugin:onReceiveMessage-->" + exception);
        }
    }
};
// app.initialize(cb);

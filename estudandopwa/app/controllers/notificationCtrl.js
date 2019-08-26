var not = document.getElementById('notfy');
not.addEventListener("click", function (e) {
    not.setAttribute = "disabled";
    timer(0, 4); 
});


function timer (count, seconds) {
    if (count < seconds) {
        setTimeout(() => {
            timer();
        }, 1000);
    }else{
        persistentNotification();
        not.removeAttribute = "disabled";
    }
}


// push notification one signal

// descobrindo o id do usuario
OneSignal.push(function () {
    /* These examples are all valid */
    OneSignal.getUserId(function (userId) {
        console.log("OneSignal User ID:", userId);
        // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316    
    });

    OneSignal.getUserId().then(function (userId) {
        console.log("OneSignal User ID:", userId);
        // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316    
    });
});


// uma notificação sendo exibida
// OneSignal.push(function () {
//     OneSignal.on('notificationDisplay', function (event) {
//         console.warn('OneSignal notification displayed:', event);
//     });

//     //This event can be listened to via the `on()` or `once()` listener
// });

// evento ao clicar em uma push notification
OneSignal.push(["addListenerForNotificationOpened", function (data) {
    console.log("Received NotificationOpened:");
    console.log(data);
}]);
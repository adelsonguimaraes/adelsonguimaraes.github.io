var OneSignal = window.OneSignal || [];

OneSignal.push(function () {
    OneSignal.init({
        notificationClickHandlerMatch: 'origin',
        notificationClickHandlerAction: 'focus',
        appId: "794ab791-1bac-46a9-9d98-fb2ad442e13d",
        // requiresUserPrivacyConsent: true,
        autoRegister: false,
        autoResubscribe: true,
        notifyButton: {
            enable: true,
            prenotify: true
        },
        welcomeNotification: {
            "title": "Seja Bem Vindo",
            "message": "Obrigado por se inscrever, avisarei quando houver assuntos importantes!",
            // "url": "" /* Leave commented for the notification to not open a window on Chrome and Firefox (on Safari, it opens to your webpage) */
        },
        // webhooks: {
        //     cors: false, // Defaults to false if omitted
        //     'notification.displayed': 'YOUR_WEBHOOK_URL', // e.g. https://site.com/hook
        //     'notification.clicked': 'YOUR_WEBHOOK_URL',
        //     // ... follow the same format for any event in the list above
        // }
        // allowLocalhostAsSecureOrigin: true,
    });

    // forçando a solicitação de permissão de notificações do cliente
    // OneSignal.showNativePrompt();
    Notification.requestPermission(function (result) {
        console.warn(result);
    });

    // quando uma notificação é exibida na tela do cliente
    OneSignal.on('notificationDisplay', function (event) {
        console.warn('OneSignal notification displayed:', event);
    });

    // getando o identificador do usuario
    OneSignal.getUserId(function (id) { 
        console.log(id) 
    });
    // OneSignal.sendSelfNotification();

    OneSignal.on('notificationPermissionChange', function (permissionChange) {
        var currentPermission = permissionChange.to;
        console.log('New permission state:', currentPermission);
    });
});

// verifcando a permissão de notificação
OneSignal.push(["getNotificationPermission", function (permission) {
    console.log("Site Notification Permission:", permission);
    // (Output) Site Notification Permission: default
}]);

// clicando na notificacao
OneSignal.push(["addListenerForNotificationOpened", function (data) {
    console.log("Received NotificationOpened:");
    console.log(data);
}]);

// quando o usuário ignora uma notificação clicando em [X] close
OneSignal.push(function () {
    OneSignal.on('notificationDisplay', function (event) {
        console.warn('OneSignal notification displayed:', event);
    });

    //This event can be listened to via the `on()` or `once()` listener
});
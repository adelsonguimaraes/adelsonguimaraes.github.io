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
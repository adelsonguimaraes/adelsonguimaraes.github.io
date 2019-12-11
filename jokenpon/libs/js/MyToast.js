const MyToast = {
    me: null,
    timeout: null,
    create: function () {
        var body = document.body;
        var div = document.createElement('div');
        div.id = 'mytoast';
        div.classList.add('mytoast');
        var a = document.createElement('a');
        a.innerHTML = 'Seu texto de Toast aqui';
       
        div.appendChild(a);
        body.appendChild(div);
        MyToast.me = div;
    },
    show: function (text, second) {
        text = (text !== undefined) ? text : 'Seu Texto aqui';
        MyToast.setText( text );
        MyToast.me.classList.add('mytoast-show');
        clearTimeout(MyToast.timeout);
        MyToast.timeout = setTimeout(() => {
            MyToast.close();    
        }, second*1000 || 2000);
    },
    close: function () {
        MyToast.me.classList.remove('mytoast-show');
    },
    setText: function (text) {
        MyToast.me.querySelector('a').innerHTML = text;
    }
}

MyToast.create();
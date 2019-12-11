MyFilter = {
    filters: [],
    temp: [],
    data: [],
    createFilter: function (name, data) {
        filters.push({
            name: name,
            temp: data
        });
    },
    especialCharMask: function (palavra){
        var com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ´`^¨~';
        var sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC     ';
        for (l in palavra) {
            for (l2 in com_acento) {
                if (palavra[l] == com_acento[l2]) {
                    palavra = palavra.replace(palavra[l], sem_acento[l2]);
                }
            }
        }
        return palavra;
    },
    fil: function (val) {
        var f = document.getElementById('filter');
        var str = MyFilter.especialCharMask(f.value).toUpperCase();
        var count = 0;
        for (var i in val) {
            if (typeof(val[i]) === 'string' && MyFilter.especialCharMask(val[i]).toUpperCase().indexOf(str) >= 0) count++;
        }
        return count > 0;
    },
    filter: function () {
        var changes = [];
        changes = Array.prototype.slice.call(this.data);
        changes = changes.filter(this.fil);
        this.temp.splice(0, this.temp.length);
        for (var i in changes) {
            this.temp.push(changes[i]);
        }
        return this.temp;
    },
    watch: function (callback) {
        Array.observe(this.temp, callback);
    },
    start: function (data) {
        this.data = data;
    }
}
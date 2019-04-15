(function () {
    //将数据保存在localStorage中
    var notes = {
        initNotes: function () {
            if(!localStorage.notes){
                localStorage.setItem("notes",JSON.stringify([1,2,3]));
            }
        },
        add: function (obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.setItem("notes",JSON.stringify(data));
        },
        getAllNotes: function () {
            return JSON.parse(localStorage.notes);
        }
    };

    var view = {
        // 初始化
        init: function () {
            var button = document.getElementById('submit');

            button.addEventListener('click', function () {
                view.addNewNote();
            }, false);

            this.render();
        },

        addNewNote: function () {
            control.getNewNote();
            this.render();
        },

        render: function () {
            var ul = document.getElementById('notes');
            var html = '';

            console.log(control.getNotes());
            control.getNotes().forEach(function (value) {
                var text = '';
                text += '<li>' + value + '</li>';
                html += text;
            });

            ul.innerHTML = html;
        }
    };

    var control = {
        init: function () {
            notes.initNotes();
            view.init();
        },

        getNotes: function () {
            return notes.getAllNotes();
        },

        getNewNote: function () {
            var inputValue = document.getElementById('new-note-content').value;
            notes.add(inputValue);
        }
    };

    control.init();

})(window);
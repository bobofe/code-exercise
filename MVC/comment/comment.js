(function () {
    var data = {
        notes : [1,2,3]
    };

    var view = {
        init:function () {
            var button = document.getElementById('submit');

            button.addEventListener('click',function () {
                view.addNewNote();
            },false);

            this.render();
        },

        addNewNote : function () {
            control.getNewNote();
            this.render();
        },

        render : function () {
            var ul = document.getElementById('notes');
            var html = '';

            control.getNotes().forEach(function (value) {
                var text = '';
                text += '<li>'+ value + '</li>';
                html += text;
            });

            ul.innerHTML = html;
        }
    };

    var control = {
        init : function () {
            view.init()
        },

        getNotes : function () {
            return data.notes;
        },

        getNewNote : function () {
            var inputValue = document.getElementById('new-note-content').value;
            data.notes.push(inputValue);
        }

    };

    control.init()
})(window);
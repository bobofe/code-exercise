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

            var html ='';

            control.getInitNotes().forEach(function (value) {
                var text = '';
                text += '<li>'+ value + '</li>';
                html += text;
            });
            this.html = html;
            this.render();

        },

        addNewNote : function () {
            this.html += '<li>' + control.getNewNote() + '</li>';
            this.render();
        },

        render : function () {
            var ul = document.getElementById('notes');
            ul.innerHTML = this.html;
        }
    };

    var control = {
        init : function () {
            view.init()
        },

        getInitNotes : function () {
            return data.notes;
        },

        getNewNote : function () {
            var inputValue = document.getElementById('new-note-content').value;

            return inputValue;
        }

    };

    control.init()
})(window);
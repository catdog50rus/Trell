const Column = {
    idCounter: 4,
    
    // создание новой задачи
    process(columnElement) {
        const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')
        spanAction_addNote.addEventListener('click', function (event) {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.setAttribute('draggable', true);
            noteElement.setAttribute('data-note-id', Note.idCounter);

            Note.idCounter++;

            columnElement.querySelector('[data-notes]').append(noteElement);
            //редактируем задачу в новой карточке
            Note.edit(noteElement);
            noteElement.setAttribute('contenteditable', true);
            noteElement.focus();
        });

        //редактируем заголовок новой карточки
        const headerElement = columnElement.querySelector('.column-header');
        Note.edit(headerElement);

        columnElement.addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        columnElement.addEventListener('drop', function (event) {
            if (Note.dragged) {
                return columnElement.querySelector('[data-notes]').append(Note.dragged);
            }
        })

    },

};


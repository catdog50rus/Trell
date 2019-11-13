const Note = {
    idCounter: 8,
    draggedNote: null,
    
    //редактирование по dblclick
    edit(noteElement) {
        noteElement.addEventListener('dblclick', function (event) {
            noteElement.setAttribute('contenteditable', true);
            noteElement.removeAttribute('draggable');
            noteElement.closest('.column').removeAttribute('draggable');
            noteElement.focus();
        });
        noteElement.addEventListener('blur', function (event) {
            noteElement.removeAttribute('contenteditable');
            noteElement.setAttribute('draggable', true);
            noteElement.closest('.column').setAttribute('draggable', true);

            if (!noteElement.textContent.trim().length) {
                noteElement.remove();
            }
        });
        Note.dragAndDrop(noteElement);
    },

    //перенос задач
    dragAndDrop(noteElement) {
        noteElement.addEventListener('dragstart', Note.dragStart)
        noteElement.addEventListener('dragend', Note.dragEnd)
        noteElement.addEventListener('dragenter', Note.dragEnter)
        noteElement.addEventListener('dragover', Note.dragOver)
        noteElement.addEventListener('dragleave', Note.dragLeave)
        noteElement.addEventListener('drop', Note.drop)
    },
    dragStart(event) {
        Note.dragged = this;
        this.classList.add('dragged');
        event.stopPropagation();

    },
    dragEnd(event) {
        Note.dragged = null;
        this.classList.remove('dragged');
        document.querySelectorAll('.note').forEach(x => x.classList.remove('under'))
    },
    dragEnter(event) {
        if (this === Note.dragged) {
            return;
        };
        this.classList.add('under');
    },
    dragOver(event) {
        event.preventDefault();

        if (this === Note.dragged) {
            return;
        };

    },
    dragLeave(event) {
        if (this === Note.dragged) {
            return;
        };
        this.classList.remove('under');
    },
    drop(event) {
        event.stopPropagation();
        if (this === Note.dragged) {
            return;
        };
        if (this.parentElement === Note.dragged.parentElement) {
            const note = Array.from(this.parentElement.querySelectorAll('.note'))
            const indexA = note.indexOf(this);
            const indexB = note.indexOf(Note.dragged);

            if (indexA < indexB) {
                this.parentElement.insertBefore(Note.dragged, this);
            } 
            else {
                this.parentElement.insertBefore(Note.dragged, this.nextElementSibling);
            }
        } 
        else {
            this.parentElement.insertBefore(Note.dragged, this);
        }
    },
};





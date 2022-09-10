function formReset() {
    document.getElementById('input-text').value = "";
    let priority = document.getElementById('input-priority').value = 1;
}

function show() {
    formReset();

    let listElement = document.getElementById('list');
    listElement.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let newText = data[i].text;
        let newElement = `<li class='list-text list-priority-${data[i].priority}'>
                            <div class="list-text-left">
                                <button class='list-check' onclick='complete(${i})'></button>${newText}
                            </div>
                            <div class="list-text-right">
                                <i class="fa-solid fa-pen-to-square button-edit"></i>
                                <i class="fa-solid fa-trash-can button-destroy" onclick="destroy(${i})"></i>
                            </div>
                          </li>`
        listElement.innerHTML += newElement;
    }
}

function add() {
    let text = document.getElementById('input-text').value;
    if (!text) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Input need to be filled',
        });
    } else if (text.length > 100) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Maximum characters in input is 100',
        });
    } else {
        let priority = document.getElementById('input-priority').value;
        data.push({text, priority});
        show();
        Swal.fire({
            icon: 'success',
            title: 'New Todo',
            text: `${text}`,
        });
    }
    
}

function remove(index) {
    let result = []
    for (let i = 0; i < data.length; i++) {
        if (i !== index) {
            result.push(data[i]);
        }
    }
    data = []
    for (let i = 0; i < result.length; i++) {
        data.push(result[i]);
    }
    result = [];
}

function complete(index) {
    let text = data[index].text;
    remove(index);
    show();
    Swal.fire({
        icon: 'success',
        title: 'Todo complete',
        text: `${text}`
    });
}

function destroy(index) {
    let text = data[index].text;
    remove(index);
    show();
    Swal.fire({
        icon: 'success',
        title: 'Todo is removed',
        text: `${text}`
    });
}

let data = [
    {
        text: "Go to shop",
        priority: 3
    },
    {
        text: "Do homework",
        priority: 1
    },
    {
        text: "Clean up bedroom",
        priority: 2
    },
    {
        text: "Feed fish",
        priority: 1
    },
    {
        text: "Journal",
        priority: 4
    },
];

show();
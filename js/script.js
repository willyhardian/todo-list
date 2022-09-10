function formReset() {
    document.getElementById("input-text-label").innerHTML = "Add Todo";
    document.getElementById("button-cancel").style.display = "none";
    document.getElementById('input-index').value = "";
    document.getElementById('input-text').value = "";
    document.getElementById('input-priority').value = 1;
}

function additionalFeatureReset() {
    document.getElementById('select-filter').value = "";
    sortByAddedStatus = false;
}

function show(no) {
    formReset();
    let listElement = document.getElementById('list');
    listElement.innerHTML = "";
    
    if (no) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].priority === no) {
                
                let newText = data[i].text;
                let newElement = `<li class='list-text list-priority-${data[i].priority}'>
                                    <div class="list-text-left">
                                        <button class='list-check' onclick='complete(${i})'></button>${newText}
                                    </div>
                                    <div class="list-text-right">
                                        <i class="fa-solid fa-pen-to-square button-edit" onclick="edit(${i})"></i>
                                        <i class="fa-solid fa-trash-can button-destroy" onclick="destroy(${i})"></i>
                                    </div>
                                </li>`
                listElement.innerHTML += newElement;
            }
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            let newText = data[i].text;
            let newElement = `<li class='list-text list-priority-${data[i].priority}'>
                                <div class="list-text-left">
                                    <button class='list-check' onclick='complete(${i})'></button>${newText}
                                </div>
                                <div class="list-text-right">
                                    <i class="fa-solid fa-pen-to-square button-edit" onclick="edit(${i})"></i>
                                    <i class="fa-solid fa-trash-can button-destroy" onclick="destroy(${i})"></i>
                                </div>
                            </li>`
            listElement.innerHTML += newElement;
        }
    }
}

function add() {
    let message = "";
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
        let index = document.getElementById('input-index').value;
        
        if (index) {
            message = 'Update todo';
            data[index].text = text;
            data[index].priority = priority;
        } else {
            message = 'New todo';
            data.push({text, priority});
        }
        show();
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
          
        Toast.fire({
            icon: 'success',
            title: message,
            text: `${text}`,
        });
        additionalFeatureReset();
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
    additionalFeatureReset();
}

function complete(index) {
    let text = data[index].text;
    remove(index);
    show();
    additionalFeatureReset();
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
      
    Toast.fire({
        icon: 'success',
        title: 'Todo complete',
        text: `${text}`
    });
}

function destroy(index) {
    let text = data[index].text;
    remove(index);
    show();
    additionalFeatureReset();
    Swal.fire({
        icon: 'success',
        title: 'Todo is removed',
        text: `${text}`
    });
    
}

function edit(index) {
    document.getElementById("input-index").value = index;
    document.getElementById("input-text").value = data[index].text;
    document.getElementById("input-priority").value = data[index].priority;
    document.getElementById("button-cancel").style.display = "inline";
    document.getElementById("input-text-label").innerHTML = "Edit Todo";
}

function sortByAdded() {
    data.reverse();
    show();
    additionalFeatureReset();
}

function filterPriority(params) { 
    let no = Number(params.value)
    if (!no) {
        no = undefined;
    }
    show(no);
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
        text: "Meditation",
        priority: 4
    },
    {
        text: "Buy meat",
        priority: 2
    },
    {
        text: "Workout",
        priority: 1
    },
    {
        text: "Yoga",
        priority: 1
    },
    {
        text: "Public speaking practice",
        priority: 1
    },
    {
        text: "Coding practice",
        priority: 1
    },
];

let sortByAddedStatus = false;

show();
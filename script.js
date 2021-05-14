/**
 * 
 * fakeStoreApi
 * 
 */

// 1- Hacer fetch de productos

fetch('https://fakestoreapi.com/products')//Buscar en esta Url
.then(res=>res.json()) // transformar a json
.then(data=>printList(data)); // De esta información tienes que hacer una acción.

// 2- Generar en el DOM una lista UL/LI con el titulo de cada elemento

const printList = (data) => { //función que imprime información (de la data) dentro del Html

    const ul = document.createElement("ul");
    document.getElementById("lista").appendChild(ul);

    for(let i=0;i<data.length;i++) { //dentro de la llave acciones que se tienen que hacer en cada iteración

        const li = document.createElement("li");
        ul.appendChild(li);
        const litxt = document.createTextNode(`Id: ${data[i].id}, Title: ${data[i].title}`)
        li.appendChild(litxt);

    }
    
}

const printList2 = (data) => { //función que imprime información (de la data) dentro del Html
    const lista2 = document.getElementById("lista2");

    for(let i=0;i<data.length;i++) { //dentro de la llave acciones que se tienen que hacer en cada iteración

        const img = document.createElement("img");
        img.setAttribute("src",data[i].image)
        img.setAttribute("class","producto")
        lista2.appendChild(img);


    }
    
}


// 3 - Hacer un fetch a fakestoreapi para obtener las categorías de productos

fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(data=>printSelect(data))

// 4 - Generar en el DOM un <select> que contenga en sus opciones los nombres de las categorías en fakestoreapi. 

const printSelect = (data) => {

    const label= document.createElement("label");
    const labelTxt = document.createTextNode("Elige una categoría");
    label.setAttribute("for","selectName")
    label.appendChild(labelTxt)
    

    const select = document.createElement("select");
    select.setAttribute("name","selectName")
    select.setAttribute("id","selectId")

    document.getElementById("header").appendChild(label);
    document.getElementById("header").appendChild(select);

    const optionAll = document.createElement("option");
    select.appendChild(optionAll);
    const optionAllTxt = document.createTextNode("Todas las categorías");
    optionAll.appendChild(optionAllTxt);
    optionAll.setAttribute("value", "Todas las categorías");

    for(let i=0;i<data.length;i++) {

        const option = document.createElement("option");
        select.appendChild(option);
        const optionTxt = document.createTextNode (`${data[i]}`);
        option.appendChild(optionTxt);
        option.setAttribute("value", `${data[i]}`);
        
    }

    // 5 - Al seleccionar una categoría nuestra app deberá hacer un nuevo fetch a fakestoreapi para obtener solo los productos correspondientes a esa categoría. La primera opción de nuestro <select> deberá ser "Todas las categorías".

    document.getElementById("selectId").addEventListener("change", (event) => {

        if(event.target.value == "Todas las categorías") {

            document.querySelector("#lista > ul:nth-child(1)").remove()

            fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>printList(data)) 

        } else {

            document.querySelector("#lista > ul:nth-child(1)").remove()

            fetch(`https://fakestoreapi.com/products/category/${event.target.value}`)
            .then(res=>res.json())
            .then(data=>printList(data))
        }

    })
    
}


fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(data=>printList2(data)) 

// Chequear estructura de la respuesta:
// http://jsonviewer.stack.hu/



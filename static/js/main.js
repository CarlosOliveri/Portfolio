document.getElementById("myForm").addEventListener("submit",function (event){
    event.preventDefault();

    const formData = new FormData(this);

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const numero = document.getElementById("numero").value;
    const mensaje = document.getElementById("mensaje").value;

    const data = {
        nombre: nombre,
        email: email,
        telefono: numero,
        mensaje: mensaje,
      };

    fetch("/enviar",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => {
        if (response.ok) {
            alert("Mensaje enviado correctamente");
        }else{
            alert("Error al enviar el mensaje, por favor intente de nuevo más tarde, o contáctenos por otro medio.");
        }
        return response.json();
    }
    );
})

const cardElements = document.getElementsByClassName("blur-div")
for (let i = 0; i < cardElements.length; i++) {
    cardElements[i].addEventListener('mouseenter', function() {
        console.log('encima');

        const container = cardElements[i].parentElement;
        const tecs = container.querySelector(".tec-used");
        const img = container.querySelector(".img-project");

        tecs.style.visibility = "visible";
        img.style.opacity = 0.4;
    });
}

for (let i = 0; i < cardElements.length; i++) {
    cardElements[i].addEventListener('mouseleave', function() {
        console.log('fuera');

        const container = cardElements[i].parentElement;
        const tecs = container.querySelector(".tec-used");
        const img = container.querySelector(".img-project");

        tecs.style.visibility = "hidden";  
        img.style.opacity = 1;      
    });
}

const elementosAnimados = document.querySelectorAll('.animada');

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');
    } else {
      entrada.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.15 // Se activa cuando al menos 15% del elemento es visible
});

elementosAnimados.forEach(el => observer.observe(el));

//contraseña de encriptacion de url
//w:#nilointentes@4u70
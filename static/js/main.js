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

//Niveles de conocimiento
const html_level = 0.8;
const css_level = 0.8;
const js_level = 0.9;
const py_level = 0.9;
const cpp_level = 0.7;
const git_level = 0.6;
const react_level = 0.9;
const micro_level = 0.8;
const arduino_level = 0.9;

const iconElements = document.querySelectorAll('.tec-am-ic-to-blur') ;
iconElements.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        const container = icon.parentElement;
        const tecs = container.querySelector(".prog-bar");
        const icon1 = container.querySelector("i,img");

        tecs.style.visibility = "visible";
        icon1.style.opacity = 0.4;
        icon1.style.transform = "scale(0.5)";
        javascriptBar.animate(js_level);
        htmlBar.animate(html_level);
        pythonBar.animate(py_level);
        cplusBar.animate(cpp_level);
        reactBar.animate(react_level);
        microBar.animate(micro_level);
        arduinoBar.animate(arduino_level);
        gitBar.animate(git_level);
        cssBar.animate(css_level);
    });
    icon.addEventListener('mouseleave', () => {
        const container = icon.parentElement;
        const tecs = container.querySelector(".prog-bar");
        const icon1 = container.querySelector("i,img");

        tecs.style.visibility = "hidden";     
        icon1.style.opacity = 1;
        icon1.style.transform = "scale(1)";
        javascriptBar.animate(0);
        htmlBar.animate(0);
        pythonBar.animate(0);
        cplusBar.animate(0);
        reactBar.animate(0);
        microBar.animate(0);
        arduinoBar.animate(0);
        gitBar.animate(0);
        cssBar.animate(0);
    });
});

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


var htmlBar = new ProgressBar.Circle('#html-bar', {
    color: '#60a5fa', // Amarillo
    trailColor: 'transparent',
    strokeWidth: 20,
    trailWidth: 20,
    duration: 1000,
    easing: 'easeInOut',
    text: {
        value: html_level*100 + '%',
        style: {
            color: '#ffffff',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            margin: '0',
            fontSize: '16px',
        }
    }
});
htmlBar.animate(0); // 80% de conocimiento

var cssBar = new ProgressBar.Circle('#css-bar', {
    color: '#60a5fa', // Amarillo
    trailColor: 'transparent',
    strokeWidth: 20,
    trailWidth: 4,
    duration: 1000,
    easing: 'easeInOut',
    text: {
        value: css_level*100 + '%',
        style: {
            color: '#ffffff',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            margin: '0',
            fontSize: '16px',
        }
    }
});
cssBar.animate(0); // 80% de conocimiento

var javascriptBar = new ProgressBar.Circle('#js-bar', {
    color: '#60a5fa', // Amarillo
    trailColor: 'transparent',
    strokeWidth: 20,
    trailWidth: 4,
    duration: 1000,
    easing: 'easeInOut',
    text: {
        value: js_level*100 + '%',
        style: {
            color: '#ffffff',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            margin: '0',
            fontSize: '16px',
        }
    }
});
javascriptBar.animate(0); // 80% de conocimiento

var pythonBar = new ProgressBar.Circle('#python-bar', {
    color: '#60a5fa', // Amarillo
    trailColor: 'transparent',
    strokeWidth: 20,
    trailWidth: 4,
    duration: 1000,
    easing: 'easeInOut',
    text: {
        value: py_level*100 + '%',
        style: {
            color: '#ffffff',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            margin: '0',
            fontSize: '16px',
        }
    }
});
pythonBar.animate(0); // 80% de conocimiento

var cplusBar = new ProgressBar.Circle('#cplus-bar', {
    color: '#60a5fa', // Amarillo
    trailColor: 'transparent',
    strokeWidth: 20,
    trailWidth: 4,
    duration: 1000,
    easing: 'easeInOut',
    text: {
        value: cpp_level*100 + '%',
        style: {
            color: '#ffffff',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            margin: '0',
            fontSize: '16px',
        }
    }
});
cplusBar.animate(0); // 80% de conocimiento

var reactBar = new ProgressBar.Circle('#react-bar', {
    color: '#60a5fa', // Amarillo
    trailColor: 'transparent',
    strokeWidth: 20,
    trailWidth: 4,
    duration: 1000,
    easing: 'easeInOut',
    text: {
        value: react_level*100 + '%',
        style: {
            color: '#ffffff',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            margin: '0',
            fontSize: '16px',
        }
    }
});
reactBar.animate(0); // 80% de conocimiento

var microBar = new ProgressBar.Circle('#micro-bar', {
    color: '#60a5fa', // Amarillo
    trailColor: 'transparent',
    strokeWidth: 20,
    trailWidth: 4,
    duration: 1000,
    easing: 'easeInOut',
    text: {
        value: micro_level*100 + '%',
        style: {
            color: '#ffffff',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            margin: '0',
            fontSize: '16px',
        }
    }
});
microBar.animate(0); // 80% de conocimiento

var arduinoBar = new ProgressBar.Circle('#arduino-bar', {
    color: '#60a5fa', // Amarillo
    trailColor: 'transparent',
    strokeWidth: 20,
    trailWidth: 4,
    duration: 1000,
    easing: 'easeInOut',
    text: {
        value: arduino_level*100 + '%',
        style: {
            color: '#ffffff',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            margin: '0',
            fontSize: '16px',
        }
    }
});
arduinoBar.animate(0); // 80% de conocimiento

var gitBar = new ProgressBar.Circle('#git-bar', {
    color: '#60a5fa', // Amarillo
    trailColor: 'transparent',
    strokeWidth: 20,
    trailWidth: 4,
    duration: 1000,
    easing: 'easeInOut',
    text: {
        value: git_level*100 + '%',
        style: {
            color: '#ffffff',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            margin: '0',
            fontSize: '16px',
        }
    }
});
gitBar.animate(0); // 80% de conocimiento

//contraseña de encriptacion de url
//w:#nilointentes@4u70
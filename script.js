// Datos de ejemplo para los libros
const libros = [
    {
        id: 1,
        titulo: "Cien Años de Soledad",
        autor: "Gabriel García Márquez",
        categoria: "Literatura",
        descripcion: "Una obra maestra del realismo mágico que narra la historia de la familia Buendía en el pueblo ficticio de Macondo."
    },
    {
        id: 2,
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        categoria: "Literatura Clásica",
        descripcion: "La obra cumbre de la literatura española que sigue las aventuras del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza."
    },
    {
        id: 3,
        titulo: "Rayuela",
        autor: "Julio Cortázar",
        categoria: "Literatura",
        descripcion: "Una novela innovadora que puede leerse de forma lineal o siguiendo un tablero de dirección, explorando el amor y la existencia."
    },
    {
        id: 4,
        titulo: "La Sombra del Viento",
        autor: "Carlos Ruiz Zafón",
        categoria: "Misterio",
        descripcion: "Una novela de misterio ambientada en la Barcelona de posguerra, donde un joven descubre un libro maldito que cambiará su vida."
    },
    {
        id: 5,
        titulo: "Física Universitaria",
        autor: "Sears y Zemansky",
        categoria: "Ciencia",
        descripcion: "Libro de texto fundamental para el estudio de la física a nivel universitario, con explicaciones claras y ejercicios prácticos."
    },
    {
        id: 6,
        titulo: "Breve Historia del Tiempo",
        autor: "Stephen Hawking",
        categoria: "Ciencia",
        descripcion: "Una exploración accesible de conceptos complejos como los agujeros negros, el Big Bang y la naturaleza del tiempo."
    },
    {
        id: 7,
        titulo: "Orgullo y Prejuicio",
        autor: "Jane Austen",
        categoria: "Literatura Romántica",
        descripcion: "Una comedia romántica que explora las costumbres y la vida de la clase alta inglesa durante el siglo XIX."
    },
    {
        id: 8,
        titulo: "Little Women",
        autor: "Louisa May Alcott",
        categoria: "Literatura",
        descripcion: "La conmovedora historia de cuatro hermanas que crecen durante la Guerra Civil estadounidense."
    }
];

// Categorías disponibles
const categorias = [
    "Literatura",
    "Ciencia",
    "Historia",
    "Filosofía",
    "Arte",
    "Tecnología",
    "Misterio",
    "Literatura Clásica",
    "Literatura Romántica"
];

// Función para crear partículas
function crearParticulas() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño y posición aleatorios
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10;
        const animationDelay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Función para cargar libros en la página
function cargarLibros(librosACargar = libros) {
    const booksGrid = document.getElementById('books-grid');
    booksGrid.innerHTML = '';

    if (librosACargar.length === 0) {
        booksGrid.innerHTML = '<p class="no-results">No se encontraron libros. Intenta con otros términos de búsqueda.</p>';
        return;
    }

    librosACargar.forEach((libro, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.style.animationDelay = `${index * 0.1}s`;
        bookCard.innerHTML = `
            <div class="book-cover">${libro.titulo}</div>
            <div class="book-info">
                <div class="book-title">${libro.titulo}</div>
                <div class="book-author">${libro.autor}</div>
                <div class="book-category">${libro.categoria}</div>
                <div class="book-actions">
                    <a href="#" class="btn leer-btn" data-id="${libro.id}">Leer</a>
                    <a href="#" class="detalles-btn" data-id="${libro.id}">Detalles</a>
                </div>
            </div>
        `;
        booksGrid.appendChild(bookCard);
    });

    // Agregar event listeners a los botones
    document.querySelectorAll('.leer-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-id'));
            leerLibro(id);
        });
    });

    document.querySelectorAll('.detalles-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-id'));
            mostrarDetalles(id);
        });
    });
}

// Función para cargar categorías
function cargarCategorias() {
    const categoriesGrid = document.getElementById('categories-grid');
    categoriesGrid.innerHTML = '';

    categorias.forEach((categoria, index) => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.style.animationDelay = `${index * 0.1}s`;
        categoryCard.textContent = categoria;
        categoryCard.addEventListener('click', () => {
            // Efecto de clic
            categoryCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                categoryCard.style.transform = '';
                filtrarPorCategoria(categoria);
            }, 150);
        });
        categoriesGrid.appendChild(categoryCard);
    });
}

// Función para filtrar libros por categoría
function filtrarPorCategoria(categoria) {
    const librosFiltrados = libros.filter(libro => libro.categoria === categoria);
    cargarLibros(librosFiltrados);
    
    // Scroll suave a la sección de catálogo
    document.getElementById('catalogo').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Función para simular la lectura de un libro
function leerLibro(id) {
    const libro = libros.find(l => l.id === id);
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <h3>📖 Leyendo: "${libro.titulo}"</h3>
                <p>Esta funcionalidad simula la lectura del libro. En una implementación real, aquí se integraría un visor de PDF o EPUB.</p>
                <div class="modal-actions">
                    <button class="btn" onclick="cerrarModal()">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Función para mostrar detalles de un libro
function mostrarDetalles(id) {
    const libro = libros.find(l => l.id === id);
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <h3>${libro.titulo}</h3>
                <p><strong>Autor:</strong> ${libro.autor}</p>
                <p><strong>Categoría:</strong> ${libro.categoria}</p>
                <p><strong>Descripción:</strong> ${libro.descripcion}</p>
                <div class="modal-actions">
                    <button class="btn" onclick="leerLibro(${libro.id})">Leer Libro</button>
                    <button class="btn secundario" onclick="cerrarModal()">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Función para cerrar modales
function cerrarModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Funcionalidad de búsqueda
function inicializarBusqueda() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    searchButton.addEventListener('click', realizarBusqueda);
    searchInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            realizarBusqueda();
        }
    });

    // Efecto de focus en la búsqueda
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    searchInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
}

function realizarBusqueda() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    
    if(searchTerm !== '') {
        const resultados = libros.filter(libro => 
            libro.titulo.toLowerCase().includes(searchTerm) || 
            libro.autor.toLowerCase().includes(searchTerm) ||
            libro.categoria.toLowerCase().includes(searchTerm)
        );
        
        cargarLibros(resultados);
        
        // Scroll a resultados
        document.getElementById('catalogo').scrollIntoView({ 
            behavior: 'smooth' 
        });
    } else {
        cargarLibros(); // Recargar todos los libros si la búsqueda está vacía
    }
}

// Efecto de scroll en el header
function inicializarScrollHeader() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
}

// Estilos para modales y efectos (agregar al CSS)
const modalStyles = `
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease-out;
}

.modal {
    background: linear-gradient(135deg, #ffffff 0%, #fdf9fb 100%);
    padding: 2.5rem;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    animation: modalSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 1px solid #f8e4ef;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.7) translateY(-50px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.modal h3 {
    color: #d4a5c5;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
}

.modal p {
    margin-bottom: 1rem;
    line-height: 1.6;
}

.modal strong {
    color: #ff6b93;
}

.modal-actions {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.btn.secundario {
    background: #f8e4ef;
    color: #8a6b7a;
}

.btn.secundario:hover {
    background: #e8c1d4;
}

.no-results {
    text-align: center;
    grid-column: 1 / -1;
    color: #b8a1ad;
    font-size: 1.3rem;
    padding: 3rem;
    animation: fadeIn 0.6s ease-out;
}
</style>
`;

// Observador de intersección para animaciones al hacer scroll
function inicializarIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar todos los elementos con animación
    document.querySelectorAll('.book-card, .category-card').forEach(el => {
        observer.observe(el);
    });
}

// Inicializar la página cuando se carga
document.addEventListener('DOMContentLoaded', function() {
    // Agregar estilos de modal
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    // Crear partículas
    crearParticulas();
    
    // Cargar contenido
    cargarLibros();
    cargarCategorias();
    
    // Inicializar funcionalidades
    inicializarBusqueda();
    inicializarScrollHeader();
    inicializarIntersectionObserver();
    
    // Cerrar modal al hacer clic fuera o con ESC
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            cerrarModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarModal();
        }
    });

    // Efecto de carga inicial
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Efecto de carga suave
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';

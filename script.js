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
    "Literatura Clásica"
];

// Función para cargar libros en la página
function cargarLibros() {
    const booksGrid = document.getElementById('books-grid');
    booksGrid.innerHTML = '';

    libros.forEach(libro => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover">${libro.titulo}</div>
            <div class="book-info">
                <div class="book-title">${libro.titulo}</div>
                <div class="book-author">${libro.autor}</div>
                <div class="book-actions">
                    <a href="#" class="btn" onclick="leerLibro(${libro.id})">Leer</a>
                    <a href="#" onclick="mostrarDetalles(${libro.id})">Detalles</a>
                </div>
            </div>
        `;
        booksGrid.appendChild(bookCard);
    });
}

// Función para cargar categorías
function cargarCategorias() {
    const categoriesGrid = document.getElementById('categories-grid');
    categoriesGrid.innerHTML = '';

    categorias.forEach(categoria => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.textContent = categoria;
        categoryCard.addEventListener('click', () => {
            filtrarPorCategoria(categoria);
        });
        categoriesGrid.appendChild(categoryCard);
    });
}

// Función para filtrar libros por categoría
function filtrarPorCategoria(categoria) {
    const librosFiltrados = libros.filter(libro => libro.categoria === categoria);
    
    const booksGrid = document.getElementById('books-grid');
    booksGrid.innerHTML = '';

    if (librosFiltrados.length === 0) {
        booksGrid.innerHTML = '<p>No hay libros en esta categoría.</p>';
        return;
    }

    librosFiltrados.forEach(libro => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover">${libro.titulo}</div>
            <div class="book-info">
                <div class="book-title">${libro.titulo}</div>
                <div class="book-author">${libro.autor}</div>
                <div class="book-actions">
                    <a href="#" class="btn" onclick="leerLibro(${libro.id})">Leer</a>
                    <a href="#" onclick="mostrarDetalles(${libro.id})">Detalles</a>
                </div>
            </div>
        `;
        booksGrid.appendChild(bookCard);
    });
}

// Función para simular la lectura de un libro
function leerLibro(id) {
    const libro = libros.find(l => l.id === id);
    alert(`Abriendo: "${libro.titulo}" de ${libro.autor}`);
    // En una implementación real, aquí se abriría el libro en un visor
}

// Función para mostrar detalles de un libro
function mostrarDetalles(id) {
    const libro = libros.find(l => l.id === id);
    alert(`Detalles de: "${libro.titulo}"\nAutor: ${libro.autor}\nCategoría: ${libro.categoria}\n\n${libro.descripcion}`);
}

// Funcionalidad de búsqueda
function inicializarBusqueda() {
    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');
    
    searchButton.addEventListener('click', realizarBusqueda);
    searchInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            realizarBusqueda();
        }
    });
}

function realizarBusqueda() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase().trim();
    
    if(searchTerm !== '') {
        const resultados = libros.filter(libro => 
            libro.titulo.toLowerCase().includes(searchTerm) || 
            libro.autor.toLowerCase().includes(searchTerm) ||
            libro.categoria.toLowerCase().includes(searchTerm)
        );
        
        if (resultados.length > 0) {
            const booksGrid = document.getElementById('books-grid');
            booksGrid.innerHTML = '';
            
            resultados.forEach(libro => {
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                bookCard.innerHTML = `
                    <div class="book-cover">${libro.titulo}</div>
                    <div class="book-info">
                        <div class="book-title">${libro.titulo}</div>
                        <div class="book-author">${libro.autor}</div>
                        <div class="book-actions">
                            <a href="#" class="btn" onclick="leerLibro(${libro.id})">Leer</a>
                            <a href="#" onclick="mostrarDetalles(${libro.id})">Detalles</a>
                        </div>
                    </div>
                `;
                booksGrid.appendChild(bookCard);
            });
        } else {
            alert('No se encontraron libros que coincidan con tu búsqueda.');
        }
    }
}

// Inicializar la página cuando se carga
document.addEventListener('DOMContentLoaded', function() {
    cargarLibros();
    cargarCategorias();
    inicializarBusqueda();
});
// Datos de libros CON PDFs
const libros = [
    {
        id: 1,
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        categoria: "Literatura Clásica",
        descripcion: "La obra cumbre de la literatura española que sigue las aventuras del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza.",
        pdfUrl: "pdf/don_quijote.pdf",
        tienePDF: true
    },
    {
        id: 2,
        titulo: "El Aleph",
        autor: "Jorge Luis Borges",
        categoria: "Literatura",
        descripcion: "Colección de cuentos que exploran temas de infinito, tiempo y realidad, incluyendo el famoso cuento 'El Aleph'.",
        pdfUrl: "pdf/el_aleph.pdf",
        tienePDF: true
    },
    {
        id: 3,
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry", 
        categoria: "Literatura Infantil",
        descripcion: "Fábula poética sobre un niño que vive en un asteroide y explora temas de amistad, amor y pérdida.",
        pdfUrl: "pdf/el_principito.pdf",
        tienePDF: true
    },
    {
        id: 4,
        titulo: "Orgullo y Prejuicio",
        autor: "Jane Austen",
        categoria: "Literatura Romántica", 
        descripcion: "Una comedia romántica que explora las costumbres y la vida de la clase alta inglesa durante el siglo XIX.",
        pdfUrl: "pdf/orgullo_prejuicio.pdf",
        tienePDF: true
    },
    {
        id: 5,
        titulo: "Frankenstein",
        autor: "Mary Shelley",
        categoria: "Ciencia Ficción",
        descripcion: "Clásico de terror gótico sobre la creación de vida artificial y las consecuencias de jugar a ser Dios.",
        pdfUrl: "pdf/frankenstein.pdf", 
        tienePDF: true
    },
    {
        id: 6,
        titulo: "La Metamorfosis",
        autor: "Franz Kafka",
        categoria: "Literatura",
        descripcion: "Relato sobre Gregorio Samsa, quien una mañana amanece convertido en un monstruoso insecto.",
        pdfUrl: "pdf/la_metamorfosis.pdf",
        tienePDF: true
    },
    {
        id: 7,
        titulo: "Drácula",
        autor: "Bram Stoker",
        categoria: "Terror",
        descripcion: "Novela epistolar que narra los intentos del Conde Drácula por mudarse de Transilvania a Inglaterra.",
        pdfUrl: "pdf/dracula.pdf",
        tienePDF: true
    },
    {
        id: 8,
        titulo: "Romeo y Julieta",
        autor: "William Shakespeare",
        categoria: "Teatro",
        descripcion: "Tragedia romántica sobre dos jóvenes amantes cuyas muertes reconcilian a sus familias enemistadas.",
        pdfUrl: "pdf/romeo_julieta.pdf",
        tienePDF: true
    }
    // AÑADE MÁS LIBROS AQUÍ - TODOS APARECERÁN EN LA PÁGINA PRINCIPAL
];

// Categorías disponibles - SIN ARTE, TECNOLOGÍA NI MISTERIO
const categorias = [
    "Literatura Clásica",
    "Literatura", 
    "Literatura Infantil",
    "Literatura Romántica",
    "Ciencia Ficción",
    "Terror",
    "Teatro",
    "Filosofía",
    "Ciencia",
    "Historia"
];

// Sistema de modo oscuro
function inicializarModoOscuro() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Cambiar modo claro/oscuro');
    document.body.appendChild(themeToggle);

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Función para cargar libros en la página - AHORA MUESTRA TODOS
function cargarLibros(librosACargar = libros) {
    const booksGrid = document.getElementById('books-grid');
    booksGrid.innerHTML = '';

    if (librosACargar.length === 0) {
        booksGrid.innerHTML = '<p class="no-results">No se encontraron libros. Intenta con otros términos de búsqueda.</p>';
        return;
    }

    // Actualizar el título para mostrar el total de libros
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        if (librosACargar.length === libros.length) {
            sectionTitle.textContent = `Todos Nuestros Libros (${libros.length})`;
        } else {
            sectionTitle.textContent = `Libros Encontrados (${librosACargar.length})`;
        }
    }

    librosACargar.forEach((libro, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.style.animationDelay = `${index * 0.1}s`;
        
        const badgePDF = libro.tienePDF ? '<span class="pdf-badge">PDF</span>' : '';
        
        bookCard.innerHTML = `
            <div class="book-cover">
                ${badgePDF}
                <div>${libro.titulo}</div>
            </div>
            <div class="book-info">
                <div class="book-title">${libro.titulo}</div>
                <div class="book-author">${libro.autor}</div>
                <div class="book-category">${libro.categoria}</div>
                <div class="book-actions">
                    ${libro.tienePDF ? 
                        `<a href="#" class="btn leer-pdf-btn" data-id="${libro.id}">Leer PDF</a>` : 
                        `<a href="#" class="btn leer-btn" data-id="${libro.id}">Leer</a>`
                    }
                    <a href="#" class="detalles-btn" data-id="${libro.id}">Detalles</a>
                    ${libro.tienePDF ? 
                        `<a href="${libro.pdfUrl}" class="descargar-btn" download>Descargar</a>` : 
                        ''
                    }
                </div>
            </div>
        `;
        booksGrid.appendChild(bookCard);
    });

    // Agregar event listeners
    document.querySelectorAll('.leer-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-id'));
            leerLibro(id);
        });
    });

    document.querySelectorAll('.leer-pdf-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-id'));
            leerPDF(id);
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

// Función para leer PDF
function leerPDF(id) {
    const libro = libros.find(l => l.id === id);
    
    if (!libro.tienePDF) {
        mostrarModalError('Este libro no tiene PDF disponible.');
        return;
    }

    // Abrir PDF en nueva pestaña
    const pdfWindow = window.open(libro.pdfUrl, '_blank');
    
    // Verificar si se pudo abrir
    if (!pdfWindow || pdfWindow.closed || typeof pdfWindow.closed == 'undefined') {
        mostrarModalError('No se pudo abrir el PDF. Puede que el archivo no exista o el navegador bloqueó la ventana emergente.');
    }
}

// Función para mostrar error
function mostrarModalError(mensaje) {
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <h3>❌ Error</h3>
                <p>${mensaje}</p>
                <div class="modal-actions">
                    <button class="btn secundario" onclick="cerrarModal()">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Función para cargar categorías - SIN ARTE, TECNOLOGÍA NI MISTERIO
function cargarCategorias() {
    const categoriesGrid = document.getElementById('categories-grid');
    categoriesGrid.innerHTML = '';

    categorias.forEach((categoria, index) => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.style.animationDelay = `${index * 0.1}s`;
        categoryCard.textContent = categoria;
        categoryCard.addEventListener('click', () => {
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
    
    document.getElementById('catalogo').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Función para mostrar todos los libros (resetear filtro)
function mostrarTodosLosLibros() {
    cargarLibros(libros);
    
    document.getElementById('catalogo').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Función para simular la lectura de un libro (sin PDF)
function leerLibro(id) {
    const libro = libros.find(l => l.id === id);
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <h3>📖 ${libro.titulo}</h3>
                <p>Este libro actualmente no tiene versión PDF disponible.</p>
                <p><strong>Disponible pronto en formato digital.</strong></p>
                <div class="modal-actions">
                    <button class="btn secundario" onclick="cerrarModal()">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Función para mostrar detalles de un libro
function mostrarDetalles(id) {
    const libro = libros.find(l => l.id === id);
    const pdfInfo = libro.tienePDF ? 
        `<p><strong>Formato:</strong> PDF disponible</p>
         <p><strong>Acciones:</strong> Leer online o descargar</p>` : 
        `<p><strong>Formato:</strong> Próximamente en PDF</p>`;
    
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <h3>${libro.titulo}</h3>
                <p><strong>Autor:</strong> ${libro.autor}</p>
                <p><strong>Categoría:</strong> ${libro.categoria}</p>
                ${pdfInfo}
                <p><strong>Descripción:</strong> ${libro.descripcion}</p>
                <div class="modal-actions">
                    ${libro.tienePDF ? 
                        `<button class="btn" onclick="leerPDF(${libro.id})">Leer PDF</button>
                         <a href="${libro.pdfUrl}" class="btn" download>Descargar</a>` : 
                        `<button class="btn" onclick="leerLibro(${libro.id})">Más Información</button>`
                    }
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
        
        document.getElementById('catalogo').scrollIntoView({ 
            behavior: 'smooth' 
        });
    } else {
        cargarLibros();
    }
}

// Estilos para modales
const modalStyles = `
<style>
.pdf-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--accent-pink);
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
}

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
    background: var(--bg-card);
    color: var(--text-primary);
    padding: 2.5rem;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    animation: modalSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 1px solid var(--accent-light);
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
    color: var(--accent-purple);
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
}

.modal p {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: var(--text-primary);
}

.modal strong {
    color: var(--accent-pink);
}

.modal-actions {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    flex-wrap: wrap;
}

.btn.secundario {
    background: var(--accent-light);
    color: var(--text-primary);
}

.btn.secundario:hover {
    background: var(--accent-purple);
    color: white;
}

.no-results {
    text-align: center;
    grid-column: 1 / -1;
    color: var(--text-secondary);
    font-size: 1.3rem;
    padding: 3rem;
    animation: fadeIn 0.6s ease-out;
}

.descargar-btn {
    color: var(--accent-purple);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.descargar-btn:hover {
    color: var(--accent-pink);
}

.show-all-btn {
    display: block;
    margin: 2rem auto;
    text-align: center;
}
</style>
`;

// Inicializar la página cuando se carga
document.addEventListener('DOMContentLoaded', function() {
    // Agregar estilos de modal
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    // Inicializar funcionalidades
    inicializarModoOscuro();
    cargarLibros(); // Ahora muestra TODOS los libros
    cargarCategorias();
    inicializarBusqueda();
    
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
});

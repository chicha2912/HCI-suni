const accessibility = document.createElement('div');
accessibility.id = "accesibility"
accessibility.innerHTML = `
    <div class="accessibility-button" id="accessibility-button" aria-label="Menú de accesibilidad">
        <img src="./public/icons/accesibility.png" alt="Icono de accesibilidad">
    </div>

    <div class="accessibility-menu" id="accessibility-menu" aria-hidden="true">
        <h2 class="menu-title">Menú de Accesibilidad</h2>
        <div class="subsection">
            <span>Navegación y lectura</span>
            <ul>
                <li>
                    <div>Lector de pantalla</div>
                    <input type="checkbox">
                </li>
                <li>
                    <div>Retroalimentación de botones</div>
                    <input type="checkbox">
                </li>
                <li>
                    <div>Navegación por voz</div>
                    <input type="checkbox">
                </li>
            </ul>
        </div>
        <div class="subsection">
            <span>Contenido</span>
            <ul>
                <li>
                    <div>Zoom</div>
                    <div class="control-container" id="zoom-control">
                        <button class="control-decrease accessibility-buttons">-</button>
                        <div class="control-value">100%</div>
                        <button class="control-increase accessibility-buttons">+</button>
                    </div>
                </li>
                <li>
                    <div>Tipo de fuente</div>
                    <select id="font-select">
                        <option value="arial" selected>Arial (deafult)</option>
                        <option value="verdana">Verdana</option>
                        <option value="tahoma">Tahoma</option>
                    </select>
                </li>
                <li>
                    <div>Tamaño de fuente</div>
                    <div class="control-container" id="tamano-control">
                        <button class="control-decrease accessibility-buttons">-</button>
                        <div class="control-value">12</div>
                        <button class="control-increase accessibility-buttons">+</button>
                    </div>                        
                </li>
                <li>
                    <div>Brillo</div>
                    <div class="control-container" id="brillo-control">
                        <button class="control-decrease accessibility-buttons">-</button>
                        <div class="control-value">100%</div>
                        <button class="control-increase accessibility-buttons">+</button>
                    </div>
                </li>
                <li>
                    <div>Resaltar títulos</div>
                    <input type="checkbox" id="titulos-checkbox">
                </li>
                <li>
                    <div>Resaltar enlaces y botones</div>
                    <input type="checkbox" id="enlaces-checkbox">
                </li>
                <li>
                    <div>Subtítulos y transcripciones</div>
                    <input type="checkbox" id="sutitulos-button">
                </li>
            </ul>
        </div>
        <div class="subsection">
            <span>Color</span>
            <ul>
                <li>
                    <div>Color de fuente</div>
                    <div>
                        <input type="color" class="color-selector" id="font-color-selector">
                        <button id="font-color-cancel" class="accessibility-buttons">Cancelar</button>
                    </div>
                </li>
                <li>
                    <div>Color de fondo</div>
                    <div>
                    <input type="color" class="color-selector" value="#ffffff" id="background-color-selector">
                    <button id="background-color-cancel" class="accessibility-buttons">Cancelar</button>
                    </div>
                </li>
                <li>
                    <div>Contraste</div>
                    <select id="contraste-select">
                        <option value="1" selected>Normal</option>
                        <option value="1.5">Alto</option>
                    </select>
                </li>
                <li>
                    <div>Saturación</div>
                    <select id='saturation-select'>
                        <option value="1" selected>Normal</option>
                        <option value="0.5">Baja</option>
                        <option value="1.5">Alta</option>
                        <option value="0">Monocromático</option>
                    </select>
                </li>
                <li>
                    <div>Daltonismo</div>
                    <select id="daltonismo-select">
                        <option value="none" selected>No</option>
                        <option value="deuteranomaly">Deuteranomalía</option>
                        <option value="protanomaly">Protanomalía</option>
                        <option value="tritanopia">Tritanopia</option>
                    </select>
                </li>
            </ul>
        </div>
        <div class="subsection">
            <span>Sonido</span>
            <ul>
                <li>
                    <div>Volumen</div>
                    <div class="control-container" id="volumen-control">
                        <button class="control-decrease accessibility-buttons">-</button>
                        <div class="control-value">100%</div>
                        <button class="control-increase accessibility-buttons">+</button>
                    </div>
                </li>
                <li>
                    <div>Silencio</div>
                    <input type="checkbox" id="silencio-checkbox">
                </li>
            </ul>
        </div>
    </div>
`;

// Boton de accesibilidad
document.body.appendChild(accessibility);

const button = document.getElementById('accessibility-button');
const menu = document.getElementById('accessibility-menu');

button.addEventListener('click', () => {
    const isVisible = menu.style.display === 'block';
    menu.style.display = isVisible ? 'none' : 'block';
    menu.setAttribute('aria-hidden', isVisible);
});


// Auxiliar
function createControl(elementId, initialValue, minValue, maxValue, step, isPercentaje, updateCallback) {
    const container = document.getElementById(elementId);
    let currentValue = initialValue;

    const decreaseBtn = container.querySelector('.control-decrease');
    const increaseBtn = container.querySelector('.control-increase');
    const valueDisplay = container.querySelector('.control-value');

    function updateDisplay() {
        if(isPercentaje){
            valueDisplay.textContent = `${Math.round(currentValue * 100)}%`;
        } else {
            valueDisplay.textContent = `${Math.round(currentValue)}`;
        }
        updateCallback(currentValue); 
    }

    decreaseBtn.addEventListener('click', () => {
        if (currentValue > minValue) {
            currentValue = Math.max(minValue, currentValue - step);
            updateDisplay();
        }
    });

    increaseBtn.addEventListener('click', () => {
        if (currentValue < maxValue) {
            currentValue = Math.min(maxValue, currentValue + step);
            updateDisplay();
        }
    });

    updateDisplay();
}

function getAllMediaElements() {
    return document.querySelectorAll('audio, video');
}

// Zoom
createControl('zoom-control', 1, 1, 3, 0.1, true, (value) => {
    const container = document.getElementById('iphone-content');
    container.style.transform = `scale(${value})`;
    container.style.transformOrigin = 'top left';
});

// Tipo de fuente
const fontSelect = document.getElementById("font-select");
fontSelect.addEventListener("change", function () {
    const selectedFont = fontSelect.value;
    if (selectedFont === "default") {
        document.getElementById('iphone-content').style.fontFamily = ""; // Vuelve a la fuente por defecto
    } else {
        document.getElementById('iphone-content').style.fontFamily = selectedFont; // Cambia la fuente según la opción seleccionada
    }
});

// Tamano de fuente
createControl('tamano-control', 16, 8, 32, 2, false, (value) => {
    document.getElementById('iphone-content').style.fontSize = `${value}px`;
});

// Brillo
createControl('brillo-control', 1, 0.1, 3, 0.1, true, (value) => {
    document.getElementById('iphone').style.filter = `brightness(${value})`;
});

// Resaltar titulos
const highlightCheckbox = document.getElementById('titulos-checkbox');
const titles = document.getElementById('iphone').querySelectorAll('h1, h2, h3, h4, h5, h6');
highlightCheckbox.addEventListener('change', () => {
    if (highlightCheckbox.checked) {
        // Aplicar estilos de resaltado a los títulos
        titles.forEach(title => {
            title.style.border = '2px solid #0000ff';
        });
    } else {
        // Quitar estilos de resaltado
        titles.forEach(title => {
            title.style.border = '';
        });
    }
});

// Resaltar enlaces
const highlightLinksCheckbox  = document.getElementById('enlaces-checkbox');
const links = document.getElementById('iphone').querySelectorAll('a, button');
highlightLinksCheckbox.addEventListener('change', () => {
    if (highlightLinksCheckbox.checked) {
        // Aplicar estilos de resaltado a los enlaces
        links.forEach(link => {
            link.style.backgroundColor = '#ffffff';
            link.style.color = '#000';
            link.style.fontWeight = 'bold';
            link.style.border = '2px solid #0000ff';
        });
    } else {
        // Quitar estilos de resaltado
        links.forEach(link => {
            link.style.backgroundColor = '';
            link.style.color = '';
            link.style.fontWeight = '';
            link.style.border = '';
        });
    }
});

// Subtitulos y transcripciones
document.addEventListener('DOMContentLoaded', function() {
    const subtitlesCheckbox = document.getElementById('sutitulos-button');
    const originalElements = [];

    function toggleSubtitles() {
        const images = document.getElementById('iphone').querySelectorAll('img');
        const videos = document.getElementById('iphone').querySelectorAll('video');

        if (subtitlesCheckbox.checked) {
            // Añadir subtítulos a imágenes
            images.forEach((img) => {
                const subtitleContainer = document.createElement('div');
                subtitleContainer.className = 'subtitle-container';
                const subtitle = document.createElement('div');
                subtitle.className = 'subtitle';
                subtitle.textContent = img.alt || 'Imagen';

                subtitleContainer.appendChild(img.cloneNode()); // Clona la imagen
                subtitleContainer.appendChild(subtitle);
                img.parentElement.insertBefore(subtitleContainer, img.nextSibling);
                originalElements.push({element: img, parent: img.parentElement}); // Guarda el elemento original
                img.remove(); // Elimina la imagen original
            });

            // Añadir subtítulos a videos
            videos.forEach((video) => {
                const subtitleContainer = document.createElement('div');
                subtitleContainer.className = 'subtitle-container';
                const subtitle = document.createElement('div');
                subtitle.className = 'subtitle';
                const textTrack = video.querySelector('track');
                subtitle.textContent = textTrack ? textTrack.label : 'Video';

                subtitleContainer.appendChild(video.cloneNode(true)); // Clona el video
                subtitleContainer.appendChild(subtitle);
                video.parentElement.insertBefore(subtitleContainer, video.nextSibling);
                originalElements.push({element: video, parent: video.parentElement}); // Guarda el elemento original
                video.remove(); // Elimina el video original
            });
        } else {
            const subtitleContainers = document.querySelectorAll('.subtitle-container');
            
            originalElements.forEach(({element, parent}) => {
                parent.insertBefore(element, parent.querySelector('.subtitle-container') || null);
            });
            subtitleContainers.forEach(container => container.remove()); 
            originalElements.length = 0;
        }
    }

    subtitlesCheckbox.addEventListener('change', toggleSubtitles);
});



// Color de fuente
const fontColorSelector = document.getElementById('font-color-selector');
const fontCancelButton = document.getElementById('font-color-cancel');
fontColorSelector.addEventListener('input', (event) => {
    document.getElementById('iphone-content').style.color = event.target.value;
});
fontCancelButton.addEventListener('click', () => {
    let default_color = '#000000'
    document.getElementById('iphone-content').style.color = default_color;
    fontColorSelector.value = default_color
});

// Color de fondo
const backgroundColorSelector = document.getElementById('background-color-selector');
const backgroundCancelButton = document.getElementById('background-color-cancel');
backgroundColorSelector.addEventListener('input', (event) => {
    document.getElementById('iphone-content').style.backgroundColor = event.target.value;
});
backgroundCancelButton.addEventListener('click', () => {
    let default_color = '#ffffff'
    document.getElementById('iphone-content').style.backgroundColor = default_color;
    backgroundColorSelector.value = default_color
});

// Contraste
const contrasteSelect = document.getElementById('contraste-select');
contrasteSelect.addEventListener('change', (event) => {
    const contrastValue = event.target.value;
    document.getElementById('iphone').style.filter = `contrast(${contrastValue})`;
});
// Saturacion
const saturationSelect = document.getElementById('saturation-select');
saturationSelect.addEventListener('change', (event) => {
    const saturationValue = event.target.value;
    document.getElementById('iphone').style.filter = `saturate(${saturationValue})`;
});

// Daltonismo
const svgNS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(svgNS, "svg");
svg.setAttribute("xmlns", svgNS);
svg.setAttribute("version", "1.1");
svg.style.display = "none";

const filters = {
    deuteranomaly: "0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0",
    protanomaly: "0.817 0.183 0 0 0 0.333 0.667 0 0 0 0 0.125 0.875 0 0 0 0 0 1 0",
    tritanopia: "0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0"
};

function createFilter(id, values) {
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", id);
    const feColorMatrix = document.createElementNS(svgNS, "feColorMatrix");
    feColorMatrix.setAttribute("type", "matrix");
    feColorMatrix.setAttribute("values", values);
    filter.appendChild(feColorMatrix);
    return filter;
}

svg.appendChild(createFilter("deuteranomaly", filters.deuteranomaly));
svg.appendChild(createFilter("protanomaly", filters.protanomaly));
svg.appendChild(createFilter("tritanopia", filters.tritanopia));

document.body.appendChild(svg);

const selectElement = document.getElementById('daltonismo-select');

const options = [
    { value: 'none', text: 'No ajuste' },
    { value: 'deuteranomaly', text: 'Deuteranomalía (verde-rojo)' },
    { value: 'protanomaly', text: 'Protanomalía (rojo-verde)' },
    { value: 'tritanopia', text: 'Tritanopia (azul-amarillo)' }
];

function applyDaltonismFilter(type) {
    const bodyElement = document.body;
    switch (type) {
        case 'deuteranomaly':
            bodyElement.style.filter = 'url(#deuteranomaly)';
            break;
        case 'protanomaly':
            bodyElement.style.filter = 'url(#protanomaly)';
            break;
        case 'tritanopia':
            bodyElement.style.filter = 'url(#tritanopia)';
            break;
        default:
            bodyElement.style.filter = 'none';
            break;
    }
}

selectElement.addEventListener('change', function() {
    applyDaltonismFilter(selectElement.value);
});

// Volumen
createControl('volumen-control', 1, 0, 3, 0.1, true, (value) => {
    const mediaElements = getAllMediaElements();
    mediaElements.forEach(function(element) {
        element.volume = value / 100;
    });
});

// Silencio
const muteCheckbox = document.getElementById('silencio-checkbox');
muteCheckbox.addEventListener('change', function() {
    const isMuted = muteCheckbox.checked;
    const mediaElements = getAllMediaElements();
    mediaElements.forEach(function(element) {
        element.muted = mute;
    });
});
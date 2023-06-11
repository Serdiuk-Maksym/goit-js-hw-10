

// функція для побудови розмітки
export function createMarkup(array = []) {
    return array.map(({ name, id }) => {
       return `<option value="${id}">${name}</option>` 
    }).join("");
};

export function createCatMarkup (catInfo) {
    
        return `
        <div class=block-js>
        <img src="${catInfo.url}">
        <div class=block-text>
        <h3>${catInfo.breeds[0].name} &#128008</h3>
        <p>${catInfo.breeds[0].description}</p>
        <p><strong>Temperament &#128008:</strong> ${catInfo.breeds[0].temperament}</p>
        </div>
        </div>
        ` 
    }
    
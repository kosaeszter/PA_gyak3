import { products } from './data.js';

const getGenreCount = function (album) {
    let genreIdsWithSOngs = {}
    //console.log(album)
    for (const track of album.details) {
        if (genreIdsWithSOngs[track.genre_id]) {
            genreIdsWithSOngs[track.genre_id]++
        } else {
            genreIdsWithSOngs[track.genre_id] = 1;
        }
    }
    //console.log(genreIdsWithSOngs)
    return genreIdsWithSOngs;
}

const getAlbumsWithMultipleGenres = function (products) {
    let moreGenre = [];
    for (const album of products) {
        let genreCount = getGenreCount(album)
        console.log(genreCount);
        let numberOfGenres = 0;
        for (const key in genreCount) {
            numberOfGenres++;
        }

        if (numberOfGenres > 1) {
            moreGenre.push(album);
        }
    }
    return moreGenre;
}

const getOneWordArtistNames = function (products) {
    let allArtist = []
    for (const album of products) {
        let name= album.vendor.name
        if (!allArtist.includes(name)  /*&&!name.includes(" ")*/)  {
            allArtist.push(name)
        }
    }  
    return  allArtist.filter(artist => !artist.includes(" "));
}

console.log(getOneWordArtistNames(products))


//getGenreCount(products[products.length-1]);
//console.log(getAlbumsWithMultipleGenres(products))

const createDivElement = function (text) {
    const divelement = document.createElement("div");
    divelement.innerHTML = `<strong>${text}</strong>`;
    return divelement;
}

const createDualTextDiv = function (text1, text2) {
    const wrapperDiv = document.createElement("div");

    const firstChildDiv = document.createElement("div");
    firstChildDiv.innerText = text1;
    wrapperDiv.appendChild(firstChildDiv);

    const secondChildDiv = document.createElement("div");
    secondChildDiv.innerText = text2;
    wrapperDiv.appendChild(secondChildDiv);

    return wrapperDiv;
}

const loadEvent = function () {
    const container = document.getElementById("root");

    products.forEach(product => {
        container.appendChild(createDivElement(product.name));
        container.appendChild(createDualTextDiv("status: " + product.status, "price: " + product.status));

        product.details.forEach(productDetail => {
            container.appendChild(document.createElement("br"));
            container.appendChild(createDivElement(productDetail.name));
            container.appendChild(createDualTextDiv("composer: " + productDetail.composer, "milliseconds: " + productDetail.milliseconds));
        });

        container.appendChild(document.createElement("hr"));
    });
}

window.addEventListener("load", loadEvent);
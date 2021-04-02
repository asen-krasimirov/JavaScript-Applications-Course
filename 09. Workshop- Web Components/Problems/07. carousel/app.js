import { html, render } from '../node_modules/lit-html/lit-html.js';


const carouselTemplate = (curSlide, totalCount, context) => html`
<style>
    .carousel-container {
        max-width: 60rem;
        position: relative;
        margin: 0 auto;
    }

    .carousel-controls {
        text-align: center;
    }

    .carousel-slide {
        display: block;
    }

    .carousel-slide>img {
        width: 100%;
    }

    /* Next & previous buttons */

    .prev,
    .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: auto;
        margin-top: -22px;
        padding: 16px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
        user-select: none;
    }

    /* Position the "next button" to the right */

    .next {
        right: 0;
        border-radius: 3px 0 0 3px;
    }

    /* On hover, add a black background color with a little bit see-through */

    .prev:hover,
    .next:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }

    /* Caption text */

    .text {
        color: #f2f2f2;
        font-size: 15px;
        padding: 8px 12px;
        position: absolute;
        bottom: 8px;
        width: 100%;
        text-align: center;
    }

    /* Number text (1/3 etc) */

    .numbertext {
        color: #f2f2f2;
        font-size: 12px;
        padding: 8px 12px;
        position: absolute;
        top: 0;
    }

    /* The dots/bullets/indicators */
    .carousel-controls>.dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
    }

    .active,
    .dot:hover {
        background-color: #717171;
    }

    /* Fading animation */

    .fade {
        -webkit-animation-name: fade;
        -webkit-animation-duration: 1.5s;
        animation-name: fade;
        animation-duration: 1.5s;
    }

    @-webkit-keyframes fade {
        from {
            opacity: .4
        }

        to {
            opacity: 1
        }
    }

    @keyframes fade {
        from {
            opacity: .4
        }

        to {
            opacity: 1
        }
    }
</style>

<div class="carousel-container">

    <!-- setting the current slide -->
    ${slideTemplate(curSlide, totalCount, context)}

    <a class="prev" @click=${() => context.changePage('backwards')}>&#10094;</a>
    <a class="next" @click=${() => context.changePage('forward')}>&#10095;</a>
</div>
<div class="carousel-controls">
    
    <!-- setting the navigation -->
    ${(createEmptyArray(totalCount)).map((_, index) => html`
    <span class="dot" @click=${() => {context.renderElement(index+1)}}></span>`
    )}

</div>`;


const slideTemplate = (slideData, totalCount) => html`
<article class="carousel-slide">
    <p class="number-text">${slideData.number} / ${totalCount}</p>
    <img src=${slideData.image} alt="">
    <p class="caption-text">${slideData.caption}</p>
</article>`;


class CarouselElement extends HTMLElement {
    constructor() {
        super();
        this.content = {
            // number: { image: '/url' caption: 'caption text', number: 1 }
        };

        this._filterData();
        this.curSlide = 1;
        this.contentLength = Object.keys(this.content).length;

        this._root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderElement();
    }

    _filterData() {
        [...this.attributes].map(attrData => this._extractData(attrData));
    }

    _extractData(attrData) {
        /*
        slide-01-image-url="./images/first.jpg"
        slide-01-caption="First Caption"
        */

        let data = attrData.nodeName.split('-');
        let number = Number(data[1]);
        let dataName = data[2];

        if (!(String(number) in this.content)) { this.content[number] = { 'image': attrData.nodeValue, number }; return; }
        this.content[number][dataName] = attrData.nodeValue;
    }

    renderElement(id=this.curSlide) {
        let curSlideConent = this.content[id];
        let displayContent = carouselTemplate(curSlideConent, this.contentLength, this);
        render(displayContent, this._root, { eventContext: this });
    }

    changePage(position='forward') {
        if (position == 'forward') {
            this.curSlide++;
            if (this.curSlide > this.contentLength) this.curSlide = 1;
        } else {
            this.curSlide--;
            if (this.curSlide <= 0) this.curSlide = this.contentLength;
        }
        this.renderElement();
    }
}


customElements.define('app-carousel', CarouselElement);


function createEmptyArray(length) {
    const newArray = [];
    for (let i = 0; i < length; i++) { newArray.push(''); }
    return newArray;
}
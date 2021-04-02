import { html, render } from '../node_modules/lit-html/lit-html.js';


const sliderTemplate = (onChange) => html`
<style>
    .slider-container {
        font-family: 'Montserrat', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100px;
    }

    .slider-percentage-value {
        font-weight: bold;
        text-align: center;
        margin: 1em 0;
    }

    .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 15px;
        border-radius: 5px;
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
        margin: 0 1em;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #4CAF50;
        cursor: pointer;
    }

    .slider::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #4CAF50;
        cursor: pointer;
    }
</style>

<div class="slider-container">
    <input class="slider" type="range" @input=${onChange} />
    <div class="slider-end">
        Percentage: <span class="slider-percentage-value">0 %</span>
    </div>
</div>`;


class SliderElement extends HTMLElement {
    constructor() {
        super();

        this.state = {
            updateFunc: (this.getAttribute('inverte') === 'true') ? this._invertedMovement : this._normalMovement,
        };

        this._root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        render(sliderTemplate(this.onChange), this._root, { eventContext: this });
    }

    onChange(event) {
        const slider = event.target;
        const value = this.state.updateFunc(slider);
        this._update(slider, value);
    }
    
    _normalMovement(slider) {
        return slider.value;
    }

    _invertedMovement(slider) {
        let value = 100 - slider.value;
        return value;
    }

    _update(slider, value) {
        slider.parentNode.querySelector('div.slider-end span').textContent = `${value} %`;
    }
}


customElements.define('slider-elem', SliderElement);
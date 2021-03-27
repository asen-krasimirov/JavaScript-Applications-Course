import { html, page, validator, validateSubmitedData } from '../dom.js';
import { addFurniture } from '../api/data.js';
import { registerFormEvent } from '../navigation.js';
import { manualBtnSetter } from '../buttonContoller.js';


const createCreatePage = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" @change=${(event) => {
                    toggleValidation(event.target.classList, event.target.value, validator.isAtLeastFourSymbols);
                }}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control" id="new-model" type="text" name="model" @change=${(event) => {
                    toggleValidation(event.target.classList, event.target.value, validator.isAtLeastFourSymbols);
                }}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control" id="new-year" type="number" name="year" @change=${(event) => {
                    toggleValidation(event.target.classList, event.target.value, validator.isYearBetween);
                }}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description" @change=${(event) => {
                    toggleValidation(event.target.classList, event.target.value, validator.isMoreThenTenSymbols);
                }}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" @change=${(event) => {
                    toggleValidation(event.target.classList, event.target.value, validator.isPricePositive);
                }}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" @change=${(event) => {
                    toggleValidation(event.target.classList, event.target.value, validator.isPrecent);
                }}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>
`;


export function setUpCreatePage() {
    registerFormEvent('create', onSubmit);
    return showCreatePage;

    async function showCreatePage() {
        return createCreatePage();
    }

    function onSubmit(body) {
        // validation
        const nonValidCategories = validateSubmitedData(body);
        if (nonValidCategories.length) {
            alert('Form is uncorrectlly filled! Follow the following statements:\n' + nonValidCategories.join('\n'));
            return;
        }

        // post
        addFurniture(body);
        page.redirect('/');
        manualBtnSetter();
    }
}


function toggleValidation(eventClassList, targetValue ,validationFunc) {
    if (eventClassList.length > 1) { eventClassList.remove(eventClassList[eventClassList.length-1]); }
    eventClassList.add(validationFunc(targetValue) ? 'is-valid' : 'is-invalid');
}
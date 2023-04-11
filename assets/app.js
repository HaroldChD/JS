const containerCards = document.getElementById("container-index");
const containerTable = document.getElementById("container-table");
const search = document.getElementById("container-search");
const checkboxes = document.getElementById("container-checkboxes");

const render = (template, element) => (element.innerHTML = template);

const saveCards = data.events;

const cardsIndex = saveCards.map(createCards).join("");
containerCards.innerHTML = cardsIndex;

/* crear cards */
function createCards(event) {
	let template = "";
	for (let { image, name, price } of saveCards) {
		template += `
            <div class="card border-secondary pt-3 col-10 col-md-5 col-xl-3">
                    <img class="card-img-top w-100 h-50" src="${image}" alt="Title">
                    <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mobile">
					<div><h4 class="card-title">${name}</h4>
					<p class="card-text">Price : ${price}</p></div>
                    <button class="btn btn-outline-success" type="submit">More details</button></div>
                    </div>
            </div>
        `;
	}
	return template;
}

/* crear tabla*/
function createTable(data, table) {
	let template = "";
	for (let category in data) {
		template += `
		<tr>
			<td>${category}</td>
			<td>${data[category].revenues}</td>
			<td>${(data[category].porcentaje / data[category].count).toFixed(2)} %</td>
		</tr>
		`;
	}
	table.innerHTML += template;
}

/* botón search */
search.addEventListener("input", () => {
	let filters = filter(events, search.value);
	filters.length > 0
		? render(createCards(filters), main)
		: (main.innerHTML = `<h3 class="text-white text-center"> There are no events</h3>`);
});

/* checkboxes */

function createCheckboxes(category) {
	let template = "";
	for (let category of saveCards) {
		template += `
        <input type="checkbox" class="btn-check" value="${category}" id="check-${category.replace(
			" ",
			"-"
		)}" autocomplete="off">
        <label class="btn btn-secondary fw-bold" for="check-${category.replace(
				" ",
				"-"
			)}">${category}</label>
        `;
	}
	return template;
}

checkboxes.addEventListener("change", () => {
	let filters = filter(events, search.value);
	filters.length > 0
		? render(createCards(filters), main)
		: (main.innerHTML = `<h3 class="text-white text-center"> There are no events</h3>`);
});

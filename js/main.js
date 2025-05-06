const mainTag = document.getElementById("main-page");
const destinationTag = document.getElementById("destination-page");
const crewTag = document.getElementById("crew-page");
const technologyTag = document.getElementById("technology-page");
const mainLink = document.getElementById("main-link");
const destinationLink = document.getElementById("destination-link");
const crewLink = document.getElementById("crew-link");
const technologyLink = document.getElementById("technology-link");

const title = document.querySelector("title");

function actionAnimate(...elements) {
	elements.forEach((selector) => {
		selector.animate(
			[
				{
					opacity: 0,
					transform: "translateY(15px) scale(0.9)",
				},
				{
					opacity: 1,
					transform: "translateY(0) scale(1)",
				},
			],
			{ duration: 500, iterations: 1, fill: "both" }
		);
	});
}

function removeClass(elements, className) {
	elements.forEach((el) => el.classList.remove(className ?? "active"));
}

function addClass(elements, className) {
	elements.forEach((el) => el.classList.add(className ?? "active"));
}

function showPage() {
	const path = window.location.hash.slice(1);

	const currentPage = document.querySelector(".show")?.id?.split("-")[0];
	if (currentPage == path || (currentPage == "main" && path == "/")) return;

	setActiveNavLink(path);

	removeClass([mainTag, destinationTag, crewTag, technologyTag], "show");
	addClass([mainTag, destinationTag, crewTag, technologyTag], "hide");

	switch (path) {
		case "destination":
			title.innerText = "Destination";
			removeClass([destinationTag], "hide");
			addClass([destinationTag], "show");
			break;
		case "crew":
			title.innerText = "Crew";
			removeClass([crewTag], "hide");
			addClass([crewTag], "show");
			break;
		case "technology":
			title.innerText = "Technology";
			removeClass([technologyTag], "hide");
			addClass([technologyTag], "show");
			break;
		default:
			title.innerText = "Space Tourism";
			removeClass([mainTag], "hide");
			addClass([mainTag], "show");
			break;
	}
}
showPage();

function setActiveNavLink(nextURL = "/") {
	removeClass([mainLink, destinationLink, crewLink, technologyLink]);

	switch (nextURL) {
		case "destination":
			addClass([destinationLink]);
			break;
		case "crew":
			addClass([crewLink]);
			break;
		case "technology":
			addClass([technologyLink]);
			break;
		default:
			addClass([mainLink]);
			break;
	}
}

function changePage(nextURL = "/") {
	setActiveNavLink(nextURL);
	window.location.hash = nextURL;
	showPage();
}

var cachedData = null;
async function getData() {
	if (!cachedData) {
		const res = await fetch("data/data.json");
		cachedData = await res.json();
	}

	return cachedData;
}

const navbarTogglerBtn = document.getElementById("navbar-toggler");
navbarTogglerBtn.addEventListener("click", () => {
	if (navbarTogglerBtn.dataset.toggle == "extend") {
		navbarTogglerBtn.dataset.toggle = "collapse";
	} else {
		navbarTogglerBtn.dataset.toggle = "extend";
	}
});

/* Main Page */
function explore(event) {
	changePage("destination");
	setTimeout(() => {
		document.activeElement.blur();
	}, 200);
}

/* Destinations Page */
const moonPlanet = document.getElementById("moon-planet");
const marsPlanet = document.getElementById("mars-planet");
const europaPlanet = document.getElementById("europa-planet");
const titanPlanet = document.getElementById("titan-planet");
const planetImageTag = document.getElementById("planet-image");
const planetNameTag = document.getElementById("planet-name");
const planetDescriptionTag = document.getElementById("planet-description");
const planetDistanceTag = document.getElementById("destination-distance");
const planetTimeTag = document.getElementById("destination-time");

function setActivePlanetLink(planet = "Moon") {
	removeClass([moonPlanet, marsPlanet, europaPlanet, titanPlanet]);

	switch (planet) {
		case "Moon":
			addClass([moonPlanet]);
			break;
		case "Mars":
			addClass([marsPlanet]);
			break;
		case "Europa":
			addClass([europaPlanet]);
			break;
		case "Titan":
			addClass([titanPlanet]);
			break;
	}
}

async function changeDestination(event, planet) {
	if (event.target.classList[0]) return;

	setActivePlanetLink(planet);

	const data = await getData();
	const destination = data?.destinations.find(
		(destination) => destination.name == planet
	);

	planetNameTag.innerText = destination.name;
	planetDescriptionTag.innerText = destination.description;
	planetDistanceTag.innerText = destination.distance;
	planetTimeTag.innerText = destination.travel;
	planetImageTag.src = destination.images.webp;

	actionAnimate(
		planetNameTag,
		planetDescriptionTag,
		planetDistanceTag,
		planetTimeTag,
		planetImageTag
	);
}

/* Crew Page */
const navC1Btn = document.getElementById("nav-c1");
const navC2Btn = document.getElementById("nav-c2");
const navC3Btn = document.getElementById("nav-c3");
const navC4Btn = document.getElementById("nav-c4");
const crewPhotoTag = document.getElementById("crew-photo");
const crewPositionTag = document.getElementById("crew-position");
const crewNameTag = document.getElementById("crew-name");
const crewDescriptionTag = document.getElementById("crew-description");

function setActiveCrewLink(crew) {
	removeClass([navC1Btn, navC2Btn, navC3Btn, navC4Btn]);

	switch (crew) {
		case "Douglas":
			addClass([navC1Btn]);
			break;
		case "Mark":
			addClass([navC2Btn]);
			break;
		case "Victor":
			addClass([navC3Btn]);
			break;
		case "Anousheh":
			addClass([navC4Btn]);
			break;
	}
}

async function changeCrew(event, name) {
	if (event.target.classList[0]) return;

	setActiveCrewLink(name);

	const data = await getData();
	const crew = data?.crew.find((c) => c.name.includes(name));

	crewPositionTag.innerText = crew.role;
	crewNameTag.innerText = crew.name;
	crewDescriptionTag.innerText = crew.bio;
	crewPhotoTag.src = crew.images.webp;

	actionAnimate(crewPositionTag, crewPhotoTag, crewNameTag, crewDescriptionTag);
}

/* Technology Page */
const navT1Btn = document.getElementById("nav-t1");
const navT2Btn = document.getElementById("nav-t2");
const navT3Btn = document.getElementById("nav-t3");
const techPhotoTag = document.getElementById("technology-photo");
const techNameTag = document.getElementById("technology-name");
const techDescriptionTag = document.getElementById("technology-description");

function setActiveTechLink(tech) {
	removeClass([navT1Btn, navT2Btn, navT3Btn]);

	switch (tech) {
		case "Launch vehicle":
			addClass([navT1Btn]);
			break;
		case "Spaceport":
			addClass([navT2Btn]);
			break;
		case "Space capsule":
			addClass([navT3Btn]);
			break;
	}
}

async function changeTech(event, tech) {
	if (event.target.classList[0]) return;
	setActiveTechLink(tech);

	const data = await getData();
	const technology = data?.technology.find((t) => t.name.includes(tech));

	techNameTag.innerText = technology.name;
	techDescriptionTag.innerText = technology.description;

	if (window.innerWidth >= 992) techPhotoTag.src = technology.images.landscape;
	else techPhotoTag.src = technology.images.portrait;

	actionAnimate(techNameTag, techDescriptionTag, techPhotoTag);
}

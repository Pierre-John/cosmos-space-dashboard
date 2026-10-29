// WRITE YOUR JS CODE HERE
let viewTodayInSpace = document.getElementById("today-in-space")
let viewLaunches = document.getElementById("launches")
let viewPlanets = document.getElementById("planets")

let todayInSpaceAnchor = document.querySelector(
  "a[data-section=today-in-space]",
)
let launchesAnchor = document.querySelector("a[data-section=launches]")
let planetsAnchor = document.querySelector("a[data-section=planets]")

let planetCards = document.querySelectorAll(".planet-card")

let todayBtn = document.getElementById("today-apod-btn")
let loadBtn = document.getElementById("load-date-btn")
let displayDate = document.getElementById("date-display")
let apodLoading = document.getElementById("apod-loading")
let apodImage = document.getElementById("apod-image")
let apodDate = document.getElementById("apod-date")
let apodDateCalendar = document.getElementById("apod-date-detail")
let apodDateInput = document.getElementById("apod-date-input")
let apodTitle = document.getElementById("apod-title")
let apodExplanation = document.getElementById("apod-explanation")
let apodCopyright = document.getElementById("apod-copyright")
let apodDateInfo = document.getElementById("apod-date-info")
let apodMediaType = document.getElementById("apod-media-type")
let imageContainer = document.getElementById("apod-image-container")
let explanationDateDiv = document.getElementById("explanation-date-box")
let buttonLayer = document.getElementById("button-layer")
let showFullResolution = document.getElementById("show-full-resolution")

// __________________________________________________________________________________________________________________

launchesAnchor.addEventListener("click", function () {
  launchesAnchor.classList.add("bg-blue-500/10", "text-blue-400")
  launchesAnchor.classList.remove("text-slate-300", "hover:bg-slate-800")
  planetsAnchor.classList.remove("bg-blue-500/10", "text-blue-400")
  todayInSpaceAnchor.classList.remove("bg-blue-500/10", "text-blue-400")
  planetsAnchor.classList.add("text-slate-300", "hover:bg-slate-800")
  todayInSpaceAnchor.classList.add("text-slate-300", "hover:bg-slate-800")
  viewLaunches.classList.remove("hidden")
  viewTodayInSpace.classList.add("hidden")
  viewPlanets.classList.add("hidden")
})

planetsAnchor.addEventListener("click", function () {
  planetsAnchor.classList.add("bg-blue-500/10", "text-blue-400")
  planetsAnchor.classList.remove("text-slate-300", "hover:bg-slate-800")
  launchesAnchor.classList.remove("bg-blue-500/10", "text-blue-400")
  todayInSpaceAnchor.classList.remove("bg-blue-500/10", "text-blue-400")
  launchesAnchor.classList.add("text-slate-300", "hover:bg-slate-800")
  todayInSpaceAnchor.classList.add("text-slate-300", "hover:bg-slate-800")
  viewPlanets.classList.remove("hidden")
  viewLaunches.classList.add("hidden")
  viewTodayInSpace.classList.add("hidden")
})

todayInSpaceAnchor.addEventListener("click", function () {
  todayInSpaceAnchor.classList.add("bg-blue-500/10", "text-blue-400")
  todayInSpaceAnchor.classList.remove("text-slate-300", "hover:bg-slate-800")
  launchesAnchor.classList.remove("bg-blue-500/10", "text-blue-400")
  planetsAnchor.classList.remove("bg-blue-500/10", "text-blue-400")
  launchesAnchor.classList.add("text-slate-300", "hover:bg-slate-800")
  planetsAnchor.classList.add("text-slate-300", "hover:bg-slate-800")
  viewPlanets.classList.add("hidden")
  viewLaunches.classList.add("hidden")
  viewTodayInSpace.classList.remove("hidden")
})

// _______________________________________________________________________________________

let launchesArray = []

async function getLaunches() {
  try {
    let response = await fetch(
      "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10",
    )
    if (!response.ok) {
      throw new Error("there was a problem try to check your API link")
    }
    let data = await response.json()
    launchesArray = data.results
    displayFeaturedLaunch()
    displayLaunchesCards()
  } catch (error) {
    console.error(error)
  }
}

// ___________________________________________________________________________________________

function displayFeaturedLaunch() {
  let container = ""
  container = `
            <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        Go
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${launchesArray[0].name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${launchesArray[0].launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${launchesArray[0].name.split(" | ")[0]}</span>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${new Date(
    launchesArray[0].net,
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${new Date(launchesArray[0].net).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    },
  ) + " UTC"
    }</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${launchesArray[0].pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${launchesArray[0].pad.location.country.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                       ${launchesArray[0].mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <img
                        src="${launchesArray[0].image?.image_url || ""}"
                        alt="${launchesArray[0].name}"
                        class="w-full h-full min-h-[400px] object-cover"
                    />
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>`
  document.getElementById("featured-launch").innerHTML = container
}

// ___________________________________________________________________________________________

function displayLaunchesCards() {
  let container = ""
  for (var i = 1; i < launchesArray.length; i++) {
    container += `
                <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${launchesArray[i].image?.image_url || "/assets/images/launch-placeholder.png"}"
                alt="${launchesArray[i].name}"
                onerror="this.onerror=null this.src='/assets/images/launch-placeholder.png'"
                <div class="absolute top-3 right-3">
                  <span
                    class="absolute top-3 right-3 px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${launchesArray[i].status.abbrev}
                  </span>
                </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${launchesArray[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launchesArray[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${new Date(
      launchesArray[i].net,
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    })}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${new Date(launchesArray[i].net).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      },
    ) + " UTC"
      }</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launchesArray[i].name.split(" | ")[0]}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${launchesArray[i].pad.location.name + ",..."}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
              </div>

            </div>
    `
  }
  document.getElementById("launches-grid").innerHTML = container
}

// _______________________________________________________________________________________________

getLaunches()

// _______________________________________________________________________________________________

let planetsArray = []

async function getPlanets() {
  try {
    let response = await fetch(
      "https://solar-system-opendata-proxy.vercel.app/api/planets",
    )

    if (!response.ok) {
      throw new Error("There was a problem with the API link")
    }

    let data = await response.json()

    planetsArray = data.bodies

    let uranus = planetsArray.find(function (planet) {
      return planet.id === "uranus"
    })

    if (uranus) {
      displayPlanetDetails(uranus)
      displayPlanetDiscoveryInfo(uranus)
      displayPlanetQuickFacts(uranus)
      displayPlanetOrbitalCharacteristics(uranus)
    }

    setupPlanetCards()

  } catch (error) {
    console.error("Error fetching planets:", error)
  }
}

// _______________________________________________________________________________________________

function setupPlanetCards() {
  planetCards.forEach(function (card) {
    card.addEventListener("click", function () {
      let planetId = card.dataset.planetId
      let selectedPlanet = planetsArray.find(function (planet) {
        return planet.id === planetId
      })

      if (selectedPlanet) {
        displayPlanetDetails(selectedPlanet)
        displayPlanetDiscoveryInfo(selectedPlanet)
        displayPlanetQuickFacts(selectedPlanet)
        displayPlanetOrbitalCharacteristics(selectedPlanet)
      } else {
        console.error("Planet not found:", planetId)
      }
    })
  })
}

// _______________________________________________________________________________________________

function displayPlanetDetails(planet) {
  let container = `
        <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">

            <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${planet.image || ""}"
                    alt="${planet.name}"
                />
            </div>

            <div class="flex-1">

                <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                        id="planet-detail-name"
                        class="text-2xl md:text-3xl font-space font-bold"
                    >
                        ${planet.englishName}
                    </h3>

                    <button
                        class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                        <i class="far fa-heart"></i>
                    </button>
                </div>

                <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                >
                    ${planet.description || "No description available."}
                </p>

            </div>
        </div>

        <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">

            <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                </p>

                <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                    ${planet.semimajorAxis ?? "N/A"}
                </p>
            </div>

            <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-circle"></i>
                    Mean Radius
                </p>

                <p id="planet-radius" class="text-lg font-semibold">
                    ${planet.meanRadius ?? "N/A"} km
                </p>
            </div>

            <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-weight"></i>
                    Mass
                </p>

                <p id="planet-mass" class="text-lg font-semibold">
                    ${planet.mass
      ? `${planet.mass.massValue} × 10^${planet.mass.massExponent} kg`
      : "N/A"
    }
                </p>
            </div>

            <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-compress"></i>
                    Density
                </p>

                <p id="planet-density" class="text-lg font-semibold">
                    ${planet.density ?? "N/A"} g/cm³
                </p>
            </div>

            <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                </p>

                <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${planet.sideralOrbit ?? "N/A"} days
                </p>
            </div>

            <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-redo"></i>
                    Rotation Period
                </p>

                <p id="planet-rotation" class="text-lg font-semibold">
                    ${planet.sideralRotation ?? "N/A"} hours
                </p>
            </div>

            <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-moon"></i>
                    Moons
                </p>

                <p id="planet-moons" class="text-lg font-semibold">
                    ${planet.moons?.length ?? 0}
                </p>
            </div>

            <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                </p>

                <p id="planet-gravity" class="text-lg font-semibold">
                    ${planet.gravity ?? "N/A"} m/s²
                </p>
            </div>

        </div>
    `

  document.getElementById("planet-info").innerHTML = container
}

// _______________________________________________________________________________________________

function displayPlanetDiscoveryInfo(planet) {
  let container = ""
  container += `<h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovered By</span>
                    <span
                      id="planet-discoverer"
                      class="font-semibold text-right"
                      >${planet.discoveredBy || "Known since antiquity"}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold"
                      >${planet.discoveryDate || "Ancient times"}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold"
                      >Planet</span
                    >
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${planet.vol
      ? `${planet.vol.volValue} × 10^${planet.vol.volExponent} km³`
      : "N/A"
    }</span>
                  </div>
                </div>`
  document.getElementById("discovery-info").innerHTML = container
}

// _______________________________________________________________________________________________

function displayPlanetQuickFacts(planet) {
  let container = ""
  container += `<h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Mass: ${planet.mass ? `${planet.mass.massValue} × 10^${planet.mass.massExponent} kg` : "N/A"}</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Surface gravity: ${planet.gravity ?? "N/A"} m/s²</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Density: ${planet.density ?? "N/A"} g/cm³</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Density: ${planet.density ?? "N/A"} g/cm³</span
                    >
                  </li>
                </ul>`
  document.getElementById("quick-facts").innerHTML = container
}

// _______________________________________________________________________________________________

function displayPlanetOrbitalCharacteristics(planet) {
  let container = ""
  container += `<h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold"
                      >${planet.perihelion ?? "N/A"} km</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold"
                      >${planet.aphelion ?? "N/A"} km</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold"
                      >${planet.eccentricity ?? "N/A"}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold"
                      >${planet.inclination ?? "N/A"}°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold"
                      >${planet.axialTilt ?? "N/A"}°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${planet.avgTemp ?? "N/A"} °C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold"
                      >${planet.escape ?? "N/A"} m/s</span
                    >
                  </div>
                </div>`
  document.getElementById("orbital-characteristics").innerHTML = container
}

// _______________________________________________________________________________________________

getPlanets();

// _______________________________________________________________________________________________

let currentApodData = null;


let date = new Date();
let maxDate = date.toLocaleString("en-CA",
  {
    day: "2-digit",
    month: "numeric",
    year: "numeric"
  }
).split("/").join("-")
document.getElementById("apod-date-input").setAttribute("max", maxDate)
document.getElementById("apod-date-input").value = maxDate;
displayDate.innerHTML = maxDate

// _______________________________________________________________________________________________


async function getTodaySpaceApi() {
  apodLoading.classList.remove("hidden")
  apodImage.classList.add("hidden")
  apodLoading.innerHTML = `
   <i class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"></i>
                <p class="text-slate-400">Loading today's image...</p>`
  apodDate.innerHTML = `Astronomy Picture of the Day -loading... `
  apodTitle.innerHTML = "loading..."
  apodDateCalendar.innerHTML = "loading..."
  apodExplanation.innerHTML = "loading description..."
  apodCopyright.innerHTML = `&copy; NASA/JPL`
  apodDateInfo.innerHTML = "loading..."
  apodMediaType.innerHTML = "loading..."

  try {
    let response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=dPGDbTt8GRcRbk7J9HRFmBKKTwkKmchhkrW9WBB9",
    )
    if (!response.ok) {
      throw new Error("There was a problem with the API link")
    }
    apodLoading.classList.add("hidden")
    apodImage.classList.remove("hidden")
    currentApodData = await response.json()
    displayDateSpaceApi(currentApodData)
  } catch (error) {
    console.error("Error loading today data:", error)
    buttonLayer.classList.add("hidden")
    apodImage.classList.add("hidden")
    apodLoading.innerHTML = `
    <i class="fa-solid fa-triangle-exclamation
        text-4xl text-red-400 mb-4"></i>
         <p class="text-slate-400">Failed to load image</p>`
    apodLoading.classList.remove("hidden")
    apodDate.innerHTML = `Astronomy Picture of the Day - invalid `
    apodDateCalendar.innerHTML = "invalid date"
    apodTitle.innerHTML = ""
    apodExplanation.innerHTML = ""
    apodCopyright.innerHTML = `&copy; NASA/JPL`
    apodDateInfo.innerHTML = "invalid"
    apodMediaType.innerHTML = "image"
  }
}

// _______________________________________________________________________________________________

async function getDateSpaceApi() {
  apodLoading.classList.remove("hidden")
  apodImage.classList.add("hidden")
  apodLoading.innerHTML = `
   <i class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"></i>
                <p class="text-slate-400">Loading today's image...</p>`
  apodDate.innerHTML = `Astronomy Picture of the Day -loading... `
  apodTitle.innerHTML = "loading..."
  apodDateCalendar.innerHTML = "loading..."
  apodExplanation.innerHTML = "loading description..."
  apodCopyright.innerHTML = `&copy; NASA/JPL`
  apodDateInfo.innerHTML = "loading..."
  apodMediaType.innerHTML = "loading..."


  try {
    let selectedDate = document.getElementById("apod-date-input").value
    let response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=dPGDbTt8GRcRbk7J9HRFmBKKTwkKmchhkrW9WBB9&date=${selectedDate}`,
    )
    if (!response.ok) {
      throw new Error("There was a problem with the API link")
    }
    apodLoading.classList.add("hidden")
    apodImage.classList.remove("hidden")
    currentApodData = await response.json()
    displayDateSpaceApi(currentApodData)
  } catch (error) {
    console.error("Error loading selected date data:", error)
    buttonLayer.classList.add("hidden")
    apodImage.classList.add("hidden")
    apodLoading.innerHTML = `
    <i class="fa-solid fa-triangle-exclamation
        text-4xl text-red-400 mb-4"></i>
         <p class="text-slate-400">Failed to load image</p>`
    apodLoading.classList.remove("hidden")
    apodDate.innerHTML = `Astronomy Picture of the Day - invalid `
    apodDateCalendar.innerHTML = "invalid date"
    apodTitle.innerHTML = ""
    apodExplanation.innerHTML = ""
    apodCopyright.innerHTML = `&copy; NASA/JPL`
    apodDateInfo.innerHTML = "invalid"
    apodMediaType.innerHTML = "image"
  }
}

// _______________________________________________________________________________________________

getTodaySpaceApi();

// _______________________________________________________________________________________________

apodDateInput.addEventListener("change", function () {
  if (dateSpan) {
    dateSpan.textContent = formatDate(apodDateInput.value)
  }
})

// _______________________________________________________________________________________________

function displayDateSpaceApi(data) {
  let todayIso = new Date().toISOString().split("T")[0]
  let dateSpan = apodDateInput.nextElementSibling

  apodImage.setAttribute("src", data.hdurl || data.url)
  apodImage.setAttribute("alt", data.title)
  apodDate.innerHTML = `Astronomy Picture of the Day - ${formatDate(data.date)} `
  apodDateCalendar.innerHTML = `<i class="far fa-calendar mr-2"></i>${formatDate(data.date)}</span>`
  apodDateInput.setAttribute("value", data.date)
  apodDateInput.setAttribute("max", todayIso)
  displayDate.innerHTML = data.date
  apodTitle.innerHTML = data.title
  showFullResolution.setAttribute("href", data.hdurl)
  apodExplanation.innerHTML = data.explanation
  apodCopyright.innerHTML = `&copy ${data.copyright || "NASA/JPL"}`
  apodDateInfo.innerHTML = formatDate(data.date)
  apodMediaType.innerHTML = data.media_type

  apodDateInput.addEventListener("change", function () {
    if (dateSpan) {
      dateSpan.textContent = formatDate(apodDateInput.value)
    }
  })
}
// _______________________________________________________________________________________________

function formatDate(dateString) {
  if (!dateString) return ""
  let options = { year: "numeric", month: "long", day: "numeric" }
  let date = new Date(dateString)
  return date.toLocaleDateString("en-US", options)
}

// _______________________________________________________________________________________________

todayBtn.addEventListener("click", function () {
  getTodaySpaceApi()
})

loadBtn.addEventListener("click", function () {
  getDateSpaceApi()
})

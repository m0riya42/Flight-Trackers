let openedSideButton;
let openedInsideButton;

var img111 = new Image();

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function handleFiles(fileList) {
    if (!fileList.length) {
        console.log("No files selected!");
    } else {
        console.log(fileList.length);
        console.log(fileList[0]);

        getBase64(fileList[0]).then(
            (dataBase64) => {
                console.log(dataBase64)
            }
        );
        // img111.src = window.URL.createObjectURL(fileList[0]);

        // console.log("src: " + img111.src);
        // console.log("width: " + img111.width + " / height: " + img111.height);

        // img111.onload = function () {
        //     window.URL.revokeObjectURL(this.src);
        // }
    }
}


document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred
    // myDropzone = new Dropzone("#IconPicker", {
    //     url: (file) => {
    //         alert(file)
    //     }
    // });
})


const clearOpenedInsideButton = () => {
    if (openedInsideButton) {
        openedInsideButton.classList.remove('btn-insideMenu-selected');
    }
}
const clearOpenedsideButton = (toggleDivID) => {
    let selectedButton = $('#divMapSideMenu').find('.btn-sideMenu-selected')[0]
    if (selectedButton) {
        selectedButton.classList.remove('btn-sideMenu-selected');
        //close toggle:
        openedSideButton.classList.remove('insideMenu-open');
        // close height
        if (openedSideButton.id === toggleDivID) {
            openedSideButton = null;
            return false;
        }
    }
    return true;

}




function toggleDiv(params) {

    clearOpenedInsideButton();
    if (clearOpenedsideButton(params.id)) {
        //Open new One:
        if (params.id) {
            openedSideButton = document.getElementById(params.id);;
            openedSideButton.classList.add('insideMenu-open');
            // openedSideButton.style.display = 'contents';
            // openedSideButton.style.display === 'none' ? openedSideButton.style.display = 'contents' : openedSideButton.style.display = 'none';
            params.targetEvent.classList.add('btn-sideMenu-selected')
        }
    }


}



const toggleButtons = (params) => {
    // [{id: , classes:[]}]
    params.forEach(el => {
        el.classes.forEach(elClass => {
            document.getElementById(el.id).classList.toggle(elClass);
        })
    })

}
document.getElementById('openSideMenuBtn').addEventListener('click', () => toggleButtons([{ id: 'divMapSideMenu', classes: ['mapMenu-open'] }, { id: 'signOpenSideMenu', classes: ['fa', 'fa-times', 'fas', 'fa-bars'] }]));



const onInsideButtonClicked = (e) => {
    clearOpenedInsideButton();
    //Create New Selected-inside-nutton
    e.target.classList.add('btn-insideMenu-selected');
    openedInsideButton = e.target

    //After Work Done- close toggle 
    // switch (e.target.closest('div').id){
    // case 'shapeAreas':
    //return onClickShapeArea({shapeType: e.target.attributes.getNamedItem('handler').value })

    // }

}


// const onShapeChoosen = ({target, targetId}) => {
//     // switch (targetId) {
//     //     case 'Polygon':
//     //         alert('POlygon');
//     // }

const closeInsideSettingDiv = ({ divId }) => {
    // debugger
    let openedDiv = $('#toolbarBoxesDiv').find('.toolbarBoxes-open')[0];
    openedDiv && openedDiv.id != divId && openedDiv.classList.remove('toolbarBoxes-open');
}


//     //    toggleButtons( [{ id: 'divMapSideMenu', classes: ['mapMenu-open'] }]);
// }
$('.insideMenu').on('click', 'button', onInsideButtonClicked);


document.getElementById('popUpSettingsBtn').addEventListener('click', () => {
    closeInsideSettingDiv({ divId: 'popUpSettings' });
    toggleButtons([{ id: 'popUpSettings', classes: ['popUpSettingBlock-open'] }, { id: 'popUpSettingSign', classes: ['spinnFontAwsome'] }]);
})

document.getElementById('popUpSearchBtn').addEventListener('click', () => {
    // closeInsideSettingDiv({ divId: 'popUpSettings' });
    toggleButtons([{ id: 'searchInputDiv', classes: ['popUpSearchBlock-open'] }]);
    //+focus on input if opened
    let selectedButton = $('#searchInputDiv')[0];
    selectedButton && selectedButton.classList.contains('popUpSearchBlock-open') && document.getElementById("searchInput").focus();

})



//Toolbar Registration To Events
document.getElementById('setColor').addEventListener('click', () => {
    closeInsideSettingDiv({ divId: 'setColorToolbar' });
    toggleButtons([{ id: 'setColorToolbar', classes: ['toolbarBoxes-open'] }])
})

document.getElementById('setText').addEventListener('click', () => {
    closeInsideSettingDiv({ divId: 'textToolbar' });
    toggleButtons([{ id: 'textToolbar', classes: ['toolbarBoxes-open'] }])
})

document.getElementById('setIcon').addEventListener('click', () => {
    closeInsideSettingDiv({ divId: 'iconToolbar' });
    toggleButtons([{ id: 'iconToolbar', classes: ['toolbarBoxes-open'] }])
})


// document.getElementById('openMobileToolbarBtn').addEventListener('click', () => toggleButtons([{ id: 'mobileToolbar', classes: ['mobileToolbar-open'] }, { id: 'signOpenToolbarMenu', classes: ['fa-angle-up', 'fa-angle-down'] }]));
// fas fa-angle-upfas fa-angle-down

// document.getElementById('openSideMenuBtn').addEventListener('click', () => {
//     document.getElementById('divMapSideMenu').classList.toggle('mapMenu-open');
//     //fa fa-times
//     //fas fa-bars
//     document.getElementById('signOpenSideMenu').classList.toggle('fa');
//     document.getElementById('signOpenSideMenu').classList.toggle('fa-times');
//     document.getElementById('signOpenSideMenu').classList.toggle('fas');
//     document.getElementById('signOpenSideMenu').classList.toggle('fa-bars');
// })



/****************************************/
/*            Basic Map                 */
/****************************************/

// API key at https://www.maptiler.com/cloud/
var key = 'GA7N1mQcvcTE7mnV8sG1';
var attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const mapVectorSource = new ol.source.Vector({
    features: []
})
const mapVectorLayer = new ol.layer.Vector({
    source: mapVectorSource,
});

const map = new ol.Map({
    target: document.getElementById('map'),
    view: new ol.View({
        // center: center,
        center: [35.217018, 31.771959],
        projection: 'EPSG:4326',
        zoom: 5,
        minZoom: 1,
        maxZoom: 20,
    }),
    // controls: [
    //     new OpenLayers.Control.Attribution({})
    // ],
    layers: [
        new ol.layer.Tile({
            // source: new ol.source.OSM() //original map
            source: new ol.source.XYZ({
                attributions: attributions,
                url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=' + key,
                tileSize: 512,
            }),
        }), mapVectorLayer],
});

// map.removeControl(ol.control.ZoomSlider)

/****************************************/
/*         Request for Airplanes        */
/****************************************/

//add polyline: for challenge:
// var locations = [[36.11, 15.4], [36.11, 89.4]];
// var polyline = new ol.Feature(new ol.geom.LineString(locations));
// mapVectorSource.addFeature(polyline)

function createAirplaneIcon(el) {

    let airplane = new ol.Feature({
        geometry: new ol.geom.Point([el[5], el[6]]),
        _icao24: el[0],
        _callsign: el[1],
        // id: el[0]
    })
    airplane.setId(parseInt(el[0]));
    console.log(airplane);
    console.log(mapVectorSource.getFeaturesAtCoordinate([el[5], el[6]]));

    // airplane._icao24 = el[0];
    // airplane._callsign = el[1];
    setAirplaneAngle({ newRotation: el[10], airplane });
    // let lon = 
    // let lat = el[6]
    mapVectorSource.addFeature(airplane)
}
function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

function setAirplaneAngle({ newRotation, airplane }) {
    let rotation = degrees_to_radians(newRotation);

    if (!airplane.getStyle() || airplane.getStyle().getImage().getRotation() !== rotation) {
        airplane.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
                // src: images.airplane,
                src: "./assets/img/airplane.png",
                rotation: rotation,
            })
        }))
    } else {
        console.log("same rotation");
    }
}

function requestForIsraelAirplanes() {
    // let a = new Date(2021, 02, 02, 21, 15, 30).getTime()
    let a = new Date().getTime();
    let searchA = Math.floor(a / 1000 + 900 + 330 * 60)
    console.log(searchA);
    console.log(a);
    let requestURL = 'https://opensky-network.org/api/states/all?time=' + searchA;
    let request = new XMLHttpRequest();

    // let flagOneAirplane = true;
    request.open('GET', requestURL, true);
    request.responseType = 'json';
    request.onload = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                // console.log(request.response)
                request.response.states.forEach((el) => {
                    if (el[2] === "Israel" && !mapVectorSource.getFeatureById(parseInt(el[0]))) {//} && flagOneAirplane) {
                        // if (!mapVectorSource.getFeatureById(el[0])) {
                        console.log(el);


                        // flagOneAirplane = false;
                        createAirplaneIcon(el);

                        // debugger
                    }
                    else { //update coordinates:
                        if (mapVectorSource.getFeatureById(parseInt(el[0]))) {
                            console.log(`airplane: ${el[0]} updated`);
                            // mapVectorSource.getFeatureById(parseInt(el[0])).getGeometry().setCoordinates([el[5], el[6]]);
                            let airplane = mapVectorSource.getFeatureById(parseInt(el[0]));
                            airplane.getGeometry().setCoordinates([el[5], el[6]]);
                            setAirplaneAngle({ newRotation: el[10], airplane });
                        }
                    }
                })
            } else {
                console.error(request.statusText);
            }
        }
    }.bind(this);
    request.onerror = function (e) {
        console.error(request.statusText);
    };
    request.send(null);
}

setInterval(requestForIsraelAirplanes, 10000);



//Draw for 
const draw = new ol.interaction.Draw({
    source: mapVectorSource,
    type: "Polygon",
});
drawPolygon = () => {
    map.addInteraction(draw);
    draw.on('drawend', () => map.removeInteraction(draw));
}

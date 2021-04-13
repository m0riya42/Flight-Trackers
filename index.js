// var img111 = new Image();

document.addEventListener('DOMContentLoaded', (event) => {
    // the event occurred
    // myDropzone = new Dropzone("#IconPicker", {
    //     url: (file) => {
    //         alert(file)
    //     }
    // });
    registerToEvents();
})

let openedSideButton;
let openedInsideButton;

/****************************************/
/*        Using Imported Classes:       */
/****************************************/


//jsPDF
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

function saveToPDF() {

    var doc = new jsPDF('landscape', "mm", 'A4');
    doc.setFontSize(13);
    var width = doc.internal.pageSize.width;
    // var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.height;

    doc.fromHTML($('#TableInformationDiv').html(), 15, 15, {
        'width': width,
        'height': height,
        'elementHandlers': specialElementHandlers
    });
    doc.save('Area Information.pdf');
}

//Save image bits
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
                //in order to change icons we have to make sure:
                //that after  updating the image the airplanes will still have thier true track. 
                changeAirplaneIcon(dataBase64)
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


//export to excel:
function exportReportToExcel() {
    let table = document.getElementById("tableId"); // you can use document.getElementById('tableId') as well by providing id to the table tag
    TableToExcel.convert(table, { // html code may contain multiple tables so here we are refering to 1st table tag
        name: `export.xlsx`, // fileName you could use any name
        sheet: {
            name: 'Sheet 1' // sheetName
        }
    });
}

/****************************************/
/*              Global Functions:       */
/****************************************/



const clearOpenedSideButton = (toggleDivID) => {
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

function onSideButtonClicked(params) {
    //example: {id:'shapeAreas', targetEvent: event.target}
    if (clearOpenedSideButton(params.id)) {
        //Open new One:
        if (params.id) {
            openedSideButton = document.getElementById(params.id);;
            openedSideButton.classList.add('insideMenu-open');
            params.targetEvent.classList.add('btn-sideMenu-selected')
        }
        else {
            toggleSideMenu();
            sideButtonsHandler({ id: params.targetEvent.id })
            // closeOpenMobileToolbar({})

            // //Do Action As Requested
            // switch (params.targetEvent.id) {
            //     case "filterFlight":
            //         $('#filterAreasToolbar')[0].classList.add('mobileToolbarInsideDivs-open');
            //         break;


            // }

        }
    }


}

const toggleStyleClasses = (params) => {
    // [{id: , classes:[]}]
    params.forEach(el => {
        el.classes.forEach(elClass => {
            document.getElementById(el.id).classList.toggle(elClass);
        })
    })

}

const onInsideButtonClicked = (e) => {
    //Create New Selected-inside-nutton
    openedInsideButton = e.target
    console.log(e.target.attributes.getNamedItem('handler').value)
    //After Work Done- close toggle 


    sideButtonsHandler({ id: e.target.closest('div').id });
    // switch (e.target.closest('div').id) {
    //     case 'shapeAreas':
    //         //Show toolbar: Make sure to close it when starting drawing/choosing shape
    //         closeOpenMobileToolbar({ divId: 'AreaChooseShapeToolbar' })
    //         $('#AreaChooseShapeToolbar')[0].classList.add('mobileToolbarInsideDivs-open');
    //         break
    //AreaChooseShape
    //return onClickShapeArea({shapeType: e.target.attributes.getNamedItem('handler').value })

    // case 'filterAreas':
    //Show toolbar: Make sure to close it when starting drawing/choosing shape



    //Do the Requested Action: and maybe opened needed toolbar.
    //Needed toolbar: .mobileToolbarInsideDivs-open
    // }
    //Earse Father class selected and close the Side Menu
    clearOpenedSideButton();
    toggleSideMenu();
}

const sideButtonsHandler = ({ id }) => {

    closeOpenMobileToolbar({})

    //Do Action As Requested
    switch (id) {
        case 'shapeAreas':
            //Show toolbar: Make sure to close it when starting drawing/choosing shape
            // closeOpenMobileToolbar({ divId: 'AreaChooseShapeToolbar' })
            $('#AreaChooseShapeToolbar')[0].classList.add('mobileToolbarInsideDivs-open');
            break
        case "filterFlight":
            $('#filterAreasToolbar')[0].classList.add('mobileToolbarInsideDivs-open');
            break;

    }
}

const closeInsideSettingDiv = ({ divId }) => {
    let openedDiv = $('#toolbarBoxesDiv').find('.toolbarBoxes-open')[0];
    openedDiv && openedDiv.id != divId && openedDiv.classList.remove('toolbarBoxes-open');
}

const closeOpenMobileToolbar = ({ divId }) => {
    let openedDiv = $('#mobileToolbarDiv').find('.mobileToolbarInsideDivs-open')[0];
    openedDiv && openedDiv.id != divId && openedDiv.classList.remove('mobileToolbarInsideDivs-open');
}


/****************************************/
/*            Specific Functions:       */
/****************************************/

const toggleSideMenu = () => {
    toggleStyleClasses([{ id: 'divMapSideMenu', classes: ['mapMenu-open'] }, { id: 'signOpenSideMenu', classes: ['fa', 'fa-times', 'fas', 'fa-bars'] }]);

}

const onSetAreaNameClicked = ({ nameInput, buttonSign, targetEvent, }) => {
    //nameInput:'inputAreaName', buttonSign:'popUpEditSign'

    toggleStyleClasses([{ id: buttonSign, classes: ['fa-edit', 'fa-save'] }]);
    let elNameInput = $(`#${nameInput}`)[0];

    // debugger
    if (elNameInput.hasAttribute("disabled")) {
        elNameInput.removeAttribute("disabled");
    }
    else {

        elNameInput.setAttribute("disabled", "");
        //Save New Name to the shape


    }
}

const registerToEvents = () => {
    document.getElementById('openSideMenuBtn').addEventListener('click', toggleSideMenu);

    $('.insideMenu').on('click', 'button', onInsideButtonClicked);


    document.getElementById('popUpSettingsBtn').addEventListener('click', () => {
        closeInsideSettingDiv({ divId: 'popUpSettings' });
        toggleStyleClasses([{ id: 'popUpSettings', classes: ['popUpSettingBlock-open'] }, { id: 'popUpSettingSign', classes: ['spinnFontAwsome'] }]);
    })

    document.getElementById('popUpSearchBtn').addEventListener('click', () => {
        // closeInsideSettingDiv({ divId: 'popUpSettings' });
        toggleStyleClasses([{ id: 'searchInputDiv', classes: ['popUpSearchBlock-open'] }]);
        //+focus on input if opened
        let selectedButton = $('#searchInputDiv')[0];
        selectedButton && selectedButton.classList.contains('popUpSearchBlock-open') && document.getElementById("searchInput").focus();

    })



    //Toolbar Registration To Events
    document.getElementById('setColor').addEventListener('click', () => {
        closeInsideSettingDiv({ divId: 'setColorToolbar' });
        toggleStyleClasses([{ id: 'setColorToolbar', classes: ['toolbarBoxes-open'] }])
    })

    document.getElementById('setText').addEventListener('click', () => {
        closeInsideSettingDiv({ divId: 'textToolbar' });
        toggleStyleClasses([{ id: 'textToolbar', classes: ['toolbarBoxes-open'] }])
    })

    document.getElementById('setIcon').addEventListener('click', () => {
        closeInsideSettingDiv({ divId: 'iconToolbar' });
        toggleStyleClasses([{ id: 'iconToolbar', classes: ['toolbarBoxes-open'] }])
    })



}


const onAreaClicked = () => {
    //style: .mobileToolbarInsideDivs-open


}




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



changeAirplaneIcon = (iconBits) => {
    // debugger
    mapVectorSource.getFeatures().forEach(feature => {
        feature.getStyle().setImage(new ol.style.Icon({ src: iconBits }))
        feature.changed();
    })
}

/****************************************/
/*            Draw Shapes               */
/****************************************/

const draw = new ol.interaction.Draw({
    source: mapVectorSource,
    type: "Polygon",
});
drawPolygon = () => {
    map.addInteraction(draw);
    draw.on('drawend', () => map.removeInteraction(draw));
}



/****************************************/
/*            Table JS                 */
/****************************************/

/*function addUserEvent(event) {
    debugger

    //DOM:
    tbodyElement = event.target.parentElement.parentElement.getElementsByTagName('tbody')[0];
    newLineNumber = tbodyElement.rows.length;
    bodyId = tbodyElement.id;
    newRaw = tbodyElement.insertRow(newLineNumber);

    //edit html row
    myHtmlContent = '<td class="pl-4">#newLIneNumber#</td><td><input class="font-medium mb-0 editableInput" name="fullName" size="12"  ></input></td><td><input class="font-medium mb-0 editableInput" name="userName" size="12" ></input></td><td><input class="font-medium mb-0 editableInput" name="password" size="12" ></input></td>'
    selectHtml = '<td><select class="form-control category-select" ="width: 109px; height: auto;" id="exampleFormControlSelect1"><option>Manger</option><option>Worker</option><option>Customer</option><option>Supplier</option></select></td>';
    storeId = '<td><input class="font-medium mb-0 editableInput" name="storeId" size="5"></input></td>';
    htmlContinue = '<td><input class="font-medium mb-0 editableInput" name="Email" size="12" ></input></td><td><input class="font-medium mb-0 editableInput" name="Phone" size="12" ></input></td><td><button type="button" name="buttonDeleteUser"class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2 deleteUserStyle"><i class="fa fa-trash"></i></button><button type="button" name="buttonEditUser"class="btn btn-outline-info btn-circle btn-lg -circle ml-2 editUserStyle"><i class="fa fa-edit"></i> </button><button type="button" name="buttonSaveUser"class="btn -outline-info btn-circle btn-lg btn-circle ml-2 saveUserStyle"><i class="fa fa-save"></i> </button></td>';
    myHtmlContent = myHtmlContent.replace('#newLIneNumber#', ++newLineNumber);


    if (bodyId === 'Worker') {
      myHtmlContent = myHtmlContent + selectHtml + storeId + htmlContinue;
    }
    else {
      myHtmlContent = myHtmlContent + selectHtml + htmlContinue;
    }
    newRaw.innerHTML = myHtmlContent;

    //registering to events:

    newRaw.getElementsByClassName('editUserStyle')[0].addEventListener('click', editUserEvent)
    newRaw.getElementsByClassName('saveUserStyle')[0].addEventListener('click', saveUserEvent)
    newRaw.getElementsByClassName('deleteUserStyle')[0].addEventListener('click', deleteUserEvent)

*/


/****************************************/
/*            Unix Time               */
/****************************************/


/*
בהתחלה ניסינו לבקש מהשרת בjavaScript את הנתונים, ולנסות 'לגעת' במשתנים.
כדי לקבל את הזמן ברגע הבקשה ולהמיר אותה ל unix-time:
let epochTime=Math.round(new Date().getTime() / 1000)
כדי לקבל את התאריך בחזרה:
let normalTime= newDate(0); // 0:sets the date to epoch
normalTime.setUTCSeconds(epochTime);
}
*/

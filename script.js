fetch(
    'https://dry-peak-71495.herokuapp.com/http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=LXCON&NumMins=90&format=xml'
)
    .then((res) => res.text())
    .then((data) => xmlParsing(data, 'Leixlip (Confey)'));

const tableBody = document.getElementById('tData');
const title = document.getElementById('title');

const xmlParsing = (txt, station) => {
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(txt, 'text/xml');
    }

    tableBody.innerHTML = '';

    title.innerText = station + ' Train Times';

    const dueIn = xmlDoc.getElementsByTagName('Duein');
    const departs = xmlDoc.getElementsByTagName('Expdepart');
    const arrival = xmlDoc.getElementsByTagName('Destinationtime');
    const origin = xmlDoc.getElementsByTagName('Origin');
    const destination = xmlDoc.getElementsByTagName('Destination');

    for (let i = 0; i < dueIn.length; i++) {
        //create table row element
        const row = document.createElement('tr');

        //create table cell elements
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        const cell3 = document.createElement('td');
        const cell4 = document.createElement('td');
        const cell5 = document.createElement('td');

        //create table text nodes
        const text1 = document.createTextNode(
            dueIn[i].childNodes[0].nodeValue + ' mins'
        );
        const text2 = document.createTextNode(
            departs[i].childNodes[0].nodeValue
        );
        const text3 = document.createTextNode(
            arrival[i].childNodes[0].nodeValue
        );
        const text4 = document.createTextNode(
            origin[i].childNodes[0].nodeValue
        );
        const text5 = document.createTextNode(
            destination[i].childNodes[0].nodeValue
        );

        //add text to cells
        cell1.appendChild(text1);
        cell2.appendChild(text2);
        cell3.appendChild(text3);
        cell4.appendChild(text4);
        cell5.appendChild(text5);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);

        tableBody.appendChild(row);
    }
};

const update = () => {
    const select = document.getElementById('station');
    const option = select.options[select.selectedIndex];

    fetch(
        `https://dry-peak-71495.herokuapp.com/http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=${option.value}&NumMins=90&format=xml`
    )
        .then((res) => res.text())
        .then((data) => xmlParsing(data, option.text));
};

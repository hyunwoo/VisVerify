/**
 * Created by Hyunwoo on 2016. 1. 26..
 */


/*
 Utility function: populates the <FORM> with the SVG data
 and the requested output format, and submits the form.
 */

var currentH = 50;

var width = 1200;
var height = 800;
var svg;

var selectedArc = 1;
var arcList = [];
var savedIndex = 0;
var inputParent;
var elementButtonParent;

var text = ["Inner Radius", "Outer Radius", "Rotate Angle", "Size Angle", "Color", "Opacity"];
var type = ['number', 'number', 'number', 'number', 'text', 'number'];

var defaultValue = [50, 100, 0, 100, '#FFAA00', 100];

var inputs = [];

function onChangeHSB(v) {

    var v = Number(v);
    var delta = v - currentH;
    currentH = v;

    var keys = Object.keys(arcList);

    for (var i = 0; i < keys.length; i++) {
        var d = arcList[keys[i]];
        if (d == null) continue;
        var hex = d.DrawInfo.color;
        var rgb = hexToRgb(hex);
        var hsb = RGBtoHSV(rgb.r, rgb.g, rgb.b);
        hsb.h += delta / 50;
        for (; ;) {
            if (hsb.h >= 1.0) {
                hsb.h = hsb.h - 1.0;
            } else break;
        }

        for (; ;) {
            if (hsb.h <= 0.0) {
                hsb.h = hsb.h + 1.0;
            } else break;
        }

        rgb = HSVtoRGB(hsb.h, hsb.s, hsb.v);
        hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        d.DrawInfo.color = hex;
        d.updateSVG();

    }
}


function deleteElement() {
    var d = arcList[selectedArc];

    d.svg.remove();
    elementButtonParent.removeChild(d.button);

    delete arcList[selectedArc];

}

function appendArcController() {
    var parent;
    inputParent = parent = document.getElementById("div_inputs");

    var delete_button = document.createElement("button");
    delete_button.style.width = '300px';
    delete_button.style.height = '30px';
    delete_button.style.margin = '2px 1px';
    delete_button.style.background = '#dd0000'
    delete_button.setAttribute('align', 'center');
    delete_button.style.fontSize = '12px';
    delete_button.innerHTML = "DELETE ELEMENT";
    delete_button.style.color = '#ffffff';
    delete_button.setAttribute('onclick', 'deleteElement()');
    parent.appendChild(delete_button);

    for (var i = 0; i < 6; i++) {
        var input = document.createElement("INPUT");
        input.setAttribute("type", type[i]);
        input.style.width = '300px';
        input.style.height = height[i];
        input.style.margin = '2px 1px';
        input.setAttribute('align', 'center');
        input.value = defaultValue[i];

        input.setAttribute('onchange', "changeTest(this)");
        input.setAttribute('name', text[i]);
        inputs.push(input);

        var head = document.createElement("div");
        head.innerHTML = text[i];
        head.style.paddingtop = '15px';
        head.style.fontSize = '15px';
        head.style.color = '#6f6f6f';

        parent.appendChild(head);
        parent.appendChild(input);
    }

}


function initialize() {
    width = document.getElementById("renderer").offsetWidth;
    height = document.getElementById("renderer").offsetHeight;
    svg = d3.select("#renderer").append("svg")
    svg.attr("width", width).attr("height", height)
}


function draw() {

}

initialize();
draw();
appendArcElement();
appendArcController();


function onClickElement(v) {
    selectedArc = v;

    var d = arcList[selectedArc];
    inputs[0].value = d.ArcInfo.iR;
    inputs[1].value = d.ArcInfo.oR;
    inputs[2].value = d.ArcInfo.rA;
    inputs[3].value = d.ArcInfo.sA;
    inputs[4].value = d.DrawInfo.color;
    inputs[5].value = d.DrawInfo.opacity;

    document.getElementById("div_selected_number").innerHTML = "SELECTED : " + selectedArc;
}
function appendArcElement(arcinfo, drawinfo) {
    savedIndex++;

    var eleParent;
    elementButtonParent = eleParent = document.getElementById("div_elements");
    var button = document.createElement("Button");
    button.className += 'btn btn-default';
    button.style.width = '40px';
    button.style.height = '40px';
    button.style.margin = '1px';
    button.style.stroke = 'none';
    button.style.strokeWidth = '0px';
    button.style.color = "#FFFFFF";
    button.innerHTML = "" + savedIndex;
    button.setAttribute('onclick', 'onClickElement(this.innerHTML)');
    eleParent.appendChild(button);

    var colorTable = [
        '#083064',
        '#1870b6',
        '#22aee8',
        '#039e46',
        '#53b131',
        '#fded00',
        '#f3a400',
        '#eb7300',
        '#c21e1a',
        '#facc00'
    ];
    var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(100)
        .startAngle(-50 * (Math.PI / 180)) //converting from degs to radians
        .endAngle(50 * (Math.PI / 180)) //just radians

    var svgElement = svg.append("path")
        .attr("d", arc)
        .attr("transform", "translate(" + width / 2 + " , " + height / 2 + ")")
        .attr('fill', '#fffff0')

    var hex = colorTable[savedIndex % colorTable.length];

    var baseElement;
    if (arcinfo == null) {
        baseElement = {
            svg: svgElement,
            d: arc,
            ArcInfo: {
                iR: 0,
                oR: 250,
                rA: 30 * savedIndex,
                sA: 30,
            },
            button: button,
            DrawInfo: {
                color: hex,
                opacity: defaultValue[5],
                stroke: '#FFFFFF',
            },
            updateD: function () {
                this.d
                    .innerRadius(Number(this.ArcInfo.iR))
                    .outerRadius(Number(this.ArcInfo.oR))
                    .startAngle((Number(this.ArcInfo.rA) - Number(this.ArcInfo.sA) * 0.5)
                        * (Math.PI / 180)) //converting from degs to radians
                    .endAngle((Number(this.ArcInfo.rA) + Number(this.ArcInfo.sA) * 0.5)
                        * (Math.PI / 180)) //converting from degs to radians

                return this;
            },

            updateSVG: function () {
                this.svg
                    .attr("d", this.d)
                    .attr("fill", this.DrawInfo.color)
                    .attr("opacity", this.DrawInfo.opacity * 0.01)

                button.style.background = this.DrawInfo.color;
                button.style.stroke = this.DrawInfo.opacity;
                return this;
            }


        }
    } else {
        baseElement = {
            svg: svgElement,
            d: arc,
            ArcInfo: {
                iR: arcinfo.iR,
                oR: arcinfo.oR,
                rA: arcinfo.rA,
                sA: arcinfo.sA,
            },
            button: button,
            DrawInfo: {
                color: drawinfo.color,
                opacity: drawinfo.opacity,
                stroke: drawinfo.stroke,
            },
            updateD: function () {
                this.d
                    .innerRadius(Number(this.ArcInfo.iR))
                    .outerRadius(Number(this.ArcInfo.oR))
                    .startAngle((Number(this.ArcInfo.rA) - Number(this.ArcInfo.sA) * 0.5)
                        * (Math.PI / 180)) //converting from degs to radians
                    .endAngle((Number(this.ArcInfo.rA) + Number(this.ArcInfo.sA) * 0.5)
                        * (Math.PI / 180)) //converting from degs to radians

                return this;
            },

            updateSVG: function () {
                this.svg
                    .attr("d", this.d)
                    .attr("fill", this.DrawInfo.color)
                    .attr("opacity", this.DrawInfo.opacity * 0.01)

                button.style.background = this.DrawInfo.color;
                button.style.stroke = this.DrawInfo.opacity;
                return this;
            }


        }
    }
    baseElement.updateD();
    baseElement.updateSVG();
    arcList[savedIndex] = baseElement;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min:
            h = 0;
            break;
        case r:
            h = (g - b) + d * (g < b ? 6 : 0);
            h /= 6 * d;
            break;
        case g:
            h = (b - r) + d * 2;
            h /= 6 * d;
            break;
        case b:
            h = (r - g) + d * 4;
            h /= 6 * d;
            break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function changeTest(element) {
    switch (element.name) {
        case text[0]:
            arcList[selectedArc].ArcInfo.iR = element.value;
            break;

        case text[1]:
            arcList[selectedArc].ArcInfo.oR = element.value;
            break;

        case text[2]:
            arcList[selectedArc].ArcInfo.rA = element.value;
            break;

        case text[3]:
            arcList[selectedArc].ArcInfo.sA = element.value;
            break;

        case text[4]:
            arcList[selectedArc].DrawInfo.color = element.value;
            break;

        case text[5]:
            arcList[selectedArc].DrawInfo.opacity = element.value;
            break;

        default:
            break;
    }
    arcList[selectedArc].updateD().updateSVG();

}


function submit_download_form(output_format) {
    // Get the d3js SVG element
    var tmp = document.getElementById("renderer");
    var svg = tmp.getElementsByTagName("svg")[0];
    // Extract the data as SVG text string
    var svg_xml = (new XMLSerializer).serializeToString(svg);

    // Submit the <FORM> to the server.
    // The result will be an attachment file to download.
    //var form = document.getElementById("svgform");
    //form['output_format'].value = output_format;
    //form['data'].value = svg_xml;
    download("test.svg", svg_xml)
    form.submit();

}

function getSvgContents() {
    var tmp = document.getElementById("renderer");
    var svg = tmp.getElementsByTagName("svg")[0];
    var svg_xml = (new XMLSerializer).serializeToString(svg);
    return svg_xml;
}


function getSvgElement() {
    var tmp = document.getElementById("renderer");
    var svg = tmp.getElementsByTagName("svg")[0];
    return svg;
}

function downloadPdf(filename) {
    var pdf = new jsPDF('p', 'pt', 'a4');
    pdf = svgElementToPdf(getSvgElement(), pdf)
    console.log(pdf);
}

function saveArcToDB() {
    var filename = document.getElementById("inputFileName").value;
    var stringArcs = JSON.stringify(arcList);
    console.log(filename, stringArcs)
    $.post('/ci/freeArcs/save', {
        name: filename,
        data: stringArcs
    }, function (err, rep) {

    })
}

function loadArc() {
    var filename = document.getElementById("inputFileName").value;

}

function downloadSvg() {
    savedIndex = 0;
    var filename = document.getElementById("inputSearchName").value;
    console.log(filename);
    console.log(arcList);
    $.get('/ci/freeArcs/load?name=' + filename, function (rep, sucess) {

        console.log(sucess, rep);
        if (sucess == false) return;
        var data = JSON.parse(rep);

        for(var i = arcList.length - 1; i >= 0 ; i --){
            if(arcList[i] == null) continue;
            var d = arcList[i];
            d.svg.remove();
            elementButtonParent.removeChild(d.button);
            delete arcList[i];
        }

        arcList = [];
        savedIndex = 0;
        for (var i = 0; i < data.length; i++) {
            if(data[i] == null) continue;
            appendArcElement(data[i].ArcInfo, data[i].DrawInfo)
        }
    })
    /*
     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contents));
     element.setAttribute('download', filename + ".pdf");
     element.style.display = 'none';
     document.body.appendChild(element);
     element.click();
     document.body.removeChild(element);*/
}


/*
 One-time initialization
 */
$(document).ready(function () {
    $("#btnDownloadSVG").click(function () {
        console.log("btnDownloadSVG")
        submit_download_form("svg");
    });

});

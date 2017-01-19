function makeWordCloud(data) {


    var color = ["#4E4233", "#C48088", "#A8ADB0", "#212A31", "#42586A","#FD7F00"];


    $('.graph-bg').empty();
    var svg = d3.select('.graph-bg').append("svg").attr("class", 'fulid-svg');
    var width = svg.style('width').replace('px', '') * 1;
    var height = svg.style('height').replace('px', '') * 1 -200;

    var maxValue = _.max(data, function (o) {
        return Number(o.value);
    }).value;


    console.log('max : ', maxValue);


    //return;
    var categories = d3.keys(d3.nest().key(function (d) {
        return d.category;
    }).map(data));
    var color = d3.scale.ordinal().range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"]);
    var fontSize = d3.scale.pow().exponent(0.5).domain([0, 1]).range([10, 80]);

    var layout = d3.layout.cloud()
        .timeInterval(10)
        .size([width, height])
        .words(data)
        .rotate(function (d) {
            return 0;
        })
        .font('monospace')
        .fontSize(function (d, i) {

            return fontSize(d.value / maxValue);
        })
        .text(function (d) {
            return d.key;
        })
        .spiral("archimedean")
        .on("end", draw)
        .start();


    var wordcloud = svg.append("g")
        .attr('class', 'wordcloud')
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1)
        .domain(categories);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll('text')
        .style('fonts-size', '20px')
        .style('fill', function (d) {
            return color(d);
        })
        .style('font', 'sans-serif');

    function draw(words) {
        wordcloud.selectAll("text")
            .data(words)
            .enter().append("text")
            .attr('class', 'cloud-word')
            .style("font-size", function (d) {
                console.log(d.size);
                return d.size;
            })
            .style("fonts-family", function (d) {
                return d.font;
            })
            .style("fill", function (d) {
                if (_.isNull(d.color)) return "#000";
                else return d.color;
            })
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) {
                return d.text;
            });
    };

}

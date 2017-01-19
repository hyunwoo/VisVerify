function makeWordCloud(data) {


    var colors = [
        d3.rgb('#3a383a'),
        d3.rgb('#b93141'),
        d3.rgb('#399992'),
        d3.rgb('#694d20'),
        d3.rgb('#295D7C'),
        d3.rgb('#CD5556')];

    // Question
    $('.question').addClass('cloudAndBar');
    $('.question').html(question.key);
    $('.story-telling').html(question.value);

    $('.graph-bg svg').remove();
    var svg = d3.select('.graph-bg').append("svg").attr("class", 'fulid-svg');
    var width = svg.style('width').replace('px', '') * 1;
    var height = svg.style('height').replace('px', '') * 1 - 200;

    var maxValue = _.max(data, function (o) {
        return Number(o.value);
    }).value;


    console.log('max : ', maxValue);


    //return;
    var categories = d3.keys(d3.nest().key(function (d) {
        return d.category;
    }).map(data));
    var fontsizeMax = 80;
    var fontsizeCenter = 40;
    var fontsizeMin = 10;
    var color = d3.scale.linear().domain([fontsizeMin, fontsizeCenter, fontsizeMax])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb("#000"), d3.rgb('#fff'), d3.rgb('#f00')]);
    var fontSize = d3.scale.pow().exponent(0.5).domain([0, 1]).range([fontsizeMin, fontsizeMax]);

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
                return d.size;
            })
            .style("fonts-family", function (d) {
                return d.font;
            })
            .style("fill", function (d) {
                var c = '#000';
                if (d.size < 20) {
                    c = colors[5 - (Math.floor(Math.random() * 2))];
                } else if (d.size < 50) {
                    c = colors[5 - (Math.floor(Math.random() * 2) + 2)];
                } else {
                    c = colors[5 - (Math.floor(Math.random() * 2) + 4)];
                }
                console.log(c);
                return c;
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

/**
 * Created by Luan on 2015. 11. 30..
 */




function upset(){
    root = d3.select("#upset").append("svg").attr('width',200).attr('height',450);
    var svg = root.append("g");
    var items = {
        group : [],
    };
    var upsetGroups = [];
    var matrix = [];
    var onUpset, offUpset;
    function clone(data, limit){
        var newData = [];
        for(var i = 0 ; i < limit ; i ++){
            if(data == null) newData.push(1);
            else newData.push(data[i]);
        }
        return newData;
    }


    function makeTree(data, limit, index){

        var newDataZero = clone(data,limit);
        newDataZero[index] = 1;

        var newDataOne = clone(data,limit);
        newDataOne[index] = 0;

        if(limit == index) {
            matrix.push(newDataZero);
            matrix.push(newDataOne);
        } else {
            makeTree(newDataZero, limit, index + 1);
            makeTree(newDataOne, limit, index + 1);
        }
    }


    function initialize(nodes){
        var groupCount = 0;
        var groudCountEach = {};
        for(var i = 0 ; i < nodes.length ; i ++){
            if(Number(nodes[i].category) > groupCount) groupCount = Number(nodes[i].category);
            if(groudCountEach[nodes[i].category] === undefined) groudCountEach[nodes[i].category] = 0;
            groudCountEach[nodes[i].category] ++;
        }
        var ratio = 100 / nodes.length ;


        makeTree(null,groupCount - 1, 0);

        for(var i = 1 ; i < groupCount + 1 ; i ++){

            var x = 16 + i * 18;
            var y = 100;

            var height = Math.min(groudCountEach[i] * ratio * 4, 90);
            svg.append("rect")
                .attr("x", x)
                .attr("y", y - height)
                .attr("width", 12)
                .attr("height", height)
                .attr("fill", ColorSet[i])
            svg.append('text')
                .attr("x", x + 6)
                .attr("y", y + 12)
                .attr('font-size',9)
                .attr("fill", '#cfcfcf')
                .attr('text-anchor','middle')
                .text(groudCountEach[i]);

        }

        for(var i = 0 ; i < matrix.length ; i ++){

            var count = 0 ;

            var cut = 0.85;
            for(var k = 0 ; k < nodes.length ; k ++){
                var isEnter = true;
                for(var j = 0 ; j < matrix[i].length ; j ++){
                    if(matrix[i][j] === 0){
                        if(nodes[k].partialCategory[j + 1] > cut) {
                            isEnter = false;
                            break;
                        }
                    } else {
                        if(nodes[k].partialCategory[j + 1] < cut) {
                            isEnter = false;
                            break;
                        }
                    }

                }
                if(isEnter) {
                    if(upsetGroups[i] === undefined)
                        upsetGroups[i] = [];
                    upsetGroups[i].push(nodes[k].id);
                    count ++;
                }
            }

            var group = svg.append('g').style('opacity',0);

            var bar = group.append('rect').attr('x', groupCount * 18 ).attr('y',-5).attr('width',0).attr('height',10).attr('fill','#9f9f9f');
            var text = group.append('text').attr('y', 5).attr('fill','#bfbfbf').attr('font-size','12px');



            for(var j = 0 ; j < matrix[i].length ; j ++){
                var x = j * 18 + 10 + 26;
                var y = 20 + i * 18 + 10 + 100;

                var color = ColorSet[j + 1];
                if(matrix[i][j] === 0) color = '#262626';

                group.append("ellipse")
                    .attr("cx", j * 18)
                    .attr("cy", 0)
                    .attr("rx", 7)
                    .attr("ry", 7)
                    .attr("fill", color)
            }
            var x = 36;
            var y = 20 + i * 18 + 10 + 100;

            var button = group.append("svg:image")
                .attr('x',-30)
                .attr('y',-9)
                .attr('width', 16)
                .attr('height', 16)
                .attr('checked', true)
                .attr("xlink:href","/img/crc/button_on.png")
                .attr('idx',i);

            var border = group.append('rect')
                .attr('x', -10)
                .attr('y',-8)
                .attr('width',155)
                .attr('height',18)
                .attr('fill','#efefef')
                .attr('opacity',0.0)
                .attr('idx',i);

            var item = {
                group : group,
                bar : bar,
                text : text,
                border : border,
                button : button,
                setValue : function (v, delay){
                    var width = Math.min(v * ratio, 65);
                    this.text.attr('width',0).attr('x', groupCount * 18 + 3);
                    this.text.transition().delay(delay).text(v).attr('x',groupCount * 18 + 3 + width)
                    .attr('width',v * ratio);
                    this.bar.transition().delay(delay).attr('width',width);

                },
                setIndex : function (v, delay){
                    var x = 40;
                    var y = 20 + v * 18 + 10 + 100;
                    this.group
                        .attr('transform', 'translate('+x+','+( y - 20)+')')
                        .style('opacity',0.0);
                    this.group.transition().delay(delay)
                        .attr('transform', 'translate('+x+','+y+')')
                        .style('opacity',1.0);
                },

                setHover : function(){
                    this.border.transition().attr('opacity',0.3);
                },

                setOut : function(){
                    this.border.transition().attr('opacity',0.0);
                },

                buttonClick : function(idx){
                    var b = this.button.attr('checked');
                    if(b === 'true'){
                        this.button.attr("xlink:href","/img/crc/button_off.png");
                        this.button.attr('checked', 'false');
                        console.log(upsetGroups[idx]);
                    } else {
                        this.button.attr("xlink:href","/img/crc/button_on.png");
                        this.button.attr('checked', 'true');
                        console.log(upsetGroups[idx]);
                    }
                }


            }
            border.on('mouseover',function(d){
                var idx = d3.select(this).attr('idx');
                items.group[idx].setHover();
                onUpset(upsetGroups[idx]);
            })
            border.on('mouseout', function(d){
                var idx = d3.select(this).attr('idx');
                items.group[idx].setOut();
                offUpset(upsetGroups[idx]);
            })

            button.on('click', function(d){
                var idx = d3.select(this).attr('idx');
                console.log(idx, items.group[idx]);

                items.group[idx].buttonClick(idx);
            })

            item.setIndex(i, i * 80);
            item.setValue(count, i * 80 + 350);
            items.group.push(item);
        }

    }

    function setUpsetDelegate(on, off){
        onUpset = on;
        offUpset = off;
    }


    upset.setUpsetDelegate = setUpsetDelegate;
    upset.initialize = initialize;
}



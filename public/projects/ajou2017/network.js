/**
 * Created by suhyun on 2017. 1. 24..
 */
$(function () {
    $('.network-option-opener').click(function () {
        var target = $('#config');

        if (!target.hasClass('open')) {
            target.addClass('open');
            $('.glyphicon').removeClass('glyphicon-plus');
            $('.glyphicon').addClass('glyphicon-minus');
        } else {
            target.removeClass('open');
            $('.glyphicon').removeClass('glyphicon-minus');
            $('.glyphicon').addClass('glyphicon-plus');
        }

    });

});


function drawNetwork01(question, color) {
    $('.graph-bg').removeClass('open');
    $('.network-bg').addClass('open');
    $('.question').addClass('cloudAndBar');
    $('.question').html(question.key);


    // create an array with edges
    var edges = new vis.DataSet([
        {from: '드라마', to: 'TV프로그램'},
        {from: '예능', to: 'TV프로그램'},
        {from: '시사', to: 'TV프로그램'},
        {from: '드라마', to: 1},
        {from: '드라마', to: 2},
        {from: '드라마', to: 3},
        {from: '드라마', to: 4},
        {from: '예능', to: 6},
        {from: '예능', to: 7},
        {from: '예능', to: 8},
        {from: '예능', to: 9},
        {from: '시사', to: 11},
        {from: '시사', to: 12},
    ]);
    var nodes = new vis.DataSet([
        {id: 'TV프로그램', label: 'TV프로그램', color: color[0], font: {color: 'inherit', face: 'Hanna'}, value: 29},

        {id: '드라마', label: '드리마', color: color[1], font: {color: 'inherit', face: 'Hanna'}, value: 10},
        {id: 1, label: '도깨비', color: color[1], font: {color: 'inherit', face: 'Hanna'}, value: 1},
        {id: 2, label: '역도요정김복주', color: color[1], font: {color: 'inherit', face: 'Hanna'}, value: 2},
        {id: 3, label: '푸른바다의전설', color: color[1], font: {color: 'inherit', face: 'Hanna'}, value: 3},
        {id: 4, label: '낭만닥터김사부', color: color[1], font: {color: 'inherit', face: 'Hanna'}, value: 4},

        {id: '예능', label: '예능', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 12},
        {id: 6, label: '아는형님', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 2},
        {id: 7, label: '무한도전', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 3},
        {id: 8, label: '우리결혼했어요', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 3},
        {id: 9, label: '미운우리새끼', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 4},

        {id: '시사', label: '시사', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 7},
        {id: 11, label: '썰전', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 3},
        {id: 12, label: '그것이알고싶다', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 4},
    ]);

    var da = {
        nodes: nodes,
        edges: edges
    };

    // create a network
    var container = document.getElementById('mynetwork');

    var options = {
        nodes: {
            shape: 'dot',
            scaling: {
                label: {
                    min: 8,
                    max: 20,
                }
            }
        },
        physics: {
            stabilization: false
        },
        configure: {
            filter: function (o, path) {
                if (path.indexOf('physics') !== -1) {
                    return true;
                }
                if (path.indexOf('smooth') !== -1 || o === 'smooth') {
                    return true;
                }
                return false;
            },
            container: document.getElementById('config')
        }
    };

    new vis.Network(container, da, options);

}

/**
 * Created by Luan on 15. 6. 3..
 */
var lda = require('lda');

exports.topics = function(text, topic_count, category_count){
    try {
        text = text.replace(/\n/gi, '');
        text = text.replace(/\r/gi, '');
        var document = text.match(/[^\.!\?]+[\.!\?]+/g);
        var result = lda(document, topic_count, category_count);
        return result;

    } catch (e){
        return null;
    }


}


$(function () {
    $('div.alert').hide();
    var showInfo = function (message) {
        console.log('??')
        $('div.progress').hide();
        $('strong.message').text(message);
        $('div.alert').show();
    };
    $('input[type="submit"]').on('click', function (evt) {
        evt.preventDefault();
        $('div.progress').show();
        var formData = new FormData();
        var file = document.getElementById('myFile').files[0];
        if(file === undefined || file === ''){
            console.log("empty");
            //return;
        }
        formData.append('myFile', file);
        formData.append('body','csv')


        var xhr = new XMLHttpRequest();

        var email = document.getElementById('input_email').value;
        var title = document.getElementById('input_title').value;

        xhr.open('post', '/uploadFile?type=csv&email=' + email + '&title=' + title, true);
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                var percentage = (e.loaded / e.total) * 100;
                $('div.progress div.bar').css('width', percentage + '%');
                console.log(percentage);
            }
        };

        xhr.onerror = function (e) {
            showInfo('An error occurred while submitting the form. Maybe your file is too big');
        };

        xhr.onload = function () {
            showInfo(this.statusText);
        };

        xhr.send(formData );
        console.log(formData);

    });

});

$(document).on('change', '.btn-file :file', function () {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

$(document).ready(function () {
    $('.btn-file :file').on('fileselect', function (event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }

    });
});
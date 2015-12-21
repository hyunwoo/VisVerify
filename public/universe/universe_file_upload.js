$(function () {
    $('div.alert').hide();
    var showInfo = function (message) {
        console.log(message)
    };


    $('input[type="submit"]').on('click', function (evt) {
        evt.preventDefault();
        $('div.progress').show();
        var formData = new FormData();
        var file = document.getElementById('myFile').files[0];

        var email = document.getElementById('input_email').innerHTML;
        var title = document.getElementById('input_title').value;

        console.log(email, title, file)


        if (file === undefined || file === '') {
            message('THERE IS NO FILE SELECTED')
            return;
        }
        if (file.name.indexOf('.csv') == -1) {
            message('FILE FORMAT IS NOT CSV<br>current version UNIVERSE is support only csv file.')
            return;
        }
        if (email == '') {
            message('E-mail has not been entered.')
            return;
        } else if (title == '') {
            message('Data Title has not been entered.')
            return;
        }
        formData.append('myFile', file);
        formData.append('body', 'csv')

        var xhr = new XMLHttpRequest();


        xhr.open('post', '/uploadFile?type=csv&email=' + email + '&title=' + title, true);
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                var percentage = (e.loaded / e.total) * 100;
                percentage = Math.floor(percentage);
                //$('div.progress div.bar').css('width', percentage + '%');
                document.getElementById('progress_bar').style.width = percentage + '%';
                console.log(percentage);

                document.getElementById('progress_text').style.visibility = 'visible';
                document.getElementById('progress_number').style.visibility = 'visible';
                document.getElementById('progress_number').innerHTML = percentage + '%';
            }
        };

        xhr.onerror = function (e) {
            console.log(e);
            message('An error occurred while submitting the form. Maybe your file is too big');
        };

        xhr.onload = function () {
            if(this.statusText === 'OK'){
                message('FILE UPLOAD SUCCESS', '#0AC')
                document.getElementById('btn-success').style.visibility = 'visible';

                document.getElementById("parent_upload").style.animation = "disappear_window 1s normal forwards ease-in-out ";
                document.getElementById("parent_success").style.animation = "appear_window 1s normal forwards ease-in-out ";
            }
        };

        xhr.send(formData);
        console.log(formData);

    });

});

function message(msg, color) {
    if (color === undefined) color = '#D00';
    document.getElementById('message').style.visibility = 'visible';
    document.getElementById('message').innerHTML = msg;
    document.getElementById('message').style.color = color;
}
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
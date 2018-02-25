/**
 * Created by krpet on 30.7.2016.
 */

$(document).ready(function () {
    var step1 = $('#step1');
    var step2 = $('#step2');
    var step3 = $('#step3');

    step2.hide();
    step3.hide();

    $('#buttonNext1').click(function () {
        step1.hide();
        step2.show();

        $('#patientInfo').removeClass('panel-primary').addClass('panel-success');
        $('#symptomA').removeClass('panel-info').addClass('panel-primary');
    });

    $('#buttonPrev2').click(function () {
        step2.hide();
        step1.show();

        $('#symptomA').removeClass('panel-primary').addClass('panel-info');
        $('#patientInfo').removeClass('panel-success').addClass('panel-primary');
    });

    $('#buttonNext2').click(function () {
        step2.hide();
        step3.show();

        $('#symptomA').removeClass('panel-primary').addClass('panel-success');
        $('#painA').removeClass('panel-info').addClass('panel-primary');
    });

    $('#buttonPrev3').click(function () {
        step3.hide();
        step2.show();

        $('#painA').removeClass('panel-primary').addClass('panel-info');
        $('#symptomA').removeClass('panel-success').addClass('panel-primary');
    });

    $('#buttonNext3').click(function () {
        step3.hide();
        step1.show();

        $('#painA').removeClass('panel-primary').addClass('panel-info');
        $('#symptomA').removeClass('panel-success').addClass('panel-info');
        $('#patientInfo').removeClass('panel-success').addClass('panel-primary');

        alert('The report has been submitted.');
    });


    /*Stefan KOD POCETOK*/

    $('#selB').change(function () {
        var value = parseInt($('#selB').val());

        if(value==0){document.getElementById('main').src = "images/body.jpg";}

        if(value==1){document.getElementById('main').src = "images/RLbody.jpg";}

        if(value==2){document.getElementById('main').src = "images/LLbody.jpg";}

        if(value==3){document.getElementById('main').src = "images/Sbody.jpg";}

        if(value==4){document.getElementById('main').src = "images/Stbody.jpg";}

        if(value==5){document.getElementById('main').src = "images/RAbody.jpg";}

        if(value==6){document.getElementById('main').src = "images/LAbody.jpg";}

        if(value==7){document.getElementById('main').src = "images/Cbody.jpg";}


        e.preventDefault();
    });
    /*Stefan KOD KRAJ*/


    /* Ivana KOD */
    $("#datepicker").datepicker();

    $( "#pain" ).on( "change", function() {
        slider3.slider( "value", this.selectedIndex + 1 );
    });
});

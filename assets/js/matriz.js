
var table;

$(document).ready(function() {
    table = $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": "ajax_calls/matriz.ajax"
    } );

    for (var index = 5; index < 12; index++) {
        var column = table.column(index);
                column.visible( ! column.visible() );
    }
   
} );

$('a.toggle-vis').on( 'click', function (e) {
    e.preventDefault();

    var column = table.column( $(this).attr('data-column') );
    switch (value = $(this).attr('data-column')) {
        case "0": 
        {   for (var index = 5; index <= 7; index++) {
                var column = table.column(index);
                column.visible( ! column.visible() );
            }
        }
            break;
            
        case "1": 
            {   for (var index = 8; index <= 10; index++) {
                    var column = table.column(index);
                    column.visible( ! column.visible() );
                }
            }
                break;
    
        default:
            break;
    }

} );

$('a.toggle-vis').hover(function () {
        // over

        $(this).removeClass("text-truncate");
        
    }, function () {
        // out
        $(this).addClass("text-truncate");
    }
);



var TableData = function () {
    //function to initiate DataTable
    //DataTable is a highly flexible tool, based upon the foundations of progressive enhancement, 
    //which will add advanced interaction controls to any HTML table
    //For more information, please visit https://datatables.net/

    (function ($) {
        /*
         * Function: fnGetColumnData
         * Purpose:  Return an array of table values from a particular column.
         * Returns:  array string: 1d data array
         * Inputs:   object:oSettings - dataTable settings object. This is always the last argument past to the function
         *           int:iColumn - the id of the column to extract the data from
         *           bool:bUnique - optional - if set to false duplicated values are not filtered out
         *           bool:bFiltered - optional - if set to false all the table data is used (not only the filtered)
         *           bool:bIgnoreEmpty - optional - if set to false empty values are not filtered from the result array
         * Author:   Benedikt Forchhammer <b.forchhammer /AT\ mind2.de>
         */
        $.fn.dataTableExt.oApi.fnGetColumnData = function (oSettings, iColumn, bUnique, bFiltered, bIgnoreEmpty) {
            // check that we have a column id
            if (typeof iColumn == "undefined") return new Array();

            // by default we only want unique data
            if (typeof bUnique == "undefined") bUnique = true;

            // by default we do want to only look at filtered data
            if (typeof bFiltered == "undefined") bFiltered = true;

            // by default we do not want to include empty values
            if (typeof bIgnoreEmpty == "undefined") bIgnoreEmpty = true;

            // list of rows which we're going to loop through
            var aiRows;

            // use only filtered rows
            if (bFiltered == true) aiRows = oSettings.aiDisplay;
                // use all rows
            else aiRows = oSettings.aiDisplayMaster; // all row numbers

            // set up data array   
            var asResultData = new Array();

            for (var i = 0, c = aiRows.length; i < c; i++) {
                iRow = aiRows[i];
                var aData = this.fnGetData(iRow);
                var sValue = aData[iColumn];

                // ignore empty values?
                if (bIgnoreEmpty == true && sValue.length == 0) continue;

                    // ignore unique values?
                else if (bUnique == true && jQuery.inArray(sValue, asResultData) > -1) continue;

                    // else push the value onto the result data array
                else asResultData.push(sValue);
            }

            return asResultData;
        }
    }(jQuery));


    function fnCreateSelect(aData, headerTex) {

        var r = '<select  style="width:90%" class="form-control search-select"><option value=""><b>' + headerTex + ' (todas)</b> </option><option class="dis" disabled="disabled"><hr/></option>', i, iLen = aData.length;
        for (i = 1 ; i < iLen ; i++) {
            r += '<option value="' + aData[i] + '">' + aData[i] + '</option>';
        }
        return r + '</select>';
    };


    var runDataTable = function () {




        var oTable = $('#sample_1').dataTable({
            "aoColumnDefs": [{
                "aTargets": [0]
            }],
            "oLanguage": {
                "sLengthMenu": "Mostrar _MENU_ Linhas",
                "sSearch": "Pesquisar",
                "oPaginate": {
                    "sPrevious": "Anterior",
                    "sNext": "Proximo"
                }
            },
            "aaSorting": [
                [1, 'asc']
            ],
            "aLengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 10,
        });
        $('#sample_1_wrapper .dataTables_filter input').addClass("form-control input-sm").attr("placeholder", "Pesquisar");
        // modify table search input
        $('#sample_1_wrapper .dataTables_length select').addClass("m-wrap small");
        // modify table per page dropdown
        $('#sample_1_wrapper .dataTables_length select').select2();

        $('#sample_1_wrapper .search-select select').select2({
            placeholder: "Seleciona",
            allowClear: true
        });
        // initialzie select2 dropdown
        $('#sample_1_column_toggler input[type="checkbox"]').change(function () {
            /* Get the DataTables object again - this is not a recreation, just a get of the object */
            var iCol = parseInt($(this).attr("data-column"));
            var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
            oTable.fnSetColumnVis(iCol, (bVis ? false : true));
        });

        $("#sample_1_wrapper thead th").each(function (i) {


            if (!$(this).hasClass("filterDrop")) {
                this.innerHTML = this.innerHTML;
            }
            else {
                this.innerHTML = fnCreateSelect(oTable.fnGetColumnData(i), this.innerHTML);
                $('select', this).change(function () {
                    oTable.fnFilter($(this).val(), i);
                });
            }
        });
    };
    return {
        //main function to initiate template pages
        init: function () {
            runDataTable();
           
        }
    };
}();
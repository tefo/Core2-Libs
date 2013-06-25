function adjustTableHeaderWidth() {
	//$("#table1").width(parseInt($("#table1_data").width()));

	//$_("table1").style.width = "auto";

	var filter_columns_count = 0;
	if ($_("filter_table1")) {
		filter_columns_count = $_("filter_table1").rows[0].cells.length;
	}

	var columns_count = $_("table1").rows[0].cells.length;
	if ($_("table1_data").rows[0]) {
		if (columns_count == $_("table1_data").rows[0].cells.length) {

			var last_filter_column_width = 0;
			for (i = 0; i < columns_count; i++) {
				var data_cell = $_("table1_data").rows[0].cells[i];
				var data_column_width = data_cell.clientWidth;

				$_("table1").rows[0].cells[i].style.width = data_column_width+"px";
				if (i < filter_columns_count-1) {
					$_("filter_table1").rows[0].cells[i].style.width = data_column_width+"px";
				}
				else {
					last_filter_column_width += data_column_width;
				}
			}

			if (filter_columns_count) {
				$_("filter_table1").rows[0].cells[filter_columns_count-1].style.width = last_filter_column_width+"px";
			}

			$_("table1").style.width = $_("table1_data").clientWidth+"px";
			$_("filter_table1").style.width = $_("table1_data").clientWidth+"px";
		}
		else {
			alert("header columns != data columns");
		}
	}
	else {
		$_("table1").style.width = "100%";

		if (filter_columns_count) {

			var last_filter_column_width = 0;
			for (i = 0; i < columns_count; i++) {
				var table1_cell = $_("table1").rows[0].cells[i];
				var table1_column_width = table1_cell.clientWidth;

				if (i < filter_columns_count-1) {
					$_("filter_table1").rows[0].cells[i].style.width = table1_column_width+"px";
				}
				else {
					last_filter_column_width += table1_column_width;
				}
			}

			$_("filter_table1").rows[0].cells[filter_columns_count-1].style.width = last_filter_column_width+"px";
		}
	}

	$("#table1_div").height(jQuery(window).height()-table1_var1);
}

$(document).ready(function(){
	adjustTableHeaderWidth();
});

$(window).resize(function() {
	adjustTableHeaderWidth();
});
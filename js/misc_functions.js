
Array.prototype.inArray = function (value) {
	var i;
	for (i=0; i < this.length; i++) {
		if (this[i] === value) {
			return true;
		}
	}
	return false;
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function getElementsByClass(searchClass, tag) {
	var classElements = new Array();
	if (tag == null) tag = '*';
	var els = document.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className)) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function $_(id) {
	return document.getElementById(id);
}

function getNextSibling(el) {
	r = el.nextSibling;
	while (r.nodeType != 1) {
		r = r.nextSibling;
	}
	return r;
}

function getChildNodes(el) {
	x = el.childNodes;
	r = new Array();
	for (i=0; i < x.length; i++) {
		if (x[i].nodeType == 1) r.push(x[i]);
	}
	return r;
}

function postToUrl(path, params, method) {
    method = method || "post";

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
}

function prepairPrint() {
	var elements = getElementsByClass("no-print", null);
	for (var i=0; i < elements.length; i++) {
		elements[i].style.display = 'none';
	}
	var elements = document.getElementsByTagName("img");
	for (var i=0; i < elements.length; i++) {
		elements[i].style.display = 'none';
	}
}

function getURLParam(strParamName){
	var strReturn = "";
	var strHref = window.location.href;
	if (strHref.indexOf("?") > -1) {
		var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
		var aQueryString = strQueryString.split("&");
		for (var iParam = 0; iParam < aQueryString.length; iParam++) {
			if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1) {
				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				break;
			}
		}
	}
	return unescape(strReturn);
}

function openPopup(address, pageTitle, w, h) {
	newWin = window.open("", pageTitle, 'width='+w+',height='+h+',status=no,scrollbars=no,toolbar=no');
	newWin.location = address;
	newWin.focus();
}

function openImagePopupCentered(url, width, height, window_name, title){
	if(title + "" == "undefined"){
		title = "-";
	}
	win = openCenteredWindow("", window_name, parseInt(width), parseInt(height), 0, 0, "");
	var body = "<html><head><title>"+title+"</title></head><meta http-equiv=\"imagetoolbar\" content=\"no\"><body topmargin=0 leftmargin=0 marginwidth=0 marginheight=0>";
	body += "<table width=\"100%\" height=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"center\" valign=\"center\"><img style=\"\" onclick=\"window.close();\" alt=\"\" src=\""+url+"\"></td></tr></table>";
	body += "</body></html>";

	win.document.write(body);
	win.document.close();
	return false;
}

function removeAllOptions(select_id) {
	var i;
	for (i=$_(select_id).options.length-1; i>=0; i--) {
		$_(select_id).remove(i);
	}
}

function addOption(select_id, text, value) {
	var opt = document.createElement("OPTION");
	opt.text = text;
	opt.value = value;
	$_(select_id).options.add(opt);
}

function addOptionSelected(select_id, text, value) {
	var opt = document.createElement("OPTION");
	opt.text = text;
	opt.value = value;
	opt.selected = true;
	$_(select_id).options.add(opt);
}

function removeChilds(cell_id) {
	var cell = document.getElementById(cell_id);
	if (cell.hasChildNodes()) {
		while (cell.childNodes.length >= 1) {
			cell.removeChild(cell.firstChild);
		}
	}
}

function addLi(ul_id, text) {
	var ul = document.getElementById(ul_id);
	var li = document.createElement("LI");
	li.innerHTML = text;
	ul.appendChild(li);
}

function clearZero(str) {
	if (str.charAt(0) == "0") return str.substr(1);
	else return str;
}

function checkField(field) {
	var classes = field.className.split(" ");
	if (classes.inArray("isempty")) {
		if (field.value == null || trim(field.value) == "") {
			error_object = null;
			if (field.title) error_object = $_(field.title);
			if (error_object) {
				error_object.style.backgroundColor = "#ff9050";
			}
			else field.style.backgroundColor = "#ff9050";
			return ERROR_EMPTY;
		}
		else {
			error_object = null;
			if (field.title) error_object = $_(field.title);
			if (error_object) {
				error_object.style.backgroundColor = "#fff";
			}
			else field.style.backgroundColor = "#fff";
		}
	}
	if (classes.inArray("isnumber")) {
		var filter = /[^0-9]/;
		if (filter.test(field.value)) {
			field.style.backgroundColor = "#ff9050";
			return ERROR_NUMBER;
		}
		else {
			field.style.backgroundColor = "#fff";
		}
	}
	if (classes.inArray("isphone")) {
		var filter = /[^0-9]\53/;
		if (filter.test(field.value)) {
			field.style.backgroundColor = "#ff9050";
			return ERROR_PHONE;
		}
		else {
			field.style.backgroundColor = "#fff";
		}
	}
	if (classes.inArray("ispricex")) {
		var filter = /[^0-9\54\56\77]/;
		if (filter.test(field.value)) {
			field.style.backgroundColor = "#ff9050";
			return ERROR_PRICEX;
		}
		else {
			field.style.backgroundColor = "#fff";
		}
	}
	if (classes.inArray("isemail")) {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(field.value)) {
			field.style.backgroundColor = "#ff9050";
			return ERROR_EMAIL;
		}
		else {
			field.style.backgroundColor = "#fff";
		}
	}
	if (classes.inArray("ismultiemail")) {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		emails = field.value.split(";");
		for (jj=0; jj < emails.length; jj++) {
			if (!filter.test(emails[jj])) {
				return ERROR_EMAIL+" => "+emails[jj];
			}
		}
	}
	if (classes.inArray("usernamelength")) {
		if (parseInt(field.value.length) < 5) {
			field.style.backgroundColor = "#ff9050";
			return ERROR_USERNAMELENGTH;
		}
		else {
			field.style.backgroundColor = "#fff";
		}
	}
	if (classes.inArray("passwordlength")) {
		if (parseInt(field.value.length) < 5) {
			field.style.backgroundColor = "#ff9050";
			return ERROR_PASSWORDLENGTH;
		}
		else {
			field.style.backgroundColor = "#fff";
		}
	}
	if (classes.inArray("confirm")) {
		if (field.value != $_(field.title).value) {
			field.style.backgroundColor = "#ff9050";
			return ERROR_CONFIRM;
		}
		else {
			field.style.backgroundColor = "#fff";
		}
	}
	return null;
}

function isEmptyGroup(inputs, type, group) {
	var isemptygroup = 0;
	for (i=0; i < inputs.length; i++) {
		if (inputs[i].type == type) {
			var classes = inputs[i].className.split(" ");
			if (classes.inArray("isemptygroup"+group)) {
				isemptygroup++;
			}
		}
	}
	var isemptygroup_errors = 0;
	for (i=0; i < inputs.length; i++) {
		if (inputs[i].type == type) {
			var classes = inputs[i].className.split(" ");
			if (classes.inArray("isemptygroup"+group)) {
				if (!inputs[i].checked) {
					isemptygroup_errors++;
				}
			}
		}
	}
	if (isemptygroup != 0 && isemptygroup == isemptygroup_errors) {
		error_object = $_("error_isemptygroup"+group);
		if (error_object) error_object.style.backgroundColor = "#ff9050";
		return ERROR_EMPTY;
	}
	else {
		error_object = $_("error_isemptygroup"+group);
		if (error_object) error_object.style.backgroundColor = "#fff";
	}

	return null;
}

function isEmptyMixedGroup(inputs) {
	var isemptygroup = 0;
	for (i=0; i < inputs.length; i++) {
		var classes = inputs[i].className.split(" ");
		if (classes.inArray("isemptymixedgroup")) {
			isemptygroup++;
		}
	}
	var isemptygroup_errors = 0;
	for (i=0; i < inputs.length; i++) {
		var classes = inputs[i].className.split(" ");
		if (classes.inArray("isemptymixedgroup")) {
			if (!inputs[i].checked) {
				isemptygroup_errors++;
			}
		}
	}
	if (isemptygroup != 0 && isemptygroup == isemptygroup_errors) {
		error_object = $_("error_isemptymixedgroup");
		if (error_object) error_object.style.backgroundColor = "#ff9050";
		return ERROR_EMPTY;
	}
	else {
		error_object = $_("error_isemptymixedgroup");
		if (error_object) error_object.style.backgroundColor = "#fff";
	}

	return null;
}

function checkForm(form) {
	var error = null;

	var inputs = form.getElementsByTagName("input");
	var textareas = form.getElementsByTagName("textarea");
	var selects = form.getElementsByTagName("select");

	for (i=0; i < inputs.length; i++) {
		if (isVisible(inputs[i]) || inputs[i].type == "hidden") {
			error = checkField(inputs[i]);
		}
		if (error) break;
	}

	if (!error) {
		for (i=0; i < textareas.length; i++) {
			if (isVisible(textareas[i]) || textareas[i].type == "hidden") {
				error = checkField(textareas[i]);
			}
			if (error) break;
		}
	}

	if (!error) {
		for (i=0; i < selects.length; i++) {
			if (isVisible(selects[i]) || selects[i].type == "hidden") {
				error = checkField(selects[i]);
			}
			if (error) break;
		}
	}

	if (!error) {
		error = isEmptyGroup(inputs, "checkbox", "");
	}

	if (!error) {
		error = isEmptyGroup(inputs, "radio", "_radio");
	}

	if (!error) {
		error = isEmptyMixedGroup(inputs);
	}

	if (error) {
		alert(error);
	}
	else form.submit();
}

function isVisible(obj)
{
    if (obj == document) return true

    if (!obj) return false
    if (!obj.parentNode) return false
    if (obj.style) {
        if (obj.style.display == 'none') return false
        if (obj.style.visibility == 'hidden') return false
    }

    //Try the computed style in a standard way
    if (window.getComputedStyle) {
        var style = window.getComputedStyle(obj, "")
        if (style.display == 'none') return false
        if (style.visibility == 'hidden') return false
    }

    //Or get the computed style using IE's silly proprietary way
    var style = obj.currentStyle
    if (style) {
        if (style['display'] == 'none') return false
        if (style['visibility'] == 'hidden') return false
    }

    return isVisible(obj.parentNode)
}

function submitEnter(form, e) {
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;

	if (keycode == 13) {
		checkForm(form);
		return false;
	}
	else return true;
}

function markAll(form, checked) {
	var inputs = form.getElementsByTagName("input");

	for (i=0; i < inputs.length; i++) {
		if (inputs[i].type == "checkbox") {
			inputs[i].checked = checked;
		}
	}
}

function order(form, field, direction) {
	form.orderby.value = field;
	form.ordertype.value = direction;
	form.submit();
}


function postToPage(controller, act, id, redirect, confirmation) {
	if (confirm(confirmation)) {
		postToUrl('', {'controller': controller, 'act': act, 'id': id, 'redirect': redirect})
	}
}

function postToController(controller, act, id, redirect, confirmation) {
	if (confirmation) {
		if (confirm(confirmation)) {
			postToUrl('', {'controller': controller, 'act': act, 'id': id, 'redirect': redirect})
		}
	}
	else postToUrl('', {'controller': controller, 'act': act, 'id': id, 'redirect': redirect})
}

function showTab(tab) {
	var tabs = getElementsByClass("js_tab", null);

	for (var i=0; i < tabs.length; i++) {
		var classes = tabs[i].className.split(" ");
		if (classes.inArray("js_nr"+tab)) {
			tabs[i].style.display = "block";
		}
		else {
			tabs[i].style.display = "none";
		}
	}

	var tab_btns = getElementsByClass("js_tab_btn", null);
	for (var i=0; i < tab_btns.length; i++) {
		var classes = tab_btns[i].className.split(" ");
		if (classes.inArray("js_nr"+tab)) {
			tab_btns[i].className = "";
			for (var j=0; j < classes.length; j++) {
				if (classes[j] == "tab2_left") {tab_btns[i].className += "tab1_left";}
				else if (classes[j] == "tab2_middle") {tab_btns[i].className += "tab1_middle";}
				else if (classes[j] == "tab2_right") {tab_btns[i].className += "tab1_right";}
				else {
					tab_btns[i].className += " "+classes[j];
				}
			}
		}
		else {
			tab_btns[i].className = "";
			for (var j=0; j < classes.length; j++) {
				if (classes[j] == "tab1_left") {tab_btns[i].className += "tab2_left";}
				else if (classes[j] == "tab1_middle") {tab_btns[i].className += "tab2_middle";}
				else if (classes[j] == "tab1_right") {tab_btns[i].className += "tab2_right";}
				else {
					tab_btns[i].className += " "+classes[j];
				}
			}
		}
	}
}

function showHide(id) {
	if ($_(id).style.display == "none") {
		$_(id).style.display = "block";
	}
	else {
		$_(id).style.display = "none";
	}
}

function disableSelection(target) {
	if (typeof target.onselectstart != "undefined") //IE route
		target.onselectstart = function(){return false}
	else if (typeof target.style.MozUserSelect != "undefined") //Firefox route
		target.style.MozUserSelect="none"
	else //All other route (ie: Opera)
		target.onmousedown = function(){return false}
	target.style.cursor = "default"
}

function isCheckedIds(form) {
	var counter = 0;
	var inputs = form.getElementsByTagName("input");
	for (i=0; i < inputs.length; i++) {
		if (inputs[i].type == "checkbox" && inputs[i].checked) {
			counter++;
		}
	}

	if (counter > 0){
		form.submit();
	}
	else {
		alert('Please select items!');
	}
}

function getFormElements(form) {
	var result = new Array();
	if (form.elements) {
		for(var i in form.elements) {
			result[form.elements[i].name] = form.elements[i].value;
		}
	}
	return result;
}
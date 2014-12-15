
var Cookies = {};

Cookies.get = function(name, defaultValue) {
	var cookies = document.cookie.split('; ');
	var i = cookies.length, cookie, value = null;
	while (i--) {
		cookie = cookies[i].split('=');
		if (cookie[0] === name) {
			value = unescape(cookie[1]);
		}
	}
	return value || defaultValue;
};

Cookies.set = function(name, value, expiredays) {
	var exdate = new Date();
	if (!expiredays)
		expiredays = 360;
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = name + '=' + escape(value)
			+ ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};

Cookies.remove = function(name) {
	Cookies.set(name, null, -1);
};

String.prototype.endWith = function(str) {
	if (str == null || str == '' || this.length == 0 || str.length > this.length)
		return false;
	if (this.substring(this.length - str.length) == str)
		return true;
	else
		return false;
};

String.format = function(src) {
	if (arguments.length == 0)
		return null;
	var args = Array.prototype.slice.call(arguments, 1);
	return src.replace(/\{(\d+)\}/g, function(m, i) {
				return args[i];
			});
};

// 根据字段类型取得该字段显示的颜色，一目了然
function getTypeClass(fieldType) {
	return fieldType == 'Date' ? 'datecolor' : (fieldType == 'Boolean'
			? 'booleancolor'
			: (fieldType == 'Double' || fieldType == 'Integer'
					|| fieldType == 'Float' || fieldType == 'Percent'
					? 'numbercolor'
					: null))
}


// 给grid 中选中的筛选条件的记录的筛选部分换一下颜色
function filterTextSetBk(store, text) {
	if (!store)
		return text;
	var s = store;
	if (store.store)
		s = store.store;
	if (s.filters.items.length > 0)
		return text.replace(new RegExp(s.filters.items[0].value, 'gm'),
				'<span class="filtertext">' + s.filters.items[0].value + '</span>');
	else
		return text;
};



// 根据tree 取得 综合查询的分组和字段的数组信息
function getGroupAndFieldsWithTree(tree) {
	var result = [];
	var groupOrder = 10;
	tree.getRootNode().eachChild(function(groupnode) {
				if (groupnode.hasChildNodes()) {
					var group = {
						groupTitle : groupnode.raw.title,
						groupOrder : groupOrder,
						fields : []
					};
					groupOrder += 10;
					groupnode.eachChild(function(field) {
								group.fields.push({
											fieldId : field.raw.value,
											moduleName : field.raw.moduleName,
											fieldTitle : field.raw.title,
											condition : field.raw.condition,
											aggregate : field.raw.aggregate,
											fieldType : field.raw.fieldType
										})
							})
					result.push(group);
				}
			});
	return result;
}

function Base64() {
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	this.encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2)
					+ _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
	this.decode = function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}

	_utf8_encode = function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	}
	_utf8_decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6)
						| (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}
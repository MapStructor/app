function getInfoText(modal_header_text, modal_content_html) {
	$.ajax({
		url: 'https://encyclopedia.nahc-mapping.org/info-text-export',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		type: 'get',
		dataType: 'json',
		data: {}
	}).done(function (data) {
		if (data.length > 0) {
			for (let i = 0; i < data.length; i++) {
				if (data[i].id.length > 0) {
					modal_header_text[data[i].id] = data[i].title.replace(/&amp;/g, '&');
					modal_content_html[data[i].id] = data[i].body;
				}
			}
		}
	}).fail(function (xhr, textStatus) {
		console.warn("jQuery AJAX request  ERROR !!!");
		console.log(xhr.responseText);
		console.log(textStatus);
	});
}
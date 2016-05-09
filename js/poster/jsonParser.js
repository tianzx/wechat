		poster.sortedValue = _.groupBy(poster.sourceValue, 'section');
		_.each(poster.sortedValue, function(value, key) {
			var outerlength = value.length;
			var innerIndex = 0;
			var div = "";
			++poster.counter;
			_.each(value, function(section_value, s_key) {
				++innerIndex;
				div += parseDataArray(section_value,poster.counter-1,innerIndex-1);
				if (innerIndex == outerlength) {
					poster.divArray.push(div);/* complete div */
				}
			})
		})
		function parseDataArray(data,line,row,maxlength) {
			var _data = {
						"line":line,
						"row":row,
					}
			var template_div_input = "#template_div_" + data.type;
			var template_div = $(template_div_input).html();
			return renderTpl(template_div,_data);
		}
		function returnDataArray(data) {
			var returnValue = [];
			_.each(data,function(value) {
				_.each(value,function(section_value) {
					 returnValue.push(section_value);
				})
			})
			return  returnValue;
		}
		function renderTpl(template,_data){
			var _template_div_section = _.template(template);
			var template_div_section = _template_div_section(
				{_data}
			);
			return template_div_section
		}
//just a quick example, in no way pretty code.
 
//if we load the page and there's a query specified (from the header search input), execute that query immediately


  $(document).ready(function() {
	q = getParameterByName("q");
   	if($('#search').length) {
		if (q!=""){
			$('input#page-query').val(q);
			search($('input#page-query').val());
		}
	
	  	$('form#search').submit(function() {
			$('.bar-indicator').show();
        	search($('input#page-query').val());
      		return false;
		});
	} 
  });

  function search(query) {
    var result = $.getJSON('http://buzebe.api.indexden.com/v1/indexes/docs/search?q=' + encodeURIComponent(query) + '&fetch=title&snippet=text&len=500&callback=?', function(data) {
        $('div#results').empty();
		
		if(data.matches == 0) {
			$('div#results').append('<h2>No Results Found for ' + query + '</h2>');
		} else {
			$('div#results').append('<h2>Search Results <span class="badge">' + data.matches + '</span></h2><hr/>');
		}
		
		$('.bar-indicator').hide();
		
    	$.each(data.results, function(index, result) {
        $('div#results').append('<div class="result">\
      			<p><a class="title" href="' + $('#root').val() + result.docid + '">' + result.title + '</a><br/>\
				<a href="' + $('#root').val() + result.docid + '"\><small>' + $('#root').val() + result.docid + '</small></a><br/>\
      			' + result.snippet_text + '</p>\
    		<br/></div>')
    	});
    });
  }

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
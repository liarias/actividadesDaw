(function(){
	$("#buscar").onClick=busqueda;
	$("#texto").on("keyup",busqueda);
	function onSuccess(data){
		console.log(data)
	}

	$.ajax({
		type: "GET",
		url: "data/citas.xml",
		contentType: "text/xml",
		dataType: "xml",
		success: onSuccess,
	})
})();



function busqueda(){
	var texto=document.getElementById("texto").value;
	var elementos = document.querySelectorAll('div[id^="quote"]')
	if(texto.length!=0){
		for (elemento of elementos) {
			var valido=elemento.textContent.search(texto);
			if (valido>0){
				elemento.classList.remove("ocultar")
				elemento.classList.add("mostrar")
			}
			else{
				elemento.classList.remove("mostrar")
				elemento.classList.add("ocultar")
			}
		}
	}
	else{
		for (elemento of elementos) {
			elemento.classList.remove("ocultar")
			elemento.classList.add("mostrar")
		}
	}

	
}
$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "data/citas.xml",
    dataType: "xml",
    success: function(xml){
    var i=0;
    $(xml).find('cita').each(function(){
    	i++;
      var sAutor = $(this).find('autor').text();
      var sText = $(this).find('texto').text();
      $("<div id='quote"+i+"' class='well' autor='"+sAutor+"'>"+"</div>").html(sText).appendTo("#quotes");
    });
  },
  error: function() {
    alert("An error occurred while processing XML file.");
  }
  });
});

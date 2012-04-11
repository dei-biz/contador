/*Plugin que convierte un input en un control con aumentar y disminuir valor*/
(function( $ ) {
	$.fn.contador = function() {
    	//Recibo un array de objetos jquery:
		return this.each(function(){
			var nodo = $(this);
			//Sólo lo aplicamos a inputs que no tengan data-contador
			if ((this.tagName === 'INPUT') && (!nodo.data('contador'))){
				var config = $.extend({
					minimo:0,
			  		maximo:10,
			  		intervalo:1,
			  		unidades:''
				}, nodo.data());
				//Ocultamos el input antes de nada:
				nodo.hide();
				//Lo envolvemos en un div:
				nodo.wrap('<div class="controles_medida" />');
				var padre = nodo.parent();
				//Sustituimos el input por un div con la info
				var $etiqueta = $('<div class="valor_medida etiqueta">'+nodo.val()+' '+config.unidades+'</div>').appendTo(padre);
				//Botón menos
				$('<button class="reducir_valor_medida" type="button">-</button>').click(function(){
					var nuevovalor = parseInt(nodo.val())-config.intervalo;
					if (nuevovalor<config.minimo){nuevovalor = config.minimo;}
					nodo.val(nuevovalor);
					$etiqueta.html(nuevovalor+' '+config.unidades);
				}).prependTo(padre);
				
				//Botón más
				$('<button class="aumentar_valor_medida" type="button">+</button>').click(function(){
					var nuevovalor = parseInt(nodo.val())+config.intervalo;
					if (nuevovalor>config.maximo){nuevovalor = config.maximo;}
					nodo.val(nuevovalor);
					$etiqueta.html(nuevovalor+' '+config.unidades);
				}).appendTo(padre);
				//Activamos el flag para no ponérselo más
				nodo.data('contador', true);
			}
		});
    }
})( jQuery );
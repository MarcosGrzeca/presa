Persistencia = (function($) {
    function save(chave, valor) {
		localStorage.setItem(chave, valor);
    }

    function get(chave) {
    	try {
    		return localStorage.getItem(chave);
    	} catch (e) {
    	}
    	return null;
    }

    function remove(chave) {
    	try {
    		localStorage.removeItem(chave);
    	} catch (e) {}
    }

    function clear() {
    	localStorage.clear();
    }
    
    return {
        'save': save,
        'get': get,
        'remove' : remove,
        'clear': clear
    };
})();
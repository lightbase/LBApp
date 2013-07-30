Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);

// Null out built in convert functions for performance *because the raw data is known to be valid*

// Specifying defaultValue as undefined will also save code. *As long as there will always be values in the data, or the app tolerates undefined field values*
Ext.define('Pessoas', {
    extend: 'Ext.data.Model',
    fields: [
	   {name:'chave'},
       {name: 'nome', type: 'string', convert: null, defaultValue: undefined},
       {name: 'sobrenome',  type: 'string', convert: null,     defaultValue: undefined},
       {name: 'empresa',    type: 'string', convert: null,     defaultValue: undefined}
    ],
    idProperty: 'chave'
});
	

	/*Ext.tip.QuickTipManager.init({
		autoRender: true,
		});

	// Apply a set of config properties to the singleton

	Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
    		maxWidth: 200,
    		minWidth: 100,
    		showDelay: 50      // Show 50ms after entering target
							});*/


    // setup the state provider, all state information will be saved to a cookie
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    function change(val) {
        return '<span style="color:green;">' + val + '</span>';
        return val;
    }

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    function pctChange(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }

    // create the data store
    var store = Ext.create('Ext.data.Store', {
        model: 'Pessoas',
		proxy: {
			type: 'ajax',
			url: 'static/cartoon.xml',
			reader: {
				type: 'xml',
				root: 'pessoas',
				record: 'pessoa'
			}
		},
		autoLoad: true
    });

    // create the Grid
    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        stateful: true,
        collapsible: true,
        multiSelect: true,
        stateId: 'stateGrid',
        columns: [
            {
		id: 'chave',
                text     : 'Chave',
                sortable : false,
                dataIndex: 'chave'
            },
            {
		id: 'nome',
                text     : 'Nome',
                width    : 75,
                sortable : true,
		renderer : change,
                dataIndex: 'nome'
            },
            {
		id: 'sobrenome',
                text     : 'Sobrenome',
                width    : 75,
                sortable : true,
                dataIndex: 'sobrenome'
            },
            {
		id: 'empresa',
                text     : 'Empresa',
                width    : 75,
                sortable : true,
		renderer : change,
                dataIndex: 'empresa'
            }],
	id: '1',
        height: 350,
        width: 600,
        title: 'Minha primeira tabela',
        renderTo: 'page-content',
        viewConfig: {
            stripeRows: true,
            enableTextSelection: false
        }
    });

	var tip = Ext.create('Ext.tip.ToolTip', {
   	 target: 'chave',
   	 html: 'Clique para inverter a ordem das chaves',
	 dismissDelay: 10000
			});
	var tip = Ext.create('Ext.tip.ToolTip', {
         target: 'nome',
         html: 'clique para inverter a ordem dos nomes',
         dismissDelay: 10000
                        });

	var tip = Ext.create('Ext.tip.ToolTip', {
         target: 'sobrenome',
         html: 'clique para inverter a ordem dos sobrenomes',
         dismissDelay: 10000
                        });

	var tip = Ext.create('Ext.tip.ToolTip', {
         target: 'empresa',
         html: 'clique para inverter a ordem das empresas',
         dismissDelay: 10000
                        });


// Manually register a quick tip for a specific element
/*Ext.tip.QuickTipManager.register({
    target: 'chave',
    title: 'My Tooltip',
    text: 'This tooltip was added in code',
    width: 5000,
    dismissDelay: 2000 // Hide after 10 seconds hover
});*/

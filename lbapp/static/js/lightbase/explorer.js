
function WidgetContainer(id){
    this.id = id + '-container';
    var container = document.createElement('div');
    container.setAttribute('class', 'widget-container-span ui-sortable')
    this.html = container;
}

function WidgetBox(id){
    this.id = id + '-box';
    var box = document.createElement('div');
    box.setAttribute('class', 'widget-box collapsed')
    this.html = box;
}

function WidgetHeader(id, text){
    this.id = id + '-header';
    this.text = text;

    var head = document.createElement('div'),
        header = document.createElement('h6');
    head.setAttribute('class', 'widget-header widget-header-small header-color-orange')
    $(header).text(text);

    this.header = header;
    this.html = head;
}

function WidgetToolbar(id){
    this.id = id + '-toolbar';
    var toolbar = document.createElement('div');
    toolbar.setAttribute('class', 'widget-toolbar')
    this.html = toolbar;
}

function NavTabs(id){
    this.id = id + '-navtabs';
    var navtabs = document.createElement('ul');
    navtabs.setAttribute('class', 'nav nav-tabs')
    this.html = navtabs;
}

function Tab(id, href, text, active){
    this.id = id + '-tab';
    var tab = document.createElement('li'), 
        anchor = document.createElement('a');
    if (active == true)
        tab.setAttribute('class', 'active');
    anchor.setAttribute('datat-toogle', 'tab');
    anchor.setAttribute('href', href);
    $(anchor).text(text);
    tab.appendChild(anchor)
    this.html = tab;
}

function CollapseLink(id){
    this.id = id + '-collapse';
    var link = document.createElement('a'),
        icon = document.createElement('i');
    link.setAttribute('href', '#');
    link.setAttribute('data-action', 'collapse');
    icon.setAttribute('class', 'icon-chevron-down');
    link.appendChild(icon);
    this.html = link;
}

function WidgetBody(id){
    this.id = id + '-widget-body';
    var body = document.createElement('div');
    body.setAttribute('class', 'widget-body');
    this.html = body;
}

function WidgetMain(id){
    this.id = id + '-widget-main';
    var main = document.createElement('div');
    main.setAttribute('class', 'widget-main');
    this.html = body;
}

function TabContent(id){
    this.id = id + '-tab-content';
    var tab_content = document.createElement('div');
    main.setAttribute('class', 'tab-content');
    this.html = body;
}

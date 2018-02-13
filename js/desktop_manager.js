var DesktopManager = {
    init: () => {
        Desktop.init();
        Taskbar.init();
        Apps.StartMenu.init();
        Apps.Cortana.init();
        $(window).resize(function() {
            DesktopManager.resizeActiveWindows();
            Apps.StartMenu.getSize();
            Apps.Cortana.getSize();
        });
//        $('#desktop-shortcuts').selectable({
//            start: function() {
//                Apps.StartMenu.close();
//                Apps.Cortana.close();
//            }
//            
//        });
    },
    
    getWindowDimensions: (app, maxWidth, maxHeight) => {
        app.options.width = window.innerWidth < maxWidth ? window.innerWidth :  maxWidth;
        app.options.height = window.innerHeight - 50 < maxHeight ? window.innerHeight - 50 : maxHeight;
        $(`#${app.options.id}`).css({'width': app.options.width, 'height': app.options.height});
    },
    
    resizeActiveWindows: () => {
        $.each(TaskManager.activeApps, function(index, contents) {
            var id = contents.id;
            var app = Apps[contents.app.options.title];
            DesktopManager.getWindowDimensions(app, app.options.width, app.options.height);
        });
    },
}

var SnappingGuide = {
    showMax: () => {
        $('#snapping-guide').addClass('snap-max');
    },
    
    showLeft: () => {
        $('#snapping-guide').addClass('snap-left');
    },
    
    showRight: () => {
        $('#snapping-guide').addClass('snap-right');
    },
    
    hide: () => {
        if ($('#snapping-guide').hasClass('snap-max')) {
            $('#snapping-guide').addClass('snap-closing');
        }
        window.setTimeout(function() {
            $('#snapping-guide').removeClass('snap-max');
            $('#snapping-guide').removeClass('snap-closing');
        }, 130);
    }
}
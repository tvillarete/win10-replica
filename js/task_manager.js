var TaskManager = {
    duration: 190,
    activeApps: [],
    
    init: (app, element) => {
        var options = app.options;
        var windowId = options.id;
        var windowEl = $(`#${windowId}`);
        var taskbarButton = $(`#${windowId}-tb`);
        
        windowEl.removeClass('app-closed');  
        if (!windowEl.length) {
            $('#desktop').append(element);
            taskbarButton.addClass('tb-active');
            TaskManager.activeApps.push({
                id: options.id, 
                app: app,
            });
        } else if (windowEl.hasClass('minimizing')) {
            TaskManager.deMinimize(windowId);
        } else {
            TaskManager.minimize(windowId);
        }
    },
    
    close: id => {
        var app = $(`#${id}`);
        var taskbarButton = $(`#${id}-tb`);
        
        app.addClass('closing');
        window.setTimeout(function() {
            taskbarButton.removeClass('tb-active');
            app.remove(); 
            TaskManager.removeFromActiveApps(id);
        }, TaskManager.duration);
    },
    
    minimize: id => {
        var app = $(`#${id}`);
        var taskbarButton = $(`#${id}-tb`);
        
        app.addClass('minimizing');
        window.setTimeout(function() {
            taskbarButton.removeClass('tb-active').addClass('tb-inactive');
            app.hide(); 
        }, TaskManager.duration);
    },
    
    deMinimize: id => {
        var app = $(`#${id}`);
        var taskbarButton = $(`#${id}-tb`);
        
        taskbarButton.removeClass('tb-inactive').addClass('tb-active');
        app.removeClass('minimizing').addClass('open-from-minimized').show();
    },
    
    maximize: id => {
        var app = $(`#${id}`);
        var taskbarButton = $(`#${id}-tb`);
        app.css({'top': 0, 'left': 0});
        
        app.removeClass('open-from-minimized').toggleClass('maximized');
    },
    
    removeFromActiveApps: id => {
        $.each(TaskManager.activeApps, function(index, contents) {
            if (contents.id == id) {
                TaskManager.activeApps.splice(index, 1);
            }
        });
    },
}
var TaskManager = {
    duration: 190,
    
    init: (options, element) => {
        var appId = options.id;
        var app = $(`#${appId}`);
        var taskbarButton = $(`#${appId}-tb`);
        
        app.removeClass('app-closed');  
        if (!app.length) {
            $('#desktop').append(element);
            taskbarButton.addClass('tb-active');
        } else if (app.hasClass('minimizing')) {
            TaskManager.deMinimize(appId);
        } else {
            TaskManager.minimize(appId);
        }
    },
    
    close: id => {
        var app = $(`#${id}`);
        var taskbarButton = $(`#${id}-tb`);
        
        app.addClass('closing');
        window.setTimeout(function() {
            taskbarButton.removeClass('tb-active');
            app.remove(); 
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
        
        app.removeClass('open-from-minimized').toggleClass('maximized');
    },
}
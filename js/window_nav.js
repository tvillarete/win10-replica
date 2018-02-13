var WindowNav = {
    changeScreen: (app, section) => {
        app = Apps[app];
        section = section.split('-')[0];
        var appWindow = $(`#${app.options.id}`);
        var curScreen = $(`#${app.options.id} .app-contents`);
        try {
            var newScreen = app[section]();
        } catch (e){
            var newScreen = `<div>Nothing here yet! Try the following: Personalization</div>`
        }
        var duration = 180;
        
        app.windowStack.push(curScreen.children());
        
        curScreen.children().addClass('forward-screen-current');
        window.setTimeout(function() {
            curScreen.hide().empty().append(newScreen);
            var screenContents = curScreen.children();
            screenContents.addClass('forward-screen-next');
            curScreen.show()
        }, duration);
        
        appWindow.addClass('show-back-button');
    },
    
    goBack: button => {
        var appWindow = $(button).closest('.app-window');
        var id = appWindow.children('.title-bar').children('.title-bar-left').children('.window-title').text();
        var appContents = appWindow.children('.app-contents');
        var app = Apps[id];
        var curScreen = appWindow.children('.app-contents > div');
        var duration = 180;

        appContents.children().removeClass('forward-screen-next').addClass('back-screen-current');
        window.setTimeout(function() {
            appContents.hide().empty().append(app.windowStack.pop());
            appContents.children().removeClass('forward-screen-current');
            curScreen = appWindow.children('.app-contents').children('div');
            curScreen.addClass('back-screen-prev');
            appContents.show();
        }, duration);
                
        if (app.windowStack.length == 1)
            appWindow.removeClass('show-back-button');
    }
}
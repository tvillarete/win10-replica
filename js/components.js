//var LoadingIndicator = {
//    return `
//        <div class="loadingScreen">
//            <div class="windowsLogo" id="winLoader">
//                <div></div>
//                <div></div>
//                <div></div>
//                <div></div>
//            </div>
//            <div class="windows8">
//                <div class="wBall" id="wBall_1">
//                    <div class="wInnerBall">
//                    </div>
//                </div>
//                <div class="wBall" id="wBall_2">
//                    <div class="wInnerBall">
//                    </div>
//                </div>
//                <div class="wBall" id="wBall_3">
//                    <div class="wInnerBall">
//                    </div>
//                </div>
//                <div class="wBall" id="wBall_4">
//                    <div class="wInnerBall">
//                    </div>
//                </div>
//                <div class="wBall" id="wBall_5">
//                    <div class="wInnerBall">
//                    </div>
//                </div>
//            </div>
//        </div>
//    `;
//}
var Desktop = {
    init: () => {
        $('#main').append(Desktop.element());
    },
    
    element: () => {
        return `
            <div id="desktop"></div>
        `;
    }
}

var Taskbar = {
    init: () => {
        $('#main').append(Taskbar.element());
    },
    
    element: () => {
        return `
            <div id="taskbar">    
                <div class="blur"></div>
                ${Taskbar.button(Apps.StartMenu.options)}
                ${Taskbar.button(Apps.Cortana.options)}
                ${Taskbar.button(Apps.Settings.options)}
                ${Taskbar.button(Apps.Explorer.options)}
                ${Taskbar.button(Apps.SpotiFree.options)}
            </div>
        `;
    },
    
    button: options => {
        return `
            <div class="taskbar-button ${options.classes}" id="${options.id}-tb" onclick="${options.clickEvent}">
                <img src="${options.image}">
            </div>
        `;
    }
}

var AppWindow = {
    init: (view, options) => {
        Apps.StartMenu.close();
        Apps.Cortana.close();
        return `
            <div class="app-window app-closed" id="${options.id}">
                ${AppWindow.titleBar(options)}
                ${view}
            </div>
        `;
    },
    
    titleBar: (options) => {
        return `
            <div class="title-bar">
                ${options.title}
                ${AppWindow.controls(options)}
            </div>
        `;
    },
    
    controls: (options) => {
        return `
            <div class="title-bar-controls">
                <div class="title-bar-button" onclick="TaskManager.minimize('${options.id}')">&minus;</div>
                <div class="title-bar-button" onclick="TaskManager.maximize('${options.id}')">&#9634;</div>
                <div class="title-bar-button red" onclick="TaskManager.close('${options.id}')">&times;</div>
            </div>
        `;
    },
    
    open: (app) => {
        var appSelector = $(`#${app}`);
        appSelector.removeClass('app-closed');
    },
    
    toggle: (app) => {
        appSelector = $(`#${app}`);
        if (!appSelector.length) {
            
        } else if (appSelector.hasClass('minimized')) {
            appSelector.removeClass('minimized');
        } else {
            
        }
    }
}
var AppManager = {
    hideLoadingScreen: (id) => {
        var appWindow = `#${id}`;
        var contents = $(`#${id} .app-contents .main-screen`);
        
        if (!$(appWindow).hasClass('open-from-minimized')) {
            window.setTimeout(function() {
                console.log(`#${id} .default`);
                $(`#${id} .default`).fadeOut(250);
                contents.addClass('app-contents-shown').show();
            }, 300);
            window.setTimeout(function() {
                contents.removeClass('app-contents-shown');
            }, 500);
        }
    },
}

var Apps = {    
    StartMenu: {
        options: {
            id: 'start-menu',
            clickEvent: 'Apps.StartMenu.toggle()',
            image: 'files/images/windows.svg',
            classes: 'inverted',
        },

        init: () => {
            $('#desktop').append(Apps.StartMenu.element())
        },

        element: () => {
            return `
                <div id="start-menu" class="closed">
                    ${Apps.StartMenu.sidebar()}
                    ${Apps.StartMenu.appContainer()}
                </div>
            `;
        },
        
        sidebar: () => {
            return `
                <div id="sm-sidebar">

                </div>
            `;  
        },
        
        appContainer: () => {
            var view = ``;
            $.each(Apps, function(title, app) {
                var options = app.options;
                if (options.showInStart) {
                    view = view.concat(Apps.StartMenu.app(options))
                }
            });
            return `
                <div id="sm-app-container">
                    ${view}
                </div>
            `; 
        },
        
        app: (options) => {
            return `
                <div class="sm-app ${options.classes}" onclick="${options.clickEvent}">
                    <img src="${options.image}">
                    ${options.title}
                </div>
            `;
        },

        toggle: () => {
            $('#start-menu').toggleClass('closed');
            Apps.Cortana.close();
        },

        open: () => {
            $('#start-menu').removeClass('closed');
            Cortana.close();
        }, 

        close: () => {
            $('#start-menu').addClass('closed');
        }
    },

    Cortana: {
        options: {
            title: 'Cortana',
            id: 'cortana',
            clickEvent: 'Apps.Cortana.toggle()',
            image: 'files/images/icons/cortana.png',
            classes: '',
        },

        init: () => {
            $('#desktop').append(Apps.Cortana.element())
        },

        element: () => {
            return `
                <div id="cortana" class="closed">

                </div>
            `;
        },

        toggle: () => {
            $('#cortana').toggleClass('closed');
            Apps.StartMenu.close();
        },

        open: () => {
            $('#cortana').removeClass('closed');
            Apps.StartMenu.close();
        }, 

        close: () => {
            $('#cortana').addClass('closed');
        }
    },

    Settings: {    
        options: {
            id: 'settings-app',
            title: 'Settings',
            clickEvent: `Apps.Settings.init()`,
            image: 'files/images/settings.svg',
            classes: 'inverted',
            showInStart: true,
        },

        init: () => {
            var element = Apps.Settings.element();
            TaskManager.init(Apps.Settings.options, element);
            AppManager.hideLoadingScreen(Apps.Settings.options.id);
        },

        element: () => {
            var self = Apps.Settings;
            var view = `
                <div class="default blue inverted"><img src="${self.options.image}"></div>
                <div class="app-contents">
                    ${self.mainScreen()}
                </div>
            `;
            return AppWindow.init(view, Apps.Settings.options)
        },
        
        mainScreen: () => {
            var searchbar = `
                <div class="settings-search-container">
                    <h2>Windows Settings</h2>
                    <input type="text" placeholder="Find a setting"></input>
                </div>
            `;
            var mainScreenButton = (id, title, text) => {
                return `
                    <div class="main-screen-button hover-effect noselectr">
                        <div class="button-icon ${id}"></div>
                        <h3 class="button-title">${title}</h3>
                        <h3 class="button-subtitle">${text}</h3>
                    </div>
                `;
            }
            return `
                <div class="main-screen" style="display: none">
                    ${searchbar}
                    <div class="settings-category-container">
                        ${mainScreenButton('system-settings', 'System', 'Display, notifications, power')}
                        ${mainScreenButton('devices-settings', 'Devices', 'Bluetooth, printers, mouse')}
                        ${mainScreenButton('phone-settings', 'Phone', 'Link your Android, iPhone')}
                        ${mainScreenButton('network-settings', 'Network & Internet', 'Wi-Fi, airplane mode, VPN')}
                        ${mainScreenButton('personalize-settings', 'Personalization', 'Background, lock screen, colors')}
                        ${mainScreenButton('apps-settings', 'Apps', 'Uninstall, defaults, optional features')}
                        ${mainScreenButton('accounts-settings', 'Accounts', 'Your accounts, email, sync, work, family')}
                        ${mainScreenButton('time-settings', 'Time & Language', 'Speech, region, date')}
                        ${mainScreenButton('gaming-settings', 'Gaming', 'Game bar, DVR, broadcasting, Game Mode')}
                        ${mainScreenButton('access-settings', 'Ease of Access', 'Narrator, magnifier, high contrast')}
                        ${mainScreenButton('cortana-settings', 'Cortana', 'Cortana language, permissions, notifications')}
                        ${mainScreenButton('privacy-settings', 'Privacy', 'Location, camera')}
                        ${mainScreenButton('update-settings', 'Update & Security', 'Windows Update, recovery, backup')}
                       
                    </div>
                </div>
            `;  
        },
    },

    Explorer: {    
        options: {
            id: 'explorer-app',
            title: 'Explorer',
            clickEvent: "Apps.Explorer.init()",
            image: 'files/images/icons/explorer.png',
            classes: '',
            showInStart: true,
        },

        init: () => {
            var element = Apps.Explorer.element();
            TaskManager.init(Apps.Explorer.options, element);
        },

        element: () => {
            var view = `
                Explorer!
            `;
            return AppWindow.init(view, Apps.Explorer.options)
        }
    },
    
    SpotiFree: {    
        options: {
            id: 'spotifree-app',
            title: 'SpotiFree',
            clickEvent: `Apps.SpotiFree.init()`,
            image: 'files/images/icons/spotifree.svg',
            classes: '',
            showInStart: true,
        },

        init: () => {
            var element = Apps.SpotiFree.element();
            TaskManager.init(Apps.SpotiFree.options, element);
        },

        element: () => {
            var view = `
                <iframe style="height: 100%; width: 100%" frameborder="none" src="http://tannerv.ddns.net:12345/SpotiFree/"></iframe>
            `;
            return AppWindow.init(view, Apps.SpotiFree.options)
        }
    },
}
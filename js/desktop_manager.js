var DesktopManager = {
    init: () => {
        Desktop.init();
        Taskbar.init();
        Apps.StartMenu.init();
        Apps.Cortana.init();
    },
}
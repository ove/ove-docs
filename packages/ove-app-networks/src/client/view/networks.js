initView = function () {
    window.ove.context.isInitialized = false;
    window.ove.socket.on(function (appId, message) {
        if (appId == 'networks') {
            window.ove.state.current = message;
            loadSigma();
        }
    });
};

initScenario = function () {
    initView();
    $(document).on('ove.loaded', function () {
        if (!window.ove.context.isInitialized) {
            window.ove.state.load().then(loadSigma);
        }
        let l = window.ove.layout;
        $('#graphArea').css({
            transform: 'translate(-' + l.x + 'px,-' + l.y + 'px)',
            width: l.section.w + 'px',
            height: l.section.h + 'px'
        });
    });
};
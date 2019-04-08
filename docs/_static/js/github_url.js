$(document).ready(_ => {
    if ($('.fa-github').attr('href').includes('search.rst') ||
        $('.fa-github').attr('href').includes('genindex.rst')) {
        $('.fa-github').parent().text('');
    } else {
        let url = $('.fa-github').attr('href');
        const subModules = ['ove-apps', 'ove-services'];
        subModules.forEach(e => {
            let branch = url.substring('https://github.com/ove/ove-docs/blob/'.length);
            branch = branch.substring(0, branch.indexOf('/'));
            url = url.replace('https://github.com/ove/ove-docs/blob/' + branch + '/' + e, 
                'https://github.com/ove/' + e + '/blob/master');
        });
        $('.fa-github').attr('href', url);
    }
    $('img').each(function (){
        const self = this;
        Object.entries({
            'ove-ui-step1': '512px',
            'ove-ui-step2': '646px',
            'ove-ui-step3': '555px'
        }).forEach(function (e) {
            if ($(self).attr('src').includes(e[0])) {
                $(self).css('max-width', e[1]);
            }
        });
    });
    $('.icon-home').attr('href', $('.icon-home').attr('href').replace('toctrees.html', 'README.html'));
    $('.commit').text('');
});

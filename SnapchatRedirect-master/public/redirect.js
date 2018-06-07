window.onload = () => {
    let shouldRedirect = Cookies.get('no-redirect') == undefined

    console.log(shouldRedirect)

    if (shouldRedirect) {
        executeRedirect()
    } else {
        $('#noredirect').show()
    }

    $('#remove-noredirect').click(function () {
        Cookies.remove('no-redirect')
        executeRedirect()
    })
}

function executeRedirect() {
    if (!redirect_url.startsWith('http')) {
        redirect_url = 'http://' + redirect_url
    }
    
    location.replace(redirect_url)
}

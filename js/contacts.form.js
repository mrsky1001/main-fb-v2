const msgEl = document.getElementById('info-msg')
const msgContainerEl = document.getElementById('info-msg-container')

const resetInfoOpacity = () => setTimeout(() => {
    msgContainerEl.classList.add('info-msg-container__hide')

    setTimeout(() => {
        msgContainerEl.classList.remove('info-msg-container__show')
    }, 500)
}, 3000)

function recaptchaSubmit(token) {
    const url = "https://foma-blog.ru:8081/api/email"
    const request = new XMLHttpRequest()

    request.open('POST', url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.onload = () => {
        const res = JSON.parse(request.response)
        console.log(res)
        msgEl.innerText = res.message ? res.message : res

        msgContainerEl.classList.remove('info-msg-container__hide')
        msgContainerEl.classList.add('info-msg-container__show')

        resetInfoOpacity()
        document.getElementById('contacts-form').reset()
    }

    request.onerror = () => {
        msgEl.innerText = 'Ошибка отправки заявки! Повторите попытку позже :)\n\n Или напишите нам на почту foma.blog@yandex.ru'
        msgContainerEl.classList.add('info-msg-container__show')

        resetInfoOpacity()
    }

    const obj = {responseKey: token}

    for (var [key, value] of new FormData(document.getElementById('contacts-form')).entries()) {
        obj[key] = value
    }

    request.send(JSON.stringify(obj)) // create FormData from form that triggered event

}


document.getElementById('contacts-form').addEventListener('submit', (e) => {
    console.log('sasda')
    grecaptcha.execute().then().catch(() => {
        msgEl.innerText = 'Ошибка отправки заявки! Повторите попытку позже :) \n \n Или напишите нам на почту foma.blog@yandex.ru'
        msgContainerEl.classList.add('info-msg-container__show')

        resetInfoOpacity()
    })

    e.preventDefault()
})



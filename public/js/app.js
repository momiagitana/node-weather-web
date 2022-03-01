console.log('clienside js is loaded!')




const weatherForm = document.querySelector('form')
const seatchElem = document.querySelector('input')

const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => { //event
    e.preventDefault()

    const loc = seatchElem.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+loc).then((response)=> {
    response.json().then((data)=> {
        
        if(data.error){
            messageOne.textContent = data.error
        } else {
            console.log(data)
            messageOne.textContent = 'The weather in ' + data.actualLocation
            messageTwo.textContent = data.forecast
        }
        
    })
})
})
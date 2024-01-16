const nameInput = document.getElementById('event-name')


const eventForm = document.getElementsByTagName('form')[0]
const eventsRow = document.getElementsByClassName('row')[1]

let events = []


class CalendarEvent {
  constructor(_name,) {
    this.eventName = _name

  }
}

const emptyForm = function () {

  nameInput.value = ''

}

const emptyEventsRow = function () {

  eventsRow.innerHTML = ''
}

const generateEventCards = function () {


  emptyEventsRow()

  events.forEach((ev, i) => {

    const newCol = document.createElement('div')
    newCol.classList.add('col')
    newCol.innerHTML = `
    <div class="card">
        <div class="card-header">Evento</div>
        <div class="card-body">
            <h5 class="card-title">${ev.eventName}</h5>
            
            <button class="btn btn-danger" onclick="removeCardFromDOM(event, ${i})">ELIMINA</button>
        </div>
    </div>
    `
    eventsRow.appendChild(newCol)
    emptyForm()
  })
}

const removeCardFromDOM = function (event, i) {

  event.target.closest('.col').remove()

  const eventsAsString = localStorage.getItem('events')
  const arrayOfExistingEvents = JSON.parse(eventsAsString)

  arrayOfExistingEvents.splice(i, 1)
  localStorage.setItem('events', JSON.stringify(arrayOfExistingEvents))

}

eventForm.addEventListener('submit', function (e) {
  e.preventDefault()

  const eventFromForm = new CalendarEvent(nameInput.value,)
  console.log(eventFromForm)


  events.push(eventFromForm)


  localStorage.setItem('events', JSON.stringify(events))

  generateEventCards()
})


if (localStorage.getItem('events')) {

  const eventsAsString = localStorage.getItem('events')
  const arrayOfExistingEvents = JSON.parse(eventsAsString)

  events = arrayOfExistingEvents

  generateEventCards()
}
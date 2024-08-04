document.addEventListener('DOMContentLoaded', function() {
    const eventsContainer = document.getElementById('events-container');
    const adminSection = document.getElementById('admin-section');
    const toggleAdminButton = document.getElementById('toggle-admin');
    
    toggleAdminButton.addEventListener('click', function() {
        adminSection.classList.toggle('hidden');
    });

    document.getElementById('event-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('event-name').value;
        const date = document.getElementById('event-date').value;
        const time = document.getElementById('event-time').value;
        const description = document.getElementById('event-description').value;

        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, date, time, description }),
        })
        .then(response => response.json())
        .then(event => {
            addEventToList(event);
            document.getElementById('event-form').reset();
        });
    });

    function addEventToList(event) {
        const eventItem = document.createElement('li');
        eventItem.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Description:</strong> ${event.description}</p>
        `;
        eventsContainer.appendChild(eventItem);
    }

    fetch('/api/events')
        .then(response => response.json())
        .then(events => {
            events.forEach(event => addEventToList(event));
        });
});

const schedules = {
    '12am-6am': [
        { 
            time: '12:00 am - 12:30 am', 
            person1_name: 'Dr. Richard Ludwick', 
            person1_image: 'https://www.shalomworld.ca/hubfs/US%20Election%20Prayer%20Page%20Assets/Prayer%20Board/image%20p1.png',
            description: "President, University of St. Thomas"
        }, 
        { 
            time: '12:30 am - 01:00 am', 
            person1_name: 'Kimberly Hann', 
            person1_image: 'https://www.shalomworld.ca/hubfs/US%20Election%20Prayer%20Page%20Assets/Prayer%20Board/image%20p1.png',
            description: "Community Leader"
        },
        { 
            time: '01:00 am - 01:30 am', 
            person1_name: 'Scott Hann', 
            person1_image: 'https://www.shalomworld.ca/hubfs/US%20Election%20Prayer%20Page%20Assets/Prayer%20Board/image%20p1.png',
            description: "Activist"
        }
    ],
    '6am-12pm': [],
    '12pm-6pm': [
        { 
            time: '02:00 pm - 05:10 pm', 
            person1_name: 'Scott Hann', 
            person1_image: 'https://www.shalomworld.ca/hubfs/US%20Election%20Prayer%20Page%20Assets/Prayer%20Board/image%20p1.png',
            description: "Community Organizer"
        },
        { 
            time: '05:10 pm - 05:30 pm', 
            person1_name: 'Scott Hann', 
            person1_image: 'https://www.shalomworld.ca/hubfs/US%20Election%20Prayer%20Page%20Assets/Prayer%20Board/image%20p1.png',
            description: "Community Organizer"
        }
    ],
    '6pm-12am': []
};



function showSchedule(slot,clickedButton) {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = '';

    // Remove 'selected' class from all buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });

    // Add 'selected' class to the clicked button
    clickedButton.classList.add('selected');

    schedules[slot].forEach(item => {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = 'schedule-item';

        const time = document.createElement('div');
        time.className = 'schedule-time';
        time.textContent = item.time;

        const persons = document.createElement('div');
        persons.className = 'schedule-names';
        persons.textContent = item.person1_name + (item.person2_name ? ' & ' + item.person2_name : '');

        const description = document.createElement('span');
        description.className = 'schedule-description'; // Class for styling
        description.textContent = item.description; // Set the description text

        


        const images = document.createElement('div');
        images.className = 'schedule-images';
        if (item.person1_image) {
            const img1 = document.createElement('img');
            img1.src = item.person1_image;
            images.appendChild(img1);
        }
        if (item.person2_image) {
            const img2 = document.createElement('img');
            img2.src = item.person2_image;
            images.appendChild(img2);
        }

        scheduleItem.appendChild(time);
        scheduleItem.appendChild(persons);
        scheduleItem.appendChild(description);
        scheduleItem.appendChild(images);
        scheduleContainer.appendChild(scheduleItem);

        // Highlight the current time slot
        const currentTime = new Date();
        const startTime = parseTime(item.time.split(' - ')[0]);
        const endTime = parseTime(item.time.split(' - ')[1]);

        if (currentTime >= startTime && currentTime <= endTime) {
            scheduleItem.style.backgroundColor = '#EDCEA1';
            scheduleItem.classList.add('shine-box');
        }
    });
}

 // Function to convert 12-hour time format to a Date object
function parseTime(timeStr) {
    const timeParts = timeStr.split(/[:\s]/);
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const period = timeParts[2].toLowerCase();

    if (period === 'pm' && hours !== 12) hours += 12;
    if (period === 'am' && hours === 12) hours = 0;

    const currentDate = new Date();
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(0);
    return currentDate;
}
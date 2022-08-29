// Get the weather data from the form and display in a card on the page
{
    // Grab the form
    let form = document.getElementById('weatherForm')

    // Create a function to handle the submit event
    async function handleSubmit(event){
        event.preventDefault()
        let inputCity = event.target.cityName.value
        let weather = await getWeatherData(inputCity)
        buildWeatherCard(weather)
        changeBackground(weather)
        cityName.value = ''
    }

    // Function that will take the inputCity and fetch the data from the weather API
    async function getWeatherData(city){
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        let data = await res.json()
        return data
    }

    // Function that will take the weather data object and build a card with it
    function buildWeatherCard(weatherData){
        // Create a card div
        let card = document.createElement('div')
        card.className = 'card'
        card.style.width = '25rem'

        // Create card body div
        let cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        card.append(cardBody)

        // Create card title
        let cardTitle = document.createElement('h1')
        cardTitle.className = 'card-title display-6'
        cardBody.append(cardTitle)

        // Make title bold
        let bold = document.createElement('b')
        bold.innerHTML = weatherData.name
        cardTitle.append(bold)

        // Create weather image
        let image = document.createElement('img')
        image.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        image.className = 'card-img'
        image.style.height = '100px'
        image.style.width = '100px'
        cardBody.append(image)

        // Create current weather display
        let current = document.createElement('h1')
        current.className = 'card-text display-4'
        cardBody.append(current)

        // Make current weather display bold
        let boldAgain = document.createElement('b')
        let roundCurrent = Math.round(weatherData.main.temp)
        boldAgain.innerHTML = `${roundCurrent}&deg;`
        current.append(boldAgain)

        // Create weather discription display
        let desc = document.createElement('h4')
        desc.className = 'card-text'
        desc.innerHTML = `${weatherData.weather[0].description}`
        cardBody.append(desc)

        // Add the date and time
        let dateTime = new Date()
        let date = document.createElement('p')
        date.className = 'card-text'
        date.innerHTML = dateTime
        cardBody.append(date)

        // Create unoranized list for high,low,feels like, an humidity
        let unList = document.createElement('ul')
        unList.className = 'list-group list-group-flush'
        card.append(unList)

        // Create list item high and low temp
        let highLow = document.createElement('li')
        highLow.className = 'list-group-item h5'
        let max = Math.round(weatherData.main.temp_max)
        let min = Math.round(weatherData.main.temp_min)
        highLow.innerHTML = `H: ${max}&deg; L: ${min}&deg;`
        unList.append(highLow)

        // Create list item feels like temp
        let feelsLike = document.createElement('li')
        feelsLike.className = 'list-group-item h5'
        let roundFeelsLike = Math.round(weatherData.main.feels_like)
        feelsLike.innerHTML = `Feels like: ${roundFeelsLike}&deg;`
        unList.append(feelsLike)

        // Create list item humidity
        let humidity = document.createElement('li')
        humidity.className = 'list-group-item h5'
        humidity.innerHTML = `Humidity: ${weatherData.main.humidity}%`
        unList.append(humidity)

        // Get the weather card row and add new card
        document.getElementById('weatherCard').append(card)

        // Clear the table when a new search is submitted
        let display = document.getElementById('weatherCard')
        display.innerHTML = ''
        display.append(card)
    }
    // End of buildWeatherCard function

    function changeBackground(weatherData){
        var body = document.getElementById('weatherBody')
        if (weatherData.weather[0].main === 'Rain' || weatherData.weather[0].main === 'Drizzle'){
            body.style.backgroundImage = 'url(/images/rain2.jpeg)'
        } else if (weatherData.weather[0].main === 'Clouds'){
            body.style.backgroundImage = 'url(/images/cloudy2.jpeg)'
        } else if (weatherData.weather[0].main === 'Thunderstorm'){
            body.style.backgroundImage = 'url(/images/thunderstorm.jpeg)'
        } else if (weatherData.weather[0].main === 'Clear'){
            body.style.backgroundImage = 'url(/images/clear-sky.jpeg)'
        }
    }

    form.addEventListener('submit', handleSubmit)
}
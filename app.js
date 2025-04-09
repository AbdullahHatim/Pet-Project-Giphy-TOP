// ! SHOULD NOT BE USED FOR PRODUCTION
// * this is only here because this is a pet project
const API_KEYS = [
  'sVNq1mQfgT47bfJDeH6PhZZommKByWE5',
  'UqaowNrsF0gGsyqeqctHKWGrwFyGVwv8'
]
let currentKey = API_KEYS[1]

const searchParam = new URLSearchParams({ s: 'void' })
function setSearchParam (string) {
  searchParam.set('s', String(string))
}

// Pre-Fetch a Gif
const img = document.querySelector('img')
fetchNewImage()

function fetchNewImage () {
  img.src = ''
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${currentKey}&${searchParam}`)
    .then(function (response) {
      if (!response.ok) throw new Error(`Error Code: ${response.status}`)
      return response.json()
    })
    .then(function (json) {
      img.src = json.data.images.original.url
    })
    .catch(function (error) {
      if (error.status === 429) {
        console.info('Too Many Requests, Switching API Key')
        currentKey = API_KEYS[!currentKey]
        fetchNewImage()
      }

      console.error('Error: ' + error)
    })
}

// Recieve Input
const searchForm = document.querySelector('.search-form')
const searchInput = searchForm.querySelector('.search-input')
searchInput.value = searchParam.get('s') // default value
searchInput.addEventListener('click', e => { e.stopPropagation() }) // Didn't want the input to change background color

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  setSearchParam(searchInput.value)
  fetchNewImage()
})

// Change Gif Button
const fetchNewImageButton = document.querySelector('.fetch-new-image')
fetchNewImageButton.onclick = (e) => {
  e.stopPropagation()
  fetchNewImage(searchInput.value)
}

// Misc: Change Body Color on Click
document.body.addEventListener('click', () => {
  document.body.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
})

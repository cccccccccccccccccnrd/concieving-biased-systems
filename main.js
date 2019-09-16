const heading = document.getElementById('heading')
const picture = document.getElementById('picture')

function set (work) {
  if (work === 'reset') {
    heading.innerText = `Concieving biased systems`
    picture.src = ''
  } else {
    heading.innerText = `Concieving biased systems (${ work })`
    picture.src = `assets/${ work }.png`
  }
}
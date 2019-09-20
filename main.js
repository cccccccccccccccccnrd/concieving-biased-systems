const app = new Vue({
  el: '#app',
  data: {
    selection: {
      id: '',
      distance: ''
    },
    content: {},
    matrix: {
      content: [],
      scrolling: false
    }
  },
  computed: {
    name: function () {
      if (this.content[this.selection.id]) {
        return this.content[this.selection.id].name
      }
    },
    description: function () {
      if (this.content[this.selection.id]) {
        return this.content[this.selection.id].description
      }
    }
  },
  created: async function () {
    AFRAME.registerComponent('cursor-listener', {
      init: function () {
        this.el.addEventListener('click', function(event) {
          const id = event.detail.intersection.object.el.id
          const distance = event.detail.intersection.distance
          console.log(event.detail)

          if (app.selection === id) {
            app.selection.distance = distance
          } else {
            app.selection.id = id
            app.selection.distance = distance
          }
        })
    
        /* this.el.addEventListener('mouseleave', (event) => {
          app.selection = ''
        }) */
      }
    })

    document.addEventListener('keyup', (event) => {
      if (this.selection.id !== 'conrad' || this.matrix.scrolling) return
      this.display(event.key)
    })

    const response = await fetch('assets/content.json')
    this.content = await response.json()
  },
  mounted: function () {
    this.scroll('Duis autem vel consetetur sadipscing, sed diam voluptua.')

    const manifestoVideo = this.$refs.manifestoAsset3
    manifestoVideo.play()

    setTimeout(() => {
      const manifestoVideo = this.$refs.manifestoAsset2
      manifestoVideo.play()
    }, 23.7 * 1000)

    setTimeout(() => {
      const manifestoVideo = this.$refs.manifestoAsset1
      manifestoVideo.play()
    }, 47.4 * 1000)
  },
  methods: {
    scroll: async function (input) {
      this.matrix.content = []
      this.matrix.scrolling = true
      const split = input.split('')

      const fill = await new Array((40 - split.length) + split.length).fill(' ')
      const output = await split.concat(fill)
  
      let index = 0
      const interval = setInterval(() => {
        if (index >= output.length) {
          clearInterval(interval)

          this.matrix.content = []
          this.matrix.scrolling = false

          return this.$refs.matrix.setAttribute('text', {
            value: this.matrix.content.join('')
          })
        }
        
        if (index >= 40) {
          this.matrix.content.shift()
        }
  
        this.matrix.content.push(output[index])

        this.$refs.matrix.setAttribute('text', {
          value: this.matrix.content.join(''),
          align: 'right',
        })
  
        index++
      }, 150)
    },
    display: function (input) {
      if (input === 'Enter') return this.scroll(`${ this.matrix.content.join('').trim() } = is this working?`)
      if (input === 'Shift' || input === 'Meta' || input === 'Control' || input === 'Alt' || input.includes('Arrow')) return
      if (input === 'Backspace') {
        this.matrix.content.pop(input)
      } else {
        this.matrix.content.push(input)
      }

      this.$refs.matrix.setAttribute('text', {
        value: this.matrix.content.join(''),
        align: 'left',
      })
    }
  }
})
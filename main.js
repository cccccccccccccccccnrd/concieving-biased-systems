const app = new Vue({
  el: '#app',
  data: {
    selection: null,
    descriptions: {},
  },
  computed: {
    heading: function () {
      if (this.selection === '') {
        return 'Concieving biased systems'
      } else {
        return `${ this.selection }, 2019`
      }
    },
    description: function () {
      return this.descriptions[this.selection]
    }
  },
  created: async function () {
    AFRAME.registerComponent('cursor-listener', {
      init: function () {
        this.el.addEventListener('click', function(event) {
          const id = event.detail.intersection.object.el.id
          if (app.selection === id) return
          console.log(event.detail)
          app.selection = id
        })
    
        /* this.el.addEventListener('mouseleave', (event) => {
          app.selection = ''
        }) */
      }
    })

    const response = await fetch('assets/descriptions.json')
    this.descriptions = await response.json()
  }
})
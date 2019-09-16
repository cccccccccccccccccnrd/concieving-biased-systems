AFRAME.registerComponent('cursor-listener', {
  init: function () {
    this.el.addEventListener('click', (event) => {
      const id = event.detail.intersection.object.el.id
      set(id)
    })

    /* this.el.addEventListener('mouseleave', (event) => {
      set('reset')
    }) */
  }
})
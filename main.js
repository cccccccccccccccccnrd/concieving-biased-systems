const app = new Vue({
    el: '#app',
    data: {
        selection: null,
        content: {},
    },
    computed: {
        name: function() {
            if (this.content[this.selection]) {
                return this.content[this.selection].name
            }
        },
        description: function() {
            if (this.content[this.selection]) {
                return this.content[this.selection].description
            }
        }
    },
    created: async function() {
        AFRAME.registerComponent('cursor-listener', {
            init: function() {
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

        const response = await fetch('assets/content.json')
        this.content = await response.json()
    },
    mounted: function() {
        const manifestoVideo = this.$refs.manifestoAsset3
        manifestoVideo.play()

        setTimeout(() => {
            const manifestoVideo = this.$refs.manifestoAsset2
            console.log(manifestoVideo)
            manifestoVideo.play()
        }, 23.7 * 1000)

        setTimeout(() => {
            const manifestoVideo = this.$refs.manifestoAsset1
            console.log(manifestoVideo)
            manifestoVideo.play()
        }, 47.4 * 1000)
    }
})
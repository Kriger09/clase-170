AFRAME.registerComponent("create-markers", {

  //¡Añade aquí el código!
  init: async function () {
    var dishes = await this.getDishes()
    var scene = document.querySelector("#main-scene")
    dishes.map(dish => {
      var marker = document.createElement("a-marker")
      marker.setAttribute("id", dish.id)
      marker.setAttribute("type", "pattern")
      marker.setAttribute("url", dish.marker_pattern_url)
      marker.setAttribute("cursor", {
        rayOrigin: "mouse"
      })
      marker.setAttribute("markerhandler", {})

      scene.appendChild(marker)

      var model = document.createElement("a-entity")
      model.setAttribute("id", `model-${dish.id}`)
      model.setAttribute("position", dish.model_geometry.position)
      model.setAttribute("rotation", dish.model_geometry.rotation)
      model.setAttribute("scale", dish.model_geometry.scale)
      model.setAttribute("gltf-model", `url(${dish.model_url})`)
      model.setAttribute("gesture-handler", {})

      marker.appendChild(model)

      var ingr = document.createElement("a-plane")
      ingr.setAttribute("id", `main-plain${dish.id}`)
      ingr.setAttribute("position", { x: 0, y: 0, z: 0 })
      ingr.setAttribute("rotation", { x: -90, y: 0, z: 0 })
      ingr.setAttribute("width", 1.7)
      ingr.setAttribute("height", 1.5)

      marker.appendChild(ingr)

      var title = document.createElement("a-plane")
      title.setAttribute("id", `title-plain${dish.id}`)
      title.setAttribute("position", { x: 0, y: 0.89, z: 0.02 })
      title.setAttribute("rotation", { x: 0, y: 0, z: 0 })
      title.setAttribute("width", 1.69)
      title.setAttribute("height", 0.3)
      title.setAttribute("material", {
        color: "#F0C30F"
      })

      ingr.appendChild(title)

      var text = document.createElement("a-entity")
      text.setAttribute("id", `title${dish.id}`)
      text.setAttribute("position", { x: 0, y: 0, z: 0.1 })
      text.setAttribute("rotation", { x: 0, y: 0, z: 0 })
      text.setAttribute("text", {
        color: "black",
        font: "monoid",
        width: 1.8,
        height: 1,
        align: "center",
        value: dish.name.toUpperCase()
      })

      title.appendChild(text)

      var textIng = document.createElement("a-entity")
      textIng.setAttribute("id", `title-ingredients${dish.id}`)
      textIng.setAttribute("position", { x: 0, y: 0, z: 0.1 })
      textIng.setAttribute("rotation", { x: 0, y: 0, z: 0 })
      textIng.setAttribute("text", {
        color: "black",
        font: "monoid",
        width: 2,
        align: "left",
        value: `${dish.ingredientes.join("\n\n")}`
      })

      ingr.appendChild(textIng)
    })
  },
  getDishes: async function () {

    return await firebase
      .firestore()
      .collection("dishes")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data())
      })
  }

});

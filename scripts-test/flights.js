var predefinedKeys = {
  number: null,
  origin: null,
  destination: null,
  depart: null,
  arrives: null,
  actualDepart: null,
  actualArrive: null
}

class Flight {
    // static methods
    // static methods are used to create static functions for an app
  static get getFightCount () {
    return Flight.flightsCreated
  }

  static get getDestServed () {
    return Flight.destServed
  }

  constructor (info) {
    Flight.flightsCreated ++
    this.values = {}
    this.fill(info)
  }

    // Prototype methods
  fill (info = {}) {
        // Filling the object
    for (let key in predefinedKeys) {
      if (key in info) { this.values[key] = info[key] }
    }

    if (this.values.destination && !Flight.destServed.includes(this.values.destination)) { Flight.destServed.push(this.values.destination) }
  }

  triggerDepart () {
    this.values.depart = Date.now()
    return this
  }

  triggerArrive () {
    this.values.actualArrive = Date.now()
    return this
  }

  get getInfo () {
    return this.values
  }
};

Flight.flightsCreated = 0
Flight.destServed = []

// Returning the Flight class itself
module.exports = Flight

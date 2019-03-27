new Vue({
  el: "#congress",
  data() {
    console.log(1);
    return {
      senators: [],
      reps: [],
      checkedBoxes: {
        partyChecked: []
      },
      states: [],
      selectedStates: []
    };
  },
  computed: {
    filteredSenates: function() {
      console.log("hello " + this.checkedBoxes.partyChecked.length);
      if (this.checkedBoxes.partyChecked.length == 0 /*&& state === "All"*/) {
        return this.senators;
      } else {
        return this.senators.filter(
          senator => this.checkedBoxes.partyChecked.includes(senator.party)
          // && senator.state === state
        );
      }
    }
  },
  methods: {
    getData() {
      fetch("https://api.myjson.com/bins/1gqjt6", {
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors"
      })
        .then(response => {
          console.log(2);
          return response.json();
        })

        .then(data => {
          console.log(3);
          this.senators = data.results[0].members;
          console.log(this.senators);
        })

        .then(dataStates => {
          for (i = 0; i < this.senators.length; i++) {
            for (j = 0; j < this.senators.length; j++) {
              //setting up new array
              if (i != j) {
                //comparing arrays and not indexes not creating a false positive
                if (this.senators[i] == this.senators[j]) {
                  console.log(7);
                  // checking individual elements with same value
                  if (!this.states.includes(this.senators[i].state)) {
                    //makes sure the value doesn't already exist
                    this.states.push(this.senators); // pushed into array file
                    console.log("work" + this.senators);
                  }
                }
              }
            }
          }
        })
        .catch(err => console.log(err));
    },
    getRepData() {
      fetch("https://api.myjson.com/bins/16oboq", {
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors"
      })
        .then(response => {
          console.log(4);
          return response.json();
        })

        .then(data => {
          console.log(5);
          this.reps = data.results[0].members;
          console.log(this.reps);
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.getData();
    this.getRepData();
  }

  // filteredPeople: function() {
  //   var vm = this;
  //   var state = vm.selectedState;
  //   if (state === "All" && partyChecked === "0") {
  //     //save performance, just return the default array:
  //     return vm.people;
  //   } else {
  //     return vm.people.filter(function(person) {
  //       //return the array after passimng it through the filter function:
  //       return (0-
  //         (state === "All" || senator.state === state) &&
  //         (partyChecked === "All" || senator.party === partyChecked)
  //       );
  //     });
  //   }
  // }
});

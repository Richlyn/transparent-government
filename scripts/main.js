new Vue({
  el: "#congress",
  data() {
    console.log(1);
    return {
      senators: [],
      reps: [],
      checkedBoxes: {
        partyChecked: []
      }
    };
  },
  // computed: {

  // },
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
    },
    filteredSenates: function() {
      console.log("hello " + this.checkedBoxes.partyChecked.length);
      if (this.checkedBoxes.partyChecked.length == 0) {
        return this.senators;
      } else {
        this.senators.filter(senator => {
          console.log(senator.party);
          this.checkedBoxes.partyChecked.forEach(party => {
            senator.party.includes(party);
          });
        });
        console.log(this.senators);
      }
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
  //       return (
  //         (state === "All" || senator.state === state) &&
  //         (partyChecked === "All" || senator.party === partyChecked)
  //       );
  //     });
  //   }
  // }
});

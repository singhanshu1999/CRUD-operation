const { appendFileSync } = require("fs");

class actor {
  constructor(first_name = " ", last_name = " ") {
    this.first_name = first_name;
    this.last_name = last_name;
  }

  saveAsCSV() {
    const csv = `${this.first_name},${this.last_name}\n`;
    try {
      appendFileSync("./actorcsv.csv", csv);
    } catch (err) {
      console.log("error while creating a csv file", err);
    }
  }
}

const startApp = () => {
  const actor1 = new actor("Jawed", "Ali");
  actor1.saveAsCSV();

  const actor2 = new actor("Rani", "Mukharjee");
  actor2.saveAsCSV();

  const actor3 = new actor("Madhuri", "Dixit");
  actor3.saveAsCSV();
};

startApp();

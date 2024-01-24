const axios = require("axios");
const Data = require("../models/data");



const UpdateData = async (req, res) => {
    try {
        const response = await fetchPrices();

        if (response==false) {
          return res.status(404).send("data not found");
        }
    
        await updateDatabase(response);
        
        res.redirect("/data");
      } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
};

const fetchPrices = async () => {
    try {
      const res = await axios.get(process.env.API);
      if (res.status == 200) {
        const top10s = Object.entries(res.data)
          .slice(0, 10)
          .reduce((result, [key, value]) => {
            result[key] = value;
            return result;
          }, {});

        return top10s;
      }
      console.log("error occurred ");
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

async function updateDatabase(data) {
    await Data.deleteMany({});
    for (const key in data){
      const { base_unit, quote_unit, low, high, last, type, open, volume, sell, buy, at, name, } = data[key];

      const result = new Data({
            base_unit: base_unit,
            quote_unit: quote_unit,
            low: low,
            high: high,
            last: last,
            type: type,
            open: open,
            volume: volume,
            sell: sell,
            buy: buy,
            at: at,
            name: name,
          })

          await result.save().then(() => console.log("Added record to database"));
    }
}





const render = async (req, res) => {
  try {
      const foundData = await Data.find({}).exec();

      console.log(foundData);

      if (foundData.length === 0) {
          res.redirect("/fetchData");
      } else {
          res.status(200).json(foundData);
      }
  } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
  }
};

module.exports = {UpdateData,render,};

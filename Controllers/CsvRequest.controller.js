const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { Parser, parse } = require("json2csv");

module.exports = {
  getCsv: async (req, res, next) => {
    const downloadResource = (res, fields, data) => {
      const json2csv = new Parser({ fields });
      const csv = parse(data, { fields });
      res.header("Content-Type", "text/csv");
      res.attachment(`${Date.now().toString()}.csv`);
      return res.send(csv);
    };

    const fields = [
      { label: "ID", value: "id" },
      { label: "Email", value: "email" },
      { label: "First Name", value: "first_name" },
      { label: "Last Name", value: "last_name" },
    ];

    try {
      const result = await fetch("https://reqres.in/api/users").then((res) =>
        res.json()
      );
      console.log(result.data);
      return downloadResource(res, fields, result.data);
    } catch (error) {
      console.log(error.message);

      next(error);
    }
  },
};

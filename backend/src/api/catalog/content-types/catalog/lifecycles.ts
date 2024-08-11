module.exports = {
  afterCreate: async () => {
    try {
      console.log("Rebuild frontend", process.env.FRONTEND_URL);
      await fetch(`${process.env.FRONTEND_URL}/__rebuild`, {
        method: "POST",
      });
    } catch (error) {
      console.error(error);
    }
  },
  afterUpdate: async () => {
    try {
      console.log("Rebuild frontend", process.env.FRONTEND_URL);
      await fetch(`${process.env.FRONTEND_URL}/__rebuild`, {
        method: "POST",
      });
    } catch (error) {
      console.error(error);
    }
  },
  afterDelete: async () => {
    try {
      console.log("Rebuild frontend", process.env.FRONTEND_URL);
      await fetch(`${process.env.FRONTEND_URL}/__rebuild`, {
        method: "POST",
      });
    } catch (error) {
      console.error(error);
    }
  },
};

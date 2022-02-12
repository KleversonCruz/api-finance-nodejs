module.exports = {
  getFirstAndLastDayInMonth(date) {
    const firstDay = new Date(date.getUTCFullYear(), date.getUTCMonth(), 1);
    const lastDay = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0);

    return {
      firstDay,
      lastDay,
    };
  },
};

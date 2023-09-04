const db = require("../connector/staffDb");

async function createStaff(staffInfoDaoInstance) {
  const insertedStaff = await db.staffCreateQuery(staffInfoDaoInstance);
  return insertedStaff;
}

async function getStaff() {
  const gettedStaff = await db.staffGetQuery();
  return gettedStaff;
}

async function getStaffById(staffInfoInstance) {
  const gettedByIdStaff = await db.staffGetByIdQuery(staffInfoInstance);
  return gettedByIdStaff;
}

async function updatestaff(staffInfoInstance, staffInfoDaoInstance) {
  const updatedStaff = await db.staffUpdateQuery(
    staffInfoInstance,
    staffInfoDaoInstance
  );
  return updatedStaff;
}

async function removeStaff(staffInfoInstance) {
  const removedStaff = await db.staffRemoveQuery(staffInfoInstance);
  return removedStaff;
}

module.exports = {
  createStaff,
  getStaff,
  getStaffById,
  updatestaff,
  removeStaff,
};

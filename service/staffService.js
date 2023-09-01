const db = require("../connector/staffDb");

async function createStaff(StaffInfoDaoInstance) {
  const insertedStaff = await db.staffCreateQuery(StaffInfoDaoInstance);
  return insertedStaff;
}

async function getStaff() {
  const gettedStaff = await db.staffGetQuery();
  return gettedStaff;
}

async function getStaffById(StaffInfoInstance) {
  const gettedByIdStaff = await db.staffGetByIdQuery(StaffInfoInstance);
  return gettedByIdStaff;
}

async function updatestaff(StaffInfoInstance, StaffInfoDaoInstance) {
  const updatedStaff = await db.staffUpdateQuery(
    StaffInfoInstance,
    StaffInfoDaoInstance
  );
  return updatedStaff;
}

async function removeStaff(StaffInfoInstance) {
  const removedStaff = await db.staffRemoveQuery(StaffInfoInstance);
  return removedStaff;
}

module.exports = {
  createStaff,
  getStaff,
  getStaffById,
  updatestaff,
  removeStaff,
};
